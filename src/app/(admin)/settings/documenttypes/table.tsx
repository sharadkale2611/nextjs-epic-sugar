"use client";

import Link from "next/link";
import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import { enqueueSnackbar } from "notistack";

import {
  useDeleteDocumentTypeMutation,
} from "@/features/documenttype";

type Props = {
  data: {
    id: number;
    name: string;
    status: boolean;
  }[];
  
};


const DocumentTypeTable = ({
  data = [],
 
}: Props) => {

  const [deleteDocumentType, { isLoading }] =
    useDeleteDocumentTypeMutation();   

  const handleDelete = async (id: number) => {

    const confirmDelete = confirm(
      "Are you sure you want to delete this document type?"
    );
    if (!confirmDelete) return;

    try {
      const result = await deleteDocumentType(id).unwrap();

      if (result) {
        enqueueSnackbar("Document type deleted successfully", {
          variant: "success",
        });
      }

    } catch (err: any) {
      enqueueSnackbar(
        err?.data?.message || "Failed to delete document type",
        { variant: "error" }
      );
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">

      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-6 py-3">Sr. No.</th>
            <th className="px-6 py-3">Document Type</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={item.id} className="border-t">

              <td className="px-6 py-3">{index + 1}</td>
              <td className="px-6 py-3">
                <Link href={`/settings/documenttypes/${item.id}`}>
                  {item.name}
                </Link>
              </td>

              <td className="px-6 py-3">
{item.status ? 1 : 0}</td>

              <td className="px-6 py-3 text-center space-x-2">

                {/* Edit */}
                <Link href={`/settings/documenttypes/edit/${item.id}`}>
                  <Button
                    size="xs"
                    variant="primary"
                    outline
                    startIcon={<Icon name="PencilIcon" />}
                  >
                    Edit
                  </Button>
                </Link>

                {/* Delete */}
                {/* Enable later if needed */}
                {/* 
                <Button
                  size="xs"
                  variant="danger"
                  outline
                  disabled={isLoading}
                  startIcon={<Icon name="TrashBinIcon" />}
                  onClick={() => handleDelete(item.id)}
                >
                  {isLoading ? "Deleting..." : "Delete"}
                </Button>
                */}
              </td>

            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default DocumentTypeTable;
