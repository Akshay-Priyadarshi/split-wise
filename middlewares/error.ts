import type { ApiMiddleware } from "motia";
import z from "zod";
import { apiResponseBodySchema } from "../schemas";

const apiResponseSchema = apiResponseBodySchema(z.object({}));

export const errorHandlingMiddleware: ApiMiddleware<
	unknown,
	unknown,
	z.infer<typeof apiResponseSchema>
> = async (_, ctx, next) => {
	try {
		ctx.logger.info("Middleware Execution Started", {
			traceId: ctx.traceId,
		});
		return await next();
	} catch (error: unknown) {
		if (error instanceof Error) {
			ctx.logger.error(error.message, { traceId: ctx.traceId, error });
			return {
				status: 400,
				body: apiResponseSchema.parse({
					message: error.message,
				}),
			};
		}
		ctx.logger.error("Internal Server Error", { traceId: ctx.traceId, error });
		return {
			status: 500,
			body: apiResponseSchema.parse({}),
		};
	} finally {
		ctx.logger.info("Middleware Execution Finished", {
			traceId: ctx.traceId,
		});
	}
};
