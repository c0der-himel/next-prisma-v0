import { z } from "zod";

export const formSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Title must be at least 1 character.",
    })
    .max(255, {
      message: "Description can not exceed 256 characters",
    }),
  description: z.string().min(1, {
    message: "Description must be at least 1 character.",
  }),
});
