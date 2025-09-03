import { eq, type SQL } from "drizzle-orm";
import { db, expenseCategory } from "../db";
import type { IExpenseCategory, IExpenseCategoryCreate } from "../interfaces";

export class ExpenseCategoryService {
	async create(
		createData: IExpenseCategoryCreate,
	): Promise<IExpenseCategory | undefined> {
		const createdCategory = await db
			.insert(expenseCategory)
			.values(createData)
			.returning();
		if (Array.isArray(createdCategory) && createdCategory.length > 0) {
			return createdCategory[0];
		}
	}

	async readById(categoryId: string): Promise<IExpenseCategory | undefined> {
		const readCategory = await db.query.expenseCategory.findFirst({
			where: eq(expenseCategory.id, categoryId),
		});
		return readCategory;
	}

	async readAll(
		filter?: SQL<typeof expenseCategory>,
	): Promise<IExpenseCategory[]> {
		const readCategories = await db.query.expenseCategory.findMany({
			where: filter,
		});
		return readCategories;
	}

	async deleteById(categoryId: string): Promise<IExpenseCategory | undefined> {
		const readCategory = await this.readById(categoryId);
		if (readCategory) {
			await db
				.delete(expenseCategory)
				.where(eq(expenseCategory.id, categoryId));
		}
		return readCategory;
	}

	async updateById(
		categoryId: string,
		updateData: Partial<IExpenseCategory>,
	): Promise<IExpenseCategory | undefined> {
		const readCategory = await this.readById(categoryId);
		if (readCategory) {
			const updatedCategory = await db
				.update(expenseCategory)
				.set(updateData)
				.where(eq(expenseCategory.id, categoryId))
				.returning();
			if (Array.isArray(updatedCategory) && updatedCategory.length > 0) {
				return updatedCategory[0];
			}
		}
	}
}
