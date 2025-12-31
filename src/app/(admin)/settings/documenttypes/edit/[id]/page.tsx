"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/atoms/Button";
import CustomInput from "@/components/atoms/CustomInput";

import {
  useGetDocumentTypeByIdQuery,
  useUpdateDocumentTypeMutation,
} from "@/features/documenttype";

import {
  documentTypeSchema,
  DocumentTypeFormValues,
} from "@/features/documenttype";

export default function EditDocumentTypePage() {

  const router = useRouter();
  const params = useParams();

  const documentId = Number(
    Array.isArray(params.id) ? params.id[0] : params.id
  );

  const { data: documentType, isLoading } =
    useGetDocumentTypeByIdQuery(documentId, {
      skip: !documentId,
    });

  const [updateDocumentType, { isLoading: isSaving }] =
    useUpdateDocumentTypeMutation();

  const [form, setForm] = useState<DocumentTypeFormValues>({
    documentTypeName: "",
    status: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  // Load API data into form when available
  useEffect(() => {
    if (!documentType || isLoading) return;

   setForm({
  documentTypeName: documentType.documentTypeName ?? "",
  status: Boolean(documentType.status),
});


  }, [documentType, isLoading]);

  if (isLoading) return <div>Loading...</div>;
  if (!documentType) return <div>Document Type not found</div>;

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
      await updateDocumentType({
        documentId,
        ...result.data,
      }).unwrap();

      enqueueSnackbar("Document Type updated successfully!", {
        variant: "success",
      });

      router.push("/settings/documenttypes");

    } catch (err: any) {
      setFormError(
        err?.data?.message ||
        "Something went wrong while updating document type."
      );
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">

      <PageBreadcrumb pageTitle="Edit Document Type" />

      <ComponentCard
        title="Update Document Type"
        desc="Modify document type details"
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
    setForm({
      ...form,
      status: e.target.value === "1",
    })
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
              isLoading={isSaving}
            >
              Update Document Type
            </Button>

          </div>

        </div>

      </ComponentCard>

    </div>
  );
}
