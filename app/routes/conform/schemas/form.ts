import { z } from "zod";

export const schema = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email("Email is invalid"),
});
