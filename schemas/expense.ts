import { z } from "zod";

export const expenseSchema = z.object({
	id: z.string().uuid(),
	description: z.string(),
	amount: z.number(),
	userId: z.string().uuid(),
	expenseCategoryId: z.string().uuid(),
});

export const expenseCreateSchema = expenseSchema.omit({ id: true });
