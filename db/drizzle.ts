import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { expense, expenseCategory, user } from "./schema";

export const db = drizzle({
	connection: {
		connectionString: process.env.DATABASE_URL!,
	},
	casing: "snake_case",
	schema: {
		expense,
		user,
		expenseCategory,
	},
});
