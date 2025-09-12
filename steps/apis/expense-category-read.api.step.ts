import type { ApiRouteConfig, Handlers } from "motia";
import { errorHandlingMiddleware } from "../../middlewares";
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
		400: apiResponseSchema,
		500: apiResponseSchema,
	},
	emits: [],
	middleware: [errorHandlingMiddleware],
};

export const handler: Handlers["ExpenseCategoryReadApi"] = async (
	req,
	{ logger, traceId },
) => {
	logger.info("Step Execution started", { traceId });
	const expenseCategoryService = new ExpenseCategoryService();
	const readExpenseCategory = await expenseCategoryService.readById(
		req.pathParams.id,
	);
	if (!readExpenseCategory) {
		return {
			status: 404,
			body: apiResponseSchema.parse({
				message: "Expense category not found",
			}),
		};
	}
	return {
		status: 200,
		body: apiResponseSchema.parse({
			message: "Expense category retrieved successfully",
			data: readExpenseCategory,
		}),
	};
};
