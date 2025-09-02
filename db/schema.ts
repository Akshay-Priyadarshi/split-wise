import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const user = pgTable("users", {
	id: uuid().defaultRandom().primaryKey(),
	name: text().notNull(),
	email: text().notNull().unique(),
});

export const expense = pgTable("expenses", {
	id: uuid().defaultRandom().primaryKey(),
	description: text().notNull(),
	amount: integer().notNull(),
	userId: uuid().notNull(),
});
