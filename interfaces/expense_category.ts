import type { z } from "zod";
import type {
	expenseCategoryCreateSchema,
	expenseCategorySchema,
} from "../schemas";

export type IExpenseCategory = z.infer<typeof expenseCategorySchema>;

export type IExpenseCategoryCreate = z.infer<
	typeof expenseCategoryCreateSchema
>;
