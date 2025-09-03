import type { ApiRouteConfig, Handlers } from "motia";
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
		500: apiResponseSchema,
	},
	emits: [],
};

export const handler: Handlers["ExpenseCreateApi"] = async (
	req,
	{ logger, traceId },
) => {
	logger.info("EXPENSE CREATE API", { traceId });
	try {
		const expenseService = new ExpenseService();
		const createdExpense = await expenseService.create(req.body);
		return {
			status: 201,
			body: apiResponseSchema.parse({
				data: createdExpense,
				message: "Expense created successfully",
			}),
		};
	} catch (error) {
		logger.error("Error creating expense", { traceId, error });
		return {
			status: 500,
			body: apiResponseSchema.parse({}),
		};
	}
};
