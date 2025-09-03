import { z } from "zod";

export const expenseCategorySchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	userId: z.string().uuid(),
});

export const expenseCategoryCreateSchema = expenseCategorySchema.omit({
	id: true,
});
