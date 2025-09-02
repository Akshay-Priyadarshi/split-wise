import { z } from "zod";

export const apiResponseBodySchema = (dataSchema: z.ZodTypeAny) =>
	z.object({
		data: dataSchema.optional(),
		message: z.string(),
		success: z.boolean(),
	});
