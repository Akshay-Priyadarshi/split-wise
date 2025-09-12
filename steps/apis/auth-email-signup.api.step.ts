import type { ApiRouteConfig, Handlers } from "motia";
import { auth } from "../../lib";
import { errorHandlingMiddleware } from "../../middlewares";
import {
	apiResponseBodySchema,
	authEmailSignupReqSchema,
	authEmailSignupResSchema,
} from "../../schemas";

const apiResponseSchema = apiResponseBodySchema(authEmailSignupResSchema);

export const config: ApiRouteConfig = {
	name: "AuthEmailSignupApi",
	description: "API route for email signup authentication",
	method: "POST",
	type: "api",
	path: "/auth/email/signup",
	emits: [],
	bodySchema: authEmailSignupReqSchema,
	responseSchema: {
		200: apiResponseSchema,
		400: apiResponseSchema,
		500: apiResponseSchema,
	},
	middleware: [errorHandlingMiddleware],
};

export const handler: Handlers["AuthEmailSignupApi"] = async (
	req,
	{ logger, traceId },
) => {
	logger.info("Step Execution started", { traceId });
	const signupResponse = await auth.api.signUpEmail({ body: req.body });
	logger.info("User signed up successfully", { traceId });
	return {
		status: 200,
		body: apiResponseSchema.parse({
			data: signupResponse,
			message: "User signed up successfully",
		}),
	};
};
