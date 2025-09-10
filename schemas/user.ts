import { z } from "zod";

export const userSchema = z.object({
	id: z.string(),
	email: z.string(),
	name: z.string(),
	image: z.string().nullable().optional(),
	emailVerified: z.boolean(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const userCreateSchema = userSchema
	.omit({
		id: true,
		emailVerified: true,
		createdAt: true,
		updatedAt: true,
		image: true,
	})
	.extend({
		password: z.string().min(6).max(100),
	});
