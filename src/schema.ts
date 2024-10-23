import {
	pgTable,
	text,
	timestamp,
	doublePrecision,
	integer,
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
	name: text('name'),
	quantity: integer('quantity'),
	buyPrice: doublePrecision('buyPrice'),
	currentPrice: doublePrecision('currentPrice'),
	userId: text('userId'),
});

// Investment belongs to a user
export const investmentsRelations = relations(investments, ({ one }) => ({
	user: one(users, {
		fields: [investments.userId],
		references: [users.id],
	}),
}));
