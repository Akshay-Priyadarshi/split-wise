import { eq, type SQL } from "drizzle-orm";
import { db, user } from "../db";
import type { IUser, IUserCreate } from "../interfaces";

export class UserService {
	async create(createData: IUserCreate): Promise<IUser | undefined> {
		const createdUser = await db.insert(user).values(createData).returning();
		if (Array.isArray(createdUser) && createdUser.length > 0) {
			return createdUser[0];
		}
	}

	async readById(userId: string): Promise<IUser | undefined> {
		const readUser = await db.query.user.findFirst({
			where: eq(user.id, userId),
		});
		return readUser;
	}

	async readAll(filter?: SQL<typeof user>): Promise<IUser[]> {
		const readUsers = await db.query.user.findMany({
			where: filter,
		});
		return readUsers;
	}

	async deleteById(userId: string): Promise<IUser | undefined> {
		const readUser = await this.readById(userId);
		if (readUser) {
			await db.delete(user).where(eq(user.id, userId));
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
				.update(user)
				.set(updateData)
				.where(eq(user.id, userId))
				.returning();
			if (Array.isArray(updatedUser) && updatedUser.length > 0) {
				return updatedUser[0];
			}
		}
	}
}
