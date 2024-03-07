import { z } from "zod";

export const studentSchema = z.object({
   username :  z.string().email(),
   password : z.string(),
})

