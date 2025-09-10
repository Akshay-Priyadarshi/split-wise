import * as t from "drizzle-orm/pg-core";
import { user } from "./auth.schema";

export const expense = t.pgTable(
	"expenses",
	{
		id: t.uuid().defaultRandom().primaryKey(),
		description: t.text().notNull(),
		amount: t.integer().notNull(),
		userId: t.text().notNull(),
		expenseCategoryId: t.uuid().notNull(),
		createdAt: t.timestamp("createdAt").defaultNow().notNull(),
		updatedAt: t
			.timestamp("updatedAt")
			.defaultNow()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
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
		userId: t.text().notNull(),
		createdAt: t.timestamp("createdAt").defaultNow().notNull(),
		updatedAt: t
			.timestamp("updatedAt")
			.defaultNow()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
	},
	(table) => [
		t.foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "fk_expense_category_user",
		}),
	],
);
