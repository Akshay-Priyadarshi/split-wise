import type { ApiRouteConfig, Handlers } from "motia";
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
		500: apiResponseSchema,
	},
	emits: [],
};

export const handler: Handlers["ExpenseCategoryCreateApi"] = async (
	req,
	{ logger, traceId },
) => {
	logger.info("EXPENSE CATEGORY CREATE API", { traceId });
	try {
		const expenseCategoryService = new ExpenseCategoryService();
		const createExpenseCategory = await expenseCategoryService.create(req.body);
		return {
			status: 201,
			body: apiResponseSchema.parse({
				data: createExpenseCategory,
				message: "Expense category created successfully",
			}),
		};
	} catch (error) {
		logger.error("Error creating expense category", { traceId, error });
		return {
			status: 500,
			body: apiResponseSchema.parse({}),
		};
	}
};
