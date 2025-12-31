"use client";

import { useState } from "react";
import Link from "next/link";

import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Pagination from "@/components/tables/Pagination";

import {
  useGetPaginatedDocumentTypesQuery,
  DocumentType,
} from "@/features/documenttype";

import DocumentTypeTable from "./table";

export default function DocumentTypeListPage() {

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const { data, isLoading, isError } =
    useGetPaginatedDocumentTypesQuery({
      pageNumber: currentPage,
      pageSize,
    });

  if (isLoading) return <div>Loading document types...</div>;
  if (isError) return <div>Failed to load document types.</div>;

  const docs: DocumentType[] = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;
  const totalCount = data?.totalCount ?? 0;

  // Convert API -> UI
  const transformedData = docs.map(d => ({
    id: d.documentId,
    name: d.documentTypeName,
    status: d.status,
  }));

  return (
    <>
      <PageBreadcrumb pageTitle="Manage Document Types" />

      <div className="space-y-6">

        <ComponentCard
          title="Document Type List"
          desc={`Total ${totalCount} records found.`}
          action={
            <Link href="/settings/documenttypes/create">
              <button className="btn btn-primary text-sm">
                + Add Document Type
              </button>
            </Link>
          }
        >

          <DocumentTypeTable  data={transformedData}         
         />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />

        </ComponentCard>

      </div>
    </>
  );
}
