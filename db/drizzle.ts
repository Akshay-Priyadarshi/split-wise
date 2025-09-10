import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { dbSchema } from "./schemas";

export const db = drizzle({
	connection: {
		connectionString: process.env.DATABASE_URL!,
	},
	casing: "snake_case",
	schema: dbSchema,
});
