"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/atoms/Button";
import CustomInput from "@/components/atoms/CustomInput";

import {
  useCreateDocumentTypeMutation,
} from "@/features/documenttype";

import {
  documentTypeSchema,
  DocumentTypeFormValues,
} from "@/features/documenttype";

export default function CreateDocumentTypePage() {

  const router = useRouter();
  const [createDocumentType, { isLoading }] =
    useCreateDocumentTypeMutation();

  const [form, setForm] = useState<DocumentTypeFormValues>({
    documentTypeName: "",
    status: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  const handleSave = async () => {

    setErrors({});
    setFormError(null);

    const result = documentTypeSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};

      result.error.issues.forEach(issue => {
        fieldErrors[issue.path[0] as string] = issue.message;
      });

      setErrors(fieldErrors);
      setFormError("Please fix the errors and try again.");
      return;
    }

    try {
      await createDocumentType(result.data).unwrap();

      enqueueSnackbar("Document Type created successfully!", {
        variant: "success",
      });

      router.push("/settings/documenttypes");

    } catch (err: any) {

      setFormError(
        err?.data?.message ||
        "Something went wrong while creating document type."
      );
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">

      <PageBreadcrumb pageTitle="Add Document Type" />

      <ComponentCard
        title="Create Document Type"
        desc="Enter document type details"
      >

        {formError && (
          <div className="border border-red-200 bg-red-50 p-3 rounded text-sm text-red-700 mb-4">
            {formError}
          </div>
        )}

        <div className="space-y-6">

          {/* Document Type Name */}
          <CustomInput
            label="Document Type Name"
            name="documentTypeName"
            value={form.documentTypeName}
            onChange={(e) =>
              setForm({ ...form, documentTypeName: e.target.value })
            }
            error={errors.documentTypeName}
          />

          {/* Status */}
          <div>
            <label className="block text-sm mb-1 font-medium">
              Status
            </label>

           <select
  className="form-select rounded-lg border px-3 py-2"
  value={form.status ? "1" : "0"}
  onChange={(e) =>
    setForm({ ...form, status: e.target.value === "1" })
  }
>
  <option value="1">Active</option>
  <option value="0">Inactive</option>
</select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t pt-6">

            <Button variant="default" onClick={() => router.back()}>
              Cancel
            </Button>

            <Button
              variant="primary"
              onClick={handleSave}
              isLoading={isLoading}
            >
              Save Document Type
            </Button>

          </div>

        </div>

      </ComponentCard>

    </div>
  );
}
