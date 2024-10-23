import {
	doublePrecision,
	integer,
	pgTable,
	text,
	timestamp,
} from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/postgres-js';
import { relations } from 'drizzle-orm';
import postgres from 'postgres';

// Database credentials
const connectionString = process.env.DATABASE_URL!;
const pool = postgres(connectionString, { max: 1 });

// Database client
export const db = drizzle(pool);

// Define users table
export const users = pgTable('user', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name'),
	password: text('password'),
	email: text('email').unique(),
	emailVerified: timestamp('emailVerified', { mode: 'date' }),
	image: text('image'),
});

// User has many investments
export const usersRelations = relations(users, ({ many }) => ({
	investments: many(investments),
}));

// Define investments table
export const investments = pgTable('investment', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull(),
	quantity: integer('quantity').notNull(),
	buyPrice: doublePrecision('buyPrice').notNull(),
	currentPrice: doublePrecision('currentPrice').notNull(),
	userId: text('userId'),
	createdAt: timestamp('createdAt', { mode: 'date' }).notNull().defaultNow(),
});

// Investment belongs to a user
export const investmentsRelations = relations(investments, ({ one }) => ({
	user: one(users, {
		fields: [investments.userId],
		references: [users.id],
	}),
}));
