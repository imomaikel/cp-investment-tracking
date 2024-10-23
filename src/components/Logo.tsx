import Image from 'next/image';
import React from 'react';

type LogoProps = {
	sizePx: number;
};
/**
 * Application logo
 * @param sizePx Size in pixels of the logo
 */
const Logo = ({ sizePx }: LogoProps) => {
	return (
		<div style={{ width: sizePx, height: sizePx }} className='shrink-0'>
			<Image
				alt='logo'
				src='/logo.svg'
				sizes='100vw'
				width={0}
				height={0}
				className='w-full h-full object-fill object-center'
			/>
		</div>
	);
};

export default Logo;
