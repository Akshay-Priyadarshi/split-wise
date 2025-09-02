import type { z } from "zod";
import type { expenseCreateSchema, expenseSchema } from "../schemas";

export type IExpenseCreate = z.infer<typeof expenseCreateSchema>;

export type IExpense = z.infer<typeof expenseSchema>;
