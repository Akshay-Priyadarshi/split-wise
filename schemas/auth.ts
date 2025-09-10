import { z } from "zod";

export const authEmailSigninReqSchema = z.object({
	email: z.string().email({ message: "Invalid email address" }),
	password: z.string().min(8).max(64).trim(),
	callbackURL: z.string().url().optional(),
	rememberMe: z.boolean().optional(),
});

export const authEmailSigninResSchema = z.object({
	redirect: z.boolean(),
	token: z.string(),
	url: z.string().optional(),
	user: z.object({
		id: z.string(),
		email: z.string(),
		name: z.string(),
		image: z.string().nullable().optional(),
		emailVerified: z.boolean(),
		createdAt: z.date(),
		updatedAt: z.date(),
	}),
});

export const authEmailSignupReqSchema = z.object({
	name: z.string(),
	email: z.string(),
	password: z.string(),
	image: z.string().optional(),
	callbackURL: z.string().optional(),
	rememberMe: z.boolean().optional(),
});

export const authEmailSignupResSchema = z.object({
	token: z.null(),
	user: z.object({
		id: z.string(),
		email: z.string(),
		name: z.string(),
		image: z.string().nullable().optional(),
		emailVerified: z.boolean(),
		createdAt: z.date(),
		updatedAt: z.date(),
	}),
});
