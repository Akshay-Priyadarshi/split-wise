import { DrizzleQueryError } from "drizzle-orm";
import type { ApiRouteConfig, Handlers } from "motia";
import {
	apiResponseBodySchema,
	userCreateSchema,
	userSchema,
} from "../../schemas";
import { UserService } from "../../services";

const apiResponseSchema = apiResponseBodySchema(userSchema);

export const config: ApiRouteConfig = {
	name: "UserCreateApi",
	description: "API route for creating a new user",
	method: "POST",
	path: "/users",
	type: "api",

	bodySchema: userCreateSchema,
	responseSchema: {
		201: apiResponseSchema,
		400: apiResponseSchema,
		500: apiResponseSchema,
	},
	emits: [],
};

export const handler: Handlers["UserCreateApi"] = async (
	req,
	{ logger, traceId },
) => {
	logger.info("USER CREATE API", { traceId });
	try {
		const userService = new UserService();
		const createUser = await userService.create(req.body);
		return {
			status: 201,
			body: apiResponseSchema.parse({
				data: createUser,
				message: "User created successfully",
			}),
		};
	} catch (error: unknown) {
		logger.error("Error creating user", {
			error,
			trace: (error as Error).stack,
		});
		if (error instanceof DrizzleQueryError) {
			return {
				status: 400,
				body: apiResponseSchema.parse({
					message: error.message,
				}),
			};
		}
		return {
			status: 500,
			body: apiResponseSchema.parse({}),
		};
	}
};
