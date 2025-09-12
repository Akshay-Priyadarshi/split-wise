import type { ApiRouteConfig, Handlers } from "motia";
import { errorHandlingMiddleware } from "../../middlewares";
import {
	apiResponseBodySchema,
	expenseCategoryCreateSchema,
	expenseCategorySchema,
} from "../../schemas";
import { ExpenseCategoryService } from "../../services";

const apiResponseSchema = apiResponseBodySchema(expenseCategorySchema);

export const config: ApiRouteConfig = {
	name: "ExpenseCategoryCreateApi",
	description: "API route for creating a new expense category",
	method: "POST",
	path: "/expense-categories",
	type: "api",

	bodySchema: expenseCategoryCreateSchema,
	responseSchema: {
		201: apiResponseSchema,
		400: apiResponseSchema,
		500: apiResponseSchema,
	},
	emits: [],
	middleware: [errorHandlingMiddleware],
};

export const handler: Handlers["ExpenseCategoryCreateApi"] = async (
	req,
	{ logger, traceId },
) => {
	logger.info("Step Execution started", { traceId });
	const expenseCategoryService = new ExpenseCategoryService();
	const createdExpenseCategory = await expenseCategoryService.create(req.body);
	logger.info("Expense category created successfully", { traceId });
	return {
		status: 201,
		body: apiResponseSchema.parse({
			data: createdExpenseCategory,
			message: "Expense category created successfully",
		}),
	};
};
