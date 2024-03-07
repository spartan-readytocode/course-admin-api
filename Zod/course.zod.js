import { z } from "zod";

export const courseSchema = z.object({
  title: z.string().min(20, "Course Title must be at least 20 chars"),
  price: z.number().min(0, "Course price must not be negative"),
});
