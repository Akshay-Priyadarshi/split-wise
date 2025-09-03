import type { ApiRouteConfig, Handlers } from "motia";
import { apiResponseBodySchema, expenseSchema } from "../../schemas";
import { ExpenseService } from "../../services";

const apiResponseSchema = apiResponseBodySchema(expenseSchema);

export const config: ApiRouteConfig = {
	name: "ExpenseReadApi",
	description: "API route for reading an expense by ID",
	method: "GET",
	path: "/expenses/:id",
	type: "api",

	responseSchema: {
		200: apiResponseSchema,
		500: apiResponseSchema,
	},
	emits: [],
};

export const handler: Handlers["ExpenseReadApi"] = async (
	req,
	{ logger, traceId },
) => {
	logger.info("EXPENSE READ API", { traceId });
	try {
		const expenseService = new ExpenseService();
		const readExpense = await expenseService.readById(req.pathParams.id);
		return {
			status: 200,
			body: apiResponseSchema.parse({
				data: readExpense,
				message: "Expense retrieved successfully",
			}),
		};
	} catch (error) {
		logger.error("Error reading expense", { traceId, error });
		return {
			status: 500,
			body: apiResponseSchema.parse({}),
		};
	}
};
