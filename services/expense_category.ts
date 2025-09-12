import { eq, type SQL } from "drizzle-orm";
import { db, dbSchema } from "../db";
import type { IExpenseCategory, IExpenseCategoryCreate } from "../interfaces";

export class ExpenseCategoryService {
	async create(
		createData: IExpenseCategoryCreate,
	): Promise<IExpenseCategory | undefined> {
		const createdCategory = await db
			.insert(dbSchema.expenseCategories)
			.values(createData)
			.returning();
		if (Array.isArray(createdCategory) && createdCategory.length > 0) {
			return createdCategory[0];
		}
	}

	async readById(categoryId: string): Promise<IExpenseCategory | undefined> {
		const readCategory = await db.query.expenseCategories.findFirst({
			where: eq(dbSchema.expenseCategories.id, categoryId),
		});
		return readCategory;
	}

	async readAll(
		filter?: SQL<typeof dbSchema.expenseCategories>,
	): Promise<IExpenseCategory[]> {
		const readCategories = await db.query.expenseCategories.findMany({
			where: filter,
		});
		return readCategories;
	}

	async deleteById(categoryId: string): Promise<IExpenseCategory | undefined> {
		const readCategory = await this.readById(categoryId);
		if (readCategory) {
			await db
				.delete(dbSchema.expenseCategories)
				.where(eq(dbSchema.expenseCategories.id, categoryId));
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
				.update(dbSchema.expenseCategories)
				.set(updateData)
				.where(eq(dbSchema.expenseCategories.id, categoryId))
				.returning();
			if (Array.isArray(updatedCategory) && updatedCategory.length > 0) {
				return updatedCategory[0];
			}
		}
	}
}
