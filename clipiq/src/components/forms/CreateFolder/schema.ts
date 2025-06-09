import { z } from "zod";

export const FolderSchema = z.object({
  name: z.string().min(1, 
    { message: "Name is required" }),
});
