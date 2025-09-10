import { expense, expenseCategory } from "./app.schema";
import { account, session, user, verification } from "./auth.schema";

export const dbAuthSchema = {
	user,
	account,
	session,
	verification,
};

export const dbSchema = {
	...dbAuthSchema,
	expense,
	expenseCategory,
};
