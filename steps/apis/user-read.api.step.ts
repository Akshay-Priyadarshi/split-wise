import type { ApiRouteConfig, Handlers } from "motia";
import { errorHandlingMiddleware } from "../../middlewares";
import { apiResponseBodySchema, userSchema } from "../../schemas";
import { UserService } from "../../services";

const apiResponseSchema = apiResponseBodySchema(userSchema);

export const config: ApiRouteConfig = {
	name: "UserReadApi",
	description: "API route for reading user information",
	method: "GET",
	path: "/users/:id",
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

export const handler: Handlers["UserReadApi"] = async (
	req,
	{ logger, traceId },
) => {
	logger.info("Step Execution started", { traceId });
	const userService = new UserService();
	const user = await userService.readById(req.pathParams.id);
	if (!user) {
		return {
			status: 404,
			body: apiResponseSchema.parse({ message: "User not found" }),
		};
	}
	return {
		status: 200,
		body: apiResponseSchema.parse({
			data: user,
			message: "User retrieved successfully",
		}),
	};
};
