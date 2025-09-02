import type { ApiRouteConfig, Handlers } from "motia";
import z from "zod";
import {
	apiResponseBodySchema,
	expenseCreateSchema,
	expenseSchema,
} from "../../schemas";
import { ExpenseService } from "../../services";

export const config: ApiRouteConfig = {
	name: "ExpenseCreateApi",
	description: "API route for creating a new expense",
	path: "/api/expenses",
	method: "POST",
	type: "api",
	bodySchema: expenseCreateSchema,
	responseSchema: {
		201: apiResponseBodySchema(expenseSchema),
		500: apiResponseBodySchema(z.null()),
	},
	emits: [],
	flows: ["expense-create"],
};

export const handler: Handlers["ExpenseCreateApi"] = async (
	req,
	{ logger, traceId },
) => {
	logger.info("API Expense Create", { traceId });
	const expenseService = new ExpenseService();
	try {
		const createdExpense = await expenseService.createExpense(req.body);
		return {
			status: 201,
			body: apiResponseBodySchema(expenseSchema).parse(createdExpense),
		};
	} catch (error) {
		logger.error("Error creating expense", { traceId, error });
		return {
			status: 500,
			body: apiResponseBodySchema(z.null()).parse(null),
		};
	}
};
