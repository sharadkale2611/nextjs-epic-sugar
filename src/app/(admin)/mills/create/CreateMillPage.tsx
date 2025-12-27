"use client";

import CustomInput from "@/components/atoms/CustomInput";
import CustomSelect from "@/components/atoms/CustomSelect";
import LocationSelector from "@/components/molecules/LocationSelector";
import React, { useState } from "react";

interface StateOption {
    id: number;
    name: string;
}

interface CityOption {
    id: number;
    name: string;
}

export default function CreateMillPage() {
    const [form, setForm] = useState({
        millName: "",
        millCode: "",
        address: "",
        stateId: null as number | null,
        cityId: null as number | null,
        country: "",
        pincode: "",
        contactPerson: "",
        contactNumber: "",
        email: "",
        gstNumber: "",
    });
   

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleStateChange = (stateId: number) => {
        setForm((prev) => ({
            ...prev,
            stateId,
            cityId: null, // reset city when state changes
        }));
    };

    const handleCityChange = (cityId: number) => {
        setForm((prev) => ({
            ...prev,
            cityId,
        }));
    };


    const handleSave = () => {
        console.log("Mill Data:", form);
    };

    return (
        <div className="mx-auto max-w-6xl px-6 py-8">
            {/* Page Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">Add New Mill</h1>
                <p className="text-sm text-gray-500">
                    Provide mill, location and contact information
                </p>
            </div>

            {/* Card Container */}
            <div className="rounded-xl border bg-white shadow-sm">
                <div className="space-y-10 p-6">

                    {/* Basic Info */}
                    <section>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700">
                            Basic Information
                        </h3>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <CustomInput label="Mill Name" name="millName" value={form.millName} onChange={handleChange} />
                            <CustomInput label="Mill Code" name="millCode" value={form.millCode} onChange={handleChange} />
                            <CustomInput label="Address" name="address" value={form.address} onChange={handleChange} />
                        </div>
                    </section>

                    {/* Location */}
                    <section>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700">
                            Location Details
                        </h3>

                        <LocationSelector
                            stateId={form.stateId}
                            cityId={form.cityId}
                            onStateChange={(val) =>
                                setForm((prev) => ({ ...prev, stateId: val, cityId: null }))
                            }
                            onCityChange={(val) =>
                                setForm((prev) => ({ ...prev, cityId: val }))
                            }
                            stateCol={{ base: 12, md: 6 }}
                            cityCol={{ base: 12, md: 6 }}
                        />



                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
                            <CustomInput label="Pin Code" name="pincode" value={form.pincode} onChange={handleChange} />
                            <CustomInput label="Country" name="country" value={form.country} onChange={handleChange} />
                        </div>
                    </section>

                    {/* Contact */}
                    <section>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-700">
                            Contact Details
                        </h3>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <CustomInput label="Contact Person" name="contactPerson" value={form.contactPerson} onChange={handleChange} />
                            <CustomInput label="Contact Number" name="contactNumber" value={form.contactNumber} onChange={handleChange} />
                            <CustomInput label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
                            <CustomInput label="GST Number" name="gstNumber" value={form.gstNumber} onChange={handleChange} />
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
                            className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700"
                        >
                            Save Mill
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
