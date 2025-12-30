"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

import {
    useGetProductByIdQuery,
    useGetProductImagesQuery,
    useUploadProductImagesMutation,
    useDeleteProductImageMutation,
} from "@/features/product/productApi";

type PreviewImage = {
    file: File;
    preview: string;
};

export default function ProductViewPage() {
    const params = useParams();
    const productId = Number(params.id);

    const { data: product, isLoading } = useGetProductByIdQuery(productId);
    const { data: images = [] } = useGetProductImagesQuery(productId);

    const [uploadImages, { isLoading: uploading }] =
        useUploadProductImagesMutation();

    const [deleteImage] = useDeleteProductImageMutation();

    const [selectedImages, setSelectedImages] = useState<PreviewImage[]>([]);

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const files = Array.from(e.target.files);
        const previews = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setSelectedImages((prev) => [...prev, ...previews]);
    };

    const handleUpload = async () => {
        if (selectedImages.length === 0) return;

        await uploadImages({
            productId,
            images: selectedImages.map((i) => i.file),
        });

        setSelectedImages([]);
    };

    const handleDelete = async (imageId: number) => {
        await deleteImage({ imageId, productId });
    };

    if (isLoading) return <div>Loading...</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div className="mx-auto max-w-6xl px-6 py-8">
            <h1 className="mb-6 text-2xl font-semibold">Product Details</h1>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* LEFT SIDE */}
                <div className="rounded-lg border bg-white p-6">
                    <InfoRow label="Product Name" value={product.productName} />
                    <InfoRow label="Grade" value={product.productGrade ?? "-"} />
                    <InfoRow label="Stock" value={product.stockQuantity} />
                    <InfoRow
                        label="Status"
                        value={product.status ? "Active" : "Inactive"}
                        badge
                    />
                    <InfoRow
                        label="Price"
                        value={product.sellingPrice ?? "N/A"}
                    />
                </div>

                {/* RIGHT SIDE - IMAGES */}
                <div className="rounded-lg border bg-white p-6">
                    <h3 className="mb-3 text-sm font-semibold text-gray-700">
                        Product Images
                    </h3>

                    {/* Existing Images */}
                    {images.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            {images.map((img) => (
                                <div
                                    key={img.productImageId}
                                    className="relative rounded border overflow-hidden"
                                >
                                    <Image
                                        src={img.productImagePath}
                                        alt="product"
                                        width={300}
                                        height={200}
                                        className="h-40 w-full object-cover"
                                    />

                                    <button
                                        onClick={() =>
                                            handleDelete(img.productImageId)
                                        }
                                        className="absolute top-2 right-2 rounded bg-red-600 px-2 py-1 text-xs text-white"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 mb-4">
                            No images uploaded.
                        </p>
                    )}

                    {/* Upload Section */}
                    <div className="border-t pt-4">
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageSelect}
                            className="mb-3"
                        />

                        {selectedImages.length > 0 && (
                            <>
                                <div className="grid grid-cols-3 gap-3 mb-3">
                                    {selectedImages.map((img, index) => (
                                        <div
                                            key={index}
                                            className="relative h-24 overflow-hidden rounded border"
                                        >
                                            <Image
                                                src={img.preview}
                                                alt="preview"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={handleUpload}
                                    disabled={uploading}
                                    className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                >
                                    {uploading
                                        ? "Uploading..."
                                        : "Upload Images"}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ======================
   SMALL COMPONENT
====================== */
function InfoRow({
    label,
    value,
    badge,
}: {
    label: string;
    value: string | number;
    badge?: boolean;
}) {
    return (
        <div className="flex justify-between border-b py-2">
            <span className="text-gray-500">{label}</span>
            {badge ? (
                <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-700">
                    {value}
                </span>
            ) : (
                <span className="font-medium">{value}</span>
            )}
        </div>
    );
}
