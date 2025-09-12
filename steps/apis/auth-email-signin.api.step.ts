import type { ApiRouteConfig, Handlers } from "motia";
import { auth } from "../../lib";
import { errorHandlingMiddleware } from "../../middlewares";
import {
	apiResponseBodySchema,
	authEmailSigninReqSchema,
	authEmailSigninResSchema,
} from "../../schemas";

const apiResponseSchema = apiResponseBodySchema(authEmailSigninResSchema);

export const config: ApiRouteConfig = {
	name: "AuthEmailSigninApi",
	description: "API route for email-based sign-in",
	type: "api",
	emits: [],
	path: "/auth/email/signin",
	method: "POST",
	bodySchema: authEmailSigninReqSchema,
	responseSchema: {
		200: apiResponseSchema,
		400: apiResponseSchema,
		500: apiResponseSchema,
	},
	middleware: [errorHandlingMiddleware],
};

export const handler: Handlers["AuthEmailSigninApi"] = async (
	req,
	{ traceId, logger },
) => {
	logger.info("Step Execution started", { traceId });
	const signInResponse = await auth.api.signInEmail({
		body: req.body,
	});
	logger.info("User signed in via email successfully", { traceId });
	return {
		status: 200,
		body: apiResponseSchema.parse({
			data: signInResponse,
			message: "User signed in via email successfully",
		}),
	};
};
