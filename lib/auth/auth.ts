import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db, dbAuthSchema } from "../../db";

export const auth = betterAuth({
	secret: process.env.BETTER_AUTH_SECRET,
	url: process.env.BETTER_AUTH_URL,
	emailAndPassword: {
		enabled: true,
		minPasswordLength: 8,
		maxPasswordLength: 64,
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		},
	},
	database: drizzleAdapter(db, {
		provider: "pg",
		camelCase: true,
		debugLogs: true,
		usePlural: true,
		schema: dbAuthSchema,
	}),
});
