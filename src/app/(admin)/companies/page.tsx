"use client";

import { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Pagination from "@/components/tables/Pagination";
import Link from "next/link";
import CompaniesTable from "./table";
import Button from "@/components/atoms/Button";

export default function Companies() {
    const [currentPage, setCurrentPage] = useState(1);

    const companiesData = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        companyName: `company ${i + 1}`,
        location: "Maharashtra",
        contactDetails: `Person ${i + 1}`
    }));

    const itemsPerPage = 5;
    const totalPages = Math.ceil(companiesData.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = companiesData.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return (
        <>
            <PageBreadcrumb pageTitle="Manage Companies (Buyers)" />

            <div className="space-y-6">
                <ComponentCard
                    title="Companies List"
                    desc="Manage all companies and contacts"
                    action={

                        <Link href="/companies/create">
                            <Button variant="primary" size="sm">
                                + Add Company
                            </Button>
                        </Link>
                    }
                >
                    <CompaniesTable data={paginatedData} />

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
