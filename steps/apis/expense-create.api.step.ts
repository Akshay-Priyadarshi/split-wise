import type { ApiRouteConfig, Handlers } from "motia";
import { errorHandlingMiddleware } from "../../middlewares";
import {
	apiResponseBodySchema,
	expenseCreateSchema,
	expenseSchema,
} from "../../schemas";
import { ExpenseService } from "../../services";

const apiResponseSchema = apiResponseBodySchema(expenseSchema);

export const config: ApiRouteConfig = {
	name: "ExpenseCreateApi",
	description: "API route for creating a new expense",
	path: "/expenses",
	method: "POST",
	type: "api",
	bodySchema: expenseCreateSchema,
	responseSchema: {
		201: apiResponseSchema,
		400: apiResponseSchema,
		500: apiResponseSchema,
	},
	emits: [],
	middleware: [errorHandlingMiddleware],
};

export const handler: Handlers["ExpenseCreateApi"] = async (
	req,
	{ logger, traceId },
) => {
	logger.info("Step Execution started", { traceId });
	const expenseService = new ExpenseService();
	const createdExpense = await expenseService.create(req.body);
	return {
		status: 201,
		body: apiResponseSchema.parse({
			data: createdExpense,
			message: "Expense created successfully",
		}),
	};
};
