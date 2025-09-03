import { z } from "zod";

export const userSchema = z.object({
	id: z.string().uuid(),
	email: z.string().email(),
	name: z.string().min(2).max(100),
});

export const userCreateSchema = userSchema.omit({ id: true }).extend({
	password: z.string().min(6).max(100),
});
