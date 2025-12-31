import { z } from "zod";

export const documentTypeSchema = z.object({
  documentTypeName: z
    .string()
    .min(1, "Document type name is required")
    .max(100, "Maximum 100 characters allowed"),

  status: z
    .boolean()
    .refine((v) => v === true || v === false, {
      message: "Status is required",
    }),
});

export type DocumentTypeFormValues = z.infer<typeof documentTypeSchema>;
