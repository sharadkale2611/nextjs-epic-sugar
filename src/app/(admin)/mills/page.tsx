"use client";

import { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Pagination from "@/components/tables/Pagination";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MillTable from "./table";
import Button from "@/components/atoms/Button";
import { useGetPaginatedMillsQuery } from "@/features/mill/millApi";

export default function Mills() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const { data, isLoading, isError } = useGetPaginatedMillsQuery({
        pageNumber: currentPage,
        pageSize: itemsPerPage,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading mills data.</div>;
    }

    return (
        <>
            <PageBreadcrumb pageTitle="Manage Mills" />

            <div className="space-y-6">
                <ComponentCard
                    title="Mill List"
                    desc={`Total ${data?.totalRecords || 0} records found.`}
                    action={
                        <Link href="/mills/create">
                            <Button variant="primary" size="sm">
                                + Add Mill
                            </Button>
                        </Link>
                    }
                >
                    <MillTable data={data?.items || []} />

                    <Pagination
                        currentPage={currentPage}
                        totalPages={data?.totalPages || 1}
                        onPageChange={setCurrentPage}
                    />
                </ComponentCard>
            </div>
        </>
    );
}
