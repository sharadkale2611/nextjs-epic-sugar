"use client";

import CustomInput from "@/components/atoms/CustomInput";
import CustomSelect from "@/components/atoms/CustomSelect";
import React, { useState } from "react";

interface StateOption {
    id: number;
    name: string;
}

interface CityOption {
    id: number;
    name: string;
}

export default function CreateCompanyPage() {
    const [form, setForm] = useState({
        companyName: "",
        companyCode: "",
        businessType: "",
        phone: "",
        email: "",
        gstNumber: "",
        panNumber: "",
        country: "India",
        stateId: "",
        cityId: "",
        pincode: "",
        address: "",
    });

    const states: StateOption[] = [
        { id: 1, name: "Maharashtra" },
        { id: 2, name: "Gujarat" },
    ];

    const cities: CityOption[] =
        form.stateId === "1"
            ? [
                { id: 1, name: "Pune" },
                { id: 2, name: "Mumbai" },
            ]
            : form.stateId === "2"
                ? [
                    { id: 3, name: "Ahmedabad" },
                    { id: 4, name: "Surat" },
                ]
                : [];

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        console.log("Company Data:", form);
    };

    return (
        <div className="mx-auto max-w-6xl px-6 py-8">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-900">
                    Create Company
                </h1>
            </div>

            {/* Card */}
            <div className="rounded-xl border bg-white shadow-sm">
                <div className="space-y-10 p-6">

                    {/* Company Info */}
                    <section>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700">
                            Company Information
                        </h3>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <CustomInput label="Company Name" name="companyName" value={form.companyName} onChange={handleChange} />
                            <CustomInput label="Company Code" name="companyCode" value={form.companyCode} onChange={handleChange} />
                            <CustomInput label="Business Type" name="businessType" value={form.businessType} onChange={handleChange} />
                            <CustomInput label="Phone" name="phone" value={form.phone} onChange={handleChange} />
                        </div>
                    </section>

                    {/* Contact Info */}
                    <section>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700">
                            Contact Information
                        </h3>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <CustomInput label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
                            <CustomInput label="GST Number" name="gstNumber" value={form.gstNumber} onChange={handleChange} />
                            <CustomInput label="PAN Number" name="panNumber" value={form.panNumber} onChange={handleChange} />
                            <CustomInput label="Country" name="country" value={form.country} onChange={handleChange} />
                        </div>
                    </section>

                    {/* Location */}
                    <section>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700">
                            Location Details
                        </h3>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <CustomSelect
                                label="State"
                                name="stateId"
                                value={form.stateId}
                                onChange={handleChange}
                                options={states}
                            />

                            <CustomSelect
                                label="City"
                                name="cityId"
                                value={form.cityId}
                                onChange={handleChange}
                                options={cities}
                            />

                            <CustomInput label="Pincode" name="pincode" value={form.pincode} onChange={handleChange} />
                            <CustomInput label="Address" name="address" value={form.address} onChange={handleChange} />
                        </div>
                    </section>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 border-t pt-6">
                        <button
                            onClick={() => history.back()}
                            className="rounded-lg border px-5 py-2 text-gray-700 hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleSave}
                            className="rounded-lg bg-green-600 px-6 py-2 font-medium text-white hover:bg-green-700"
                        >
                            Save Company
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
