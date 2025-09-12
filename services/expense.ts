import type { SQL } from "drizzle-orm";
import { eq } from "drizzle-orm";
import { db, dbSchema } from "../db";
import type { IExpense, IExpenseCreate } from "../interfaces";

export class ExpenseService {
	async create(createData: IExpenseCreate): Promise<IExpense | undefined> {
		const createdExpense = await db
			.insert(dbSchema.expenses)
			.values(createData)
			.returning();
		if (Array.isArray(createdExpense) && createdExpense.length > 0) {
			return createdExpense[0];
		}
	}

	async readById(expenseId: string): Promise<IExpense | undefined> {
		const readExpense = await db.query.expenses.findFirst({
			where: eq(dbSchema.expenses.id, expenseId),
		});
		return readExpense;
	}

	async readAll(filter?: SQL<typeof dbSchema.expenses>): Promise<IExpense[]> {
		const readExpenses = await db.query.expenses.findMany({
			where: filter,
		});
		return readExpenses;
	}

	async deleteById(expenseId: string): Promise<IExpense | undefined> {
		const readExpense = await this.readById(expenseId);
		if (readExpense) {
			await db
				.delete(dbSchema.expenses)
				.where(eq(dbSchema.expenses.id, expenseId));
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
				.update(dbSchema.expenses)
				.set(updateData)
				.where(eq(dbSchema.expenses.id, expenseId))
				.returning();
			if (Array.isArray(updatedExpense) && updatedExpense.length > 0) {
				return updatedExpense[0];
			}
		}
	}
}
