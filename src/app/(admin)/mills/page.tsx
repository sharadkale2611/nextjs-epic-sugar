"use client";

import { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Pagination from "@/components/tables/Pagination";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MillTable from "./table";
import Button from "@/components/atoms/Button";


export default function Mills() {
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();


    const millsData = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        millName: `Mill ${i + 1}`,
        location: "Maharashtra",
        contactPerson: `Person ${i + 1}`
    }));

    const itemsPerPage = 5;
    const totalPages = Math.ceil(millsData.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = millsData.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return (
        <>
            <PageBreadcrumb pageTitle="Manage Mills" />

            <div className="space-y-6">
                <ComponentCard
                    title="Mill List"
                    desc="Total 30 record found."
                    action={
                        <Link href="/mills/create">
                            <Button variant="primary" size="sm">
                                + Add Mill
                            </Button>
                        </Link>
                    }
                >
                    <MillTable data={paginatedData} />

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
