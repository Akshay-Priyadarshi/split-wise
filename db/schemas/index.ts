import { expenseCategories, expenses } from "./app.schema";
import { accounts, sessions, users, verifications } from "./auth.schema";

export const dbAuthSchema = {
	users,
	accounts,
	sessions,
	verifications,
};

export const dbSchema = {
	...dbAuthSchema,
	expenses,
	expenseCategories,
};
