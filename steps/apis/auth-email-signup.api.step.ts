import type { ApiRouteConfig, Handlers } from "motia";
import { auth } from "../../lib";
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
		500: apiResponseSchema,
	},
};

export const handler: Handlers["AuthEmailSignupApi"] = async (
	req,
	{ logger, traceId },
) => {
	logger.info("AUTH EMAIL SIGNUP API", { traceId });
	try {
		logger.info(`TraceID: ${traceId} - AuthEmailSignupApi called`);
		const signupResponse = await auth.api.signUpEmail({ body: req.body });
		return {
			status: 200,
			body: apiResponseSchema.parse({
				data: signupResponse,
				message: "User signed up successfully",
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
