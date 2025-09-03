import type { SQL } from "drizzle-orm";
import { eq } from "drizzle-orm";
import { db, expense } from "../db";
import type { IExpense, IExpenseCreate } from "../interfaces";

export class ExpenseService {
	async create(createData: IExpenseCreate): Promise<IExpense | undefined> {
		const createdExpense = await db
			.insert(expense)
			.values(createData)
			.returning();
		if (Array.isArray(createdExpense) && createdExpense.length > 0) {
			return createdExpense[0];
		}
	}

	async readById(expenseId: string): Promise<IExpense | undefined> {
		const readExpense = await db.query.expense.findFirst({
			where: eq(expense.id, expenseId),
		});
		return readExpense;
	}

	async readAll(filter?: SQL<typeof expense>): Promise<IExpense[]> {
		const readExpenses = await db.query.expense.findMany({
			where: filter,
		});
		return readExpenses;
	}

	async deleteById(expenseId: string): Promise<IExpense | undefined> {
		const readExpense = await this.readById(expenseId);
		if (readExpense) {
			await db.delete(expense).where(eq(expense.id, expenseId));
		}
		return readExpense;
	}

	async updateById(
		expenseId: string,
		updateData: Partial<IExpense>,
	): Promise<IExpense | undefined> {
		const readExpense = await this.readById(expenseId);
		if (readExpense) {
			const updatedExpense = await db
				.update(expense)
				.set(updateData)
				.where(eq(expense.id, expenseId))
				.returning();
			if (Array.isArray(updatedExpense) && updatedExpense.length > 0) {
				return updatedExpense[0];
			}
		}
	}
}
