import type { ApiRouteConfig, Handlers } from "motia";
import { z } from "zod";
import { apiResponseBodySchema, expenseCategorySchema } from "../../schemas";
import { ExpenseCategoryService } from "../../services";

const apiResponseSchema = apiResponseBodySchema(expenseCategorySchema);

export const config: ApiRouteConfig = {
	name: "ExpenseCategoryReadApi",
	description: "API route for reading an expense category by ID",
	method: "GET",
	path: "/expense-categories/:id",
	type: "api",

	responseSchema: {
		200: apiResponseSchema,
		404: apiResponseSchema,
		500: apiResponseSchema,
	},
	emits: [],
};

export const handler: Handlers["ExpenseCategoryReadApi"] = async (
	req,
	{ logger, traceId },
) => {
	logger.info("EXPENSE CATEGORY READ API", { traceId });
	try {
		const expenseCategoryService = new ExpenseCategoryService();
		const readExpenseCategory = await expenseCategoryService.readById(
			req.pathParams.id,
		);
		if (!readExpenseCategory) {
			return {
				status: 404,
				body: apiResponseBodySchema(z.null()).parse({
					message: "Expense category not found",
				}),
			};
		}
		return {
			status: 200,
			body: apiResponseBodySchema(expenseCategorySchema).parse({
				message: "Expense category retrieved successfully",
				data: readExpenseCategory,
			}),
		};
	} catch (error) {
		logger.error("Error creating expense", {
			traceId,
			error,
			trace: (error as Error).stack,
		});
		return {
			status: 500,
			body: apiResponseBodySchema(z.null()).parse({}),
		};
	}
};
