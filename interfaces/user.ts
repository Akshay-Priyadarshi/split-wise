import type { z } from "zod";
import type { userCreateSchema, userSchema } from "../schemas";

export type IUser = z.infer<typeof userSchema>;

export type IUserCreate = z.infer<typeof userCreateSchema>;
