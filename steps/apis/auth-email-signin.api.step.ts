import type { ApiRouteConfig, Handlers } from "motia";
import { auth } from "../../lib";
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
		500: apiResponseSchema,
	},
};

export const handler: Handlers["AuthEmailSigninApi"] = async (
	req,
	{ traceId, logger },
) => {
	try {
		const createExpenseCategory = await auth.api.signInEmail({
			body: req.body,
		});
		return {
			status: 200,
			body: apiResponseSchema.parse({
				data: createExpenseCategory,
				message: "User signed in via email successfully",
			}),
		};
	} catch (error) {
		logger.error("Error signing in user via email", { traceId, error });
		return {
			status: 500,
			body: apiResponseSchema.parse({}),
		};
	}
};
