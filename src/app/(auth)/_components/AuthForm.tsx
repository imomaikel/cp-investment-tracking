'use client';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { AuthSchema, AuthSchemaType } from '@/validators/auth';
import { server_signIn, server_signUp } from '@/actions/auth';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Link from 'next/link';

type AuthFormProps = {
	method: 'SIGN_IN' | 'SIGN_UP';
};
/**
 * Authentication form used to sign in or sign up
 * @param method Sign in or sign up
 */
const AuthForm = ({ method }: AuthFormProps) => {
	// Auth form
	const form = useForm<AuthSchemaType>({
		resolver: zodResolver(AuthSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});
	const [showPassword, setShowPassword] = useState(false);
	// Loading state
	const [pending, startTransition] = useTransition();
	const router = useRouter();

	// Change password visibility
	const handleShowPassword = () => setShowPassword(!showPassword);

	// Handle form submission
	const onFormSubmit = (data: AuthSchemaType) => {
		startTransition(() => {
			if (method === 'SIGN_IN') {
				server_signIn(data.email, data.password).then((redirectUrl) => {
					if (redirectUrl) {
						router.replace(redirectUrl);
						toast.success('Logged In!');
					} else {
						toast.error('Invalid Credentials!', { position: 'top-center' });
					}
				});
			} else if (method === 'SIGN_UP') {
				server_signUp(data);
			}
		});
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onFormSubmit)}
				className='w-full space-y-4'
			>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>E-mail</FormLabel>
							<FormControl>
								<Input
									placeholder='john.doe@example.com'
									{...field}
									disabled={pending}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<div className='flex relative'>
									<Input
										{...field}
										type={showPassword ? 'text' : 'password'}
										className='pr-10'
										disabled={pending}
									/>
									<button
										className='absolute right-0 h-full border-l px-2 group'
										type='button'
										onClick={handleShowPassword}
										disabled={pending}
									>
										{showPassword ? (
											<FaEyeSlash className='size-5 group-hover:text-primary transition-colors' />
										) : (
											<FaEye className='size-5 group-hover:text-primary transition-colors' />
										)}
									</button>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Separator className='!mt-6' />
				<div className='flex justify-center'>
					{method === 'SIGN_IN' ? (
						<Link
							href='/sign-up'
							className='text-sm text-muted-foreground hover:underline'
						>
							Create an account instead &gt;
						</Link>
					) : (
						<Link
							href='/sign-in'
							className='text-sm text-muted-foreground hover:underline'
						>
							Login instead &gt;
						</Link>
					)}
				</div>
				<motion.div
					key={`button-${method}`}
					animate={{
						x: [0, 15, -15, 0],
					}}
					transition={{
						duration: 0.45,
						stiffness: 30,
					}}
					viewport={{ once: false }}
					className='w-full !mt-6'
				>
					<Button type='submit' className='w-full' disabled={pending}>
						{method === 'SIGN_IN' ? 'Login' : 'Create Account'}
					</Button>
				</motion.div>
			</form>
		</Form>
	);
};

export default AuthForm;
