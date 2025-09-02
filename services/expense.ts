import { db, expense } from "../db";
import type { IExpense, IExpenseCreate } from "../interfaces";

export class ExpenseService {
	async createExpense(data: IExpenseCreate): Promise<IExpense | undefined> {
		const addedExpenses = await db.insert(expense).values(data).returning();
		if (Array.isArray(addedExpenses) && addedExpenses.length > 0) {
			return addedExpenses[0];
		}
	}
}
