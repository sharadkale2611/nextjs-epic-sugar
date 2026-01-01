"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetProductByIdQuery } from "@/features/product/productApi";
import CustomInput from "@/components/atoms/CustomInput";
import Button from "@/components/atoms/Button";

export default function BuyPage() {
    const { id } = useParams();
    const { data: product, isLoading } = useGetProductByIdQuery(Number(id));

    const [quantity, setQuantity] = useState("");
    const [driverName, setDriverName] = useState("");
    const [mobile, setMobile] = useState("");
    const [vehicleType, setVehicleType] = useState("");
    const [vehicleNumber, setVehicleNumber] = useState("");

    useEffect(() => {
        console.log("Selected product:", product);
    }, [product]);

    if (isLoading) {
        return <div className="p-10 text-center">Loading product...</div>;
    }

    const basePrice = Number(product?.sellingPrice ?? 0);
    const totalPrice = Number(quantity || 0) * basePrice;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">

                {/* PRODUCT DETAILS */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex flex-col md:flex-row md:justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-semibold text-green-700">
                            {product?.productName}
                        </h2>

                        <p className="text-sm mt-1">
                            Grade:{" "}
                            <span className="font-medium">
                                {product?.productGrade}
                            </span>
                        </p>

                        <div className="mt-4 w-40">
                            <CustomInput
                                label="Quantity"
                                name="quantity"
                                type="number"
                                value={quantity}
                                placeholder="Enter Quantity"
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="text-right">
                        <p className="text-sm">
                            Base Price:{" "}
                            <span className="font-medium">₹{basePrice}</span>
                        </p>

                        <p className="text-sm mt-2">
                            Total Price:{" "}
                            <span className="font-semibold">
                                ₹{totalPrice}
                            </span>
                        </p>
                    </div>
                </div>

                {/* DRIVER & VEHICLE DETAILS */}
                <h3 className="text-red-600 font-semibold mt-8 mb-4">
                    Driver & Vehicle Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CustomInput
                        label="Driver Name"
                        name="driverName"
                        value={driverName}
                        onChange={(e) => setDriverName(e.target.value)}
                        placeholder="Enter Driver Name"
                    />

                    <CustomInput
                        label="Mobile Number"
                        name="mobile"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="Enter Mobile Number"
                    />

                    <CustomInput
                        label="Vehicle Type"
                        name="vehicleType"
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value)}
                        placeholder="Truck / Tempo / Tractor"
                    />

                    <CustomInput
                        label="Vehicle Number"
                        name="vehicleNumber"
                        value={vehicleNumber}
                        onChange={(e) => setVehicleNumber(e.target.value)}
                        placeholder="MH-12 AB 1234"
                    />
                </div>

                {/* ACTION BUTTON */}
                <div className="flex justify-end mt-6">
                    <Button
                        variant="primary"
                        size="md"
                        isLoading={false}
                        disabled={!quantity}
                    >
                        Buy
                    </Button>
                </div>
            </div>
        </div>
    );
}
