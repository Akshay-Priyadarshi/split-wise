import * as t from "drizzle-orm/pg-core";

export const user = t.pgTable("users", {
	id: t.uuid().defaultRandom().primaryKey(),
	name: t.text().notNull(),
	email: t.text().notNull().unique(),
	password: t.text().notNull(),
});

export const expense = t.pgTable(
	"expenses",
	{
		id: t.uuid().defaultRandom().primaryKey(),
		description: t.text().notNull(),
		amount: t.integer().notNull(),
		userId: t.uuid().notNull(),
		expenseCategoryId: t.uuid().notNull(),
	},
	(table) => [
		t.foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "fk_expense_user",
		}),
		t.foreignKey({
			columns: [table.expenseCategoryId],
			foreignColumns: [expenseCategory.id],
			name: "fk_expense_expense_category",
		}),
	],
);

export const expenseCategory = t.pgTable(
	"expense_categories",
	{
		id: t.uuid().defaultRandom().primaryKey(),
		name: t.text().notNull(),
		userId: t.uuid().notNull(),
	},
	(table) => [
		t.foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "fk_expense_category_user",
		}),
	],
);
