import { eq, type SQL } from "drizzle-orm";
import { db, dbSchema } from "../db";
import type { IUser } from "../interfaces";

export class UserService {
	async readById(userId: string): Promise<IUser | undefined> {
		const readUser = await db.query.users.findFirst({
			where: eq(dbSchema.users.id, userId),
		});
		return readUser;
	}

	async readAll(filter?: SQL<typeof dbSchema.users>): Promise<IUser[]> {
		const readUsers = await db.query.users.findMany({
			where: filter,
		});
		return readUsers;
	}

	async deleteById(userId: string): Promise<IUser | undefined> {
		const readUser = await this.readById(userId);
		if (readUser) {
			await db.delete(dbSchema.users).where(eq(dbSchema.users.id, userId));
		}
		return readUser;
	}

	async updateById(
		userId: string,
		updateData: Partial<IUser>,
	): Promise<IUser | undefined> {
		const readUser = await this.readById(userId);
		if (readUser) {
			const updatedUser = await db
				.update(dbSchema.users)
				.set(updateData)
				.where(eq(dbSchema.users.id, userId))
				.returning();
			if (Array.isArray(updatedUser) && updatedUser.length > 0) {
				return updatedUser[0];
			}
		}
	}
}
