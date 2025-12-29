// "use client";

// import { useParams } from "next/navigation";
// import { useGetKycVerificationQuery } from "@/features/kyc";
// import { useUpdateKycStatusMutation } from "@/features/kyc";
// import { useState } from "react";


// export default function KYCDocsPage() {
//     const { userId } = useParams();
//     const { data, isLoading, isError } = useGetKycVerificationQuery(
//         Number(userId)
//     );

//     const [updateKycStatus, { isLoading: isUpdating }] =
//         useUpdateKycStatusMutation();

//     const [openModal, setOpenModal] = useState(false);
//     const [selectedDoc, setSelectedDoc] = useState<any>(null);
//     const [status, setStatus] = useState<string>("Pending");
//     const [remarks, setRemarks] = useState<string>("");


//     if (isLoading)
//         return (
//             <div className="p-6">
//                 <div className="animate-pulse space-y-3">
//                     <div className="h-6 w-60 bg-gray-200 rounded" />
//                     <div className="h-72 w-full bg-gray-200 rounded" />
//                 </div>
//             </div>
//         );

//     if (isError || !data)
//         return (
//             <div className="p-6">
//                 <div className="p-4 rounded-lg bg-red-50 text-red-600 border border-red-200">
//                     Error loading KYC data. Please try again.
//                 </div>
//             </div>
//         );

//     return (
//         <div className="p-6">
//             {/* Page Header */}
//             <div className="mb-5">
//                 <h2 className="text-2xl font-semibold text-gray-800">
//                     KYC Verification —{" "}
//                     <span className="text-blue-600">{data.userName}</span>
//                 </h2>
//                 <p className="text-gray-500 text-sm mt-1">
//                     Review & verify submitted KYC documents
//                 </p>
//             </div>

//             {/* Card Container */}
//             <div className="bg-white shadow-sm border rounded-lg overflow-hidden">
//                 <div className="overflow-x-auto">
//                     <table className="w-full text-sm">
//                         <thead>
//                             <tr className="bg-gray-50 text-gray-600 text-left">
//                                 <th className="px-4 py-3 font-medium">#</th>
//                                 <th className="px-4 py-3 font-medium">Document</th>
//                                 <th className="px-4 py-3 font-medium">Number</th>
//                                 <th className="px-4 py-3 font-medium">Status</th>
//                                 <th className="px-4 py-3 font-medium">Remarks</th>
//                                 <th className="px-4 py-3 font-medium">Action</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {data.documents?.length > 0 ? (
//                                 data.documents.map((doc: any, i: number) => (
//                                     <tr
//                                         key={doc.kycId}
//                                         className="border-t hover:bg-gray-50"
//                                     >
//                                         <td className="px-4 py-3">{i + 1}</td>
//                                         <td className="px-4 py-3">
//                                             {doc.documentTypeName}
//                                         </td>
//                                         <td className="px-4 py-3 text-gray-700">
//                                             {doc.documentNumber || "-"}
//                                         </td>

//                                         {/* STATUS BADGE */}
//                                         <td className="px-4 py-3">
//                                             <span
//                                                 className={`px-2 py-1 text-xs rounded-full font-medium
//                                                      ${doc.status === "Uploaded"
//                                                         ? "bg-green-50 text-green-700 border border-green-200"
//                                                         : doc.status === "Rejected"
//                                                             ? "bg-red-50 text-red-700 border border-red-200"
//                                                             : "bg-yellow-50 text-yellow-700 border border-yellow-200"
//                                                     }`}
//                                             >
//                                                 {doc.status}
//                                             </span>
//                                         </td>

//                                         <td className="px-4 py-3 text-gray-600">
//                                             {doc.remarks || "-"}
//                                         </td>
//                                         <td className="px-4 py-3">
//                                             <button
//                                                 onClick={() => {
//                                                     setSelectedDoc(doc);
//                                                     setStatus(doc.status || "Pending");
//                                                     setRemarks(doc.remarks || "");
//                                                     setOpenModal(true);
//                                                 }}
//                                                 className="px-4 py-1.5 text-sm font-medium rounded-md 
//              bg-blue-600 text-white 
//              hover:bg-blue-700 transition-all shadow-sm"
//                                             >
//                                                 Verify
//                                             </button>


//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td
//                                         colSpan={5}
//                                         className="text-center text-gray-500 py-6"
//                                     >
//                                         No KYC documents found.
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>


//                     {openModal && selectedDoc && (
//                         <div className="fixed inset-0 z-50 flex items-center justify-center">

//                             {/* Soft Dim Overlay */}
//                             <div
//                                 className="absolute inset-0 bg-black/25 transition-opacity"
//                                 onClick={() => setOpenModal(false)}
//                             />

//                             {/* Modal Card */}
//                             <div className="relative bg-white rounded-xl shadow-2xl 
//                     border border-gray-100 w-full max-w-lg p-6
//                     animate-[fadeIn_0.2s_ease-out,scaleIn_0.25s_ease-out]">

//                                 <h3 className="text-lg font-semibold text-gray-800 mb-1">
//                                     Verify Document
//                                 </h3>

//                                 <p className="text-sm text-gray-500 mb-4">
//                                     {selectedDoc.documentTypeName}
//                                 </p>

//                                 {/* Status */}
//                                 <div className="space-y-2 mb-4">
//                                     {["Pending", "Uploaded", "Rejected"].map((s) => (
//                                         <label key={s} className="flex items-center gap-2 text-sm">
//                                             <input
//                                                 type="radio"
//                                                 name="status"
//                                                 value={s}
//                                                 checked={status === s}
//                                                 onChange={() => setStatus(s)}
//                                                 className="accent-blue-600"
//                                             />
//                                             {s}
//                                         </label>
//                                     ))}
//                                 </div>

//                                 {/* Remarks */}
//                                 <textarea
//                                     placeholder="Remarks (optional)"
//                                     value={remarks}
//                                     onChange={(e) => setRemarks(e.target.value)}
//                                     className="w-full border rounded-md p-2 text-sm 
//                    focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                                 />

//                                 {/* Footer */}
//                                 <div className="flex justify-end gap-2 mt-4">
//                                     <button
//                                         onClick={() => setOpenModal(false)}
//                                         className="px-4 py-1.5 rounded-md border text-gray-600 
//                      hover:bg-gray-50 transition"
//                                     >
//                                         Cancel
//                                     </button>

//                                     <button
//                                         disabled={isUpdating}
//                                         onClick={async () => {
//                                             await updateKycStatus({
//                                                 kycId: selectedDoc.kycId,
//                                                 status,
//                                                 remarks,
//                                             });
//                                             setOpenModal(false);
//                                         }}
//                                         className="px-4 py-1.5 rounded-md bg-green-600 text-white 
//                      hover:bg-green-700 disabled:opacity-60 transition"
//                                     >
//                                         {isUpdating ? "Saving..." : "Submit"}
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     )}





//                 </div>
//             </div>
//         </div>
//     );
// }





















"use client";

import { useGetKycVerificationQuery, useUpdateKycStatusMutation } from "@/features/kyc";
import { useState } from "react";

export default function KYCDocsPage({ userId }: { userId: number }) {

    const { data, isLoading, isError } = useGetKycVerificationQuery(Number(userId));

    const [updateKycStatus, { isLoading: isUpdating }] =
        useUpdateKycStatusMutation();

    const [openModal, setOpenModal] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState<any>(null);
    const [status, setStatus] = useState<string>("Pending");
    const [remarks, setRemarks] = useState<string>("");

    if (isLoading)
        return (
            <div className="p-6">
                <div className="animate-pulse space-y-3">
                    <div className="h-6 w-60 bg-gray-200 rounded" />
                    <div className="h-72 w-full bg-gray-200 rounded" />
                </div>
            </div>
        );

    if (isError || !data)
        return (
            <div className="p-6">
                <div className="p-4 rounded-lg bg-red-50 text-red-600 border border-red-200">
                    Error loading KYC data. Please try again.
                </div>
            </div>
        );

    return (
        <div className="p-6">
            <div className="mb-5">
                <h2 className="text-2xl font-semibold text-gray-800">
                    KYC Verification —{" "}
                    <span className="text-blue-600">{data.userName}</span>
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                    Review & verify submitted KYC documents
                </p>
            </div>

            <div className="bg-white shadow-sm border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 text-gray-600 text-left">
                                <th className="px-4 py-3 font-medium">#</th>
                                <th className="px-4 py-3 font-medium">Document</th>
                                <th className="px-4 py-3 font-medium">Number</th>
                                <th className="px-4 py-3 font-medium">Status</th>
                                <th className="px-4 py-3 font-medium">Remarks</th>
                                <th className="px-4 py-3 font-medium">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.documents?.length > 0 ? (
                                data.documents.map((doc: any, i: number) => (
                                    <tr key={doc.kycId} className="border-t hover:bg-gray-50">
                                        <td className="px-4 py-3">{i + 1}</td>
                                        <td className="px-4 py-3">{doc.documentTypeName}</td>
                                        <td className="px-4 py-3 text-gray-700">
                                            {doc.documentNumber || "-"}
                                        </td>

                                        <td className="px-4 py-3">
                                            <span
                                                className={`px-2 py-1 text-xs rounded-full font-medium
                                                    ${
                                                      doc.status === "Uploaded"
                                                        ? "bg-green-50 text-green-700 border border-green-200"
                                                        : doc.status === "Rejected"
                                                        ? "bg-red-50 text-red-700 border border-red-200"
                                                        : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                                                    }`}
                                            >
                                                {doc.status}
                                            </span>
                                        </td>

                                        <td className="px-4 py-3 text-gray-600">
                                            {doc.remarks || "-"}
                                        </td>

                                        <td className="px-4 py-3">
                                            <button
                                                onClick={() => {
                                                    setSelectedDoc(doc);
                                                    setStatus(doc.status || "Pending");
                                                    setRemarks(doc.remarks || "");
                                                    setOpenModal(true);
                                                }}
                                                className="px-4 py-1.5 text-sm font-medium rounded-md 
                                                    bg-blue-600 text-white 
                                                    hover:bg-blue-700 transition-all shadow-sm"
                                            >
                                                Verify
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="text-center text-gray-500 py-6">
                                        No KYC documents found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {openModal && selectedDoc && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center">

                            <div
                                className="absolute inset-0 bg-black/25 transition-opacity"
                                onClick={() => setOpenModal(false)}
                            />

                            <div className="relative bg-white rounded-xl shadow-2xl 
                                border border-gray-100 w-full max-w-lg p-6">

                                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                    Verify Document
                                </h3>

                                <p className="text-sm text-gray-500 mb-4">
                                    {selectedDoc.documentTypeName}
                                </p>

                                <div className="space-y-2 mb-4">
                                    {["Pending", "Uploaded", "Rejected"].map((s) => (
                                        <label key={s} className="flex items-center gap-2 text-sm">
                                            <input
                                                type="radio"
                                                name="status"
                                                value={s}
                                                checked={status === s}
                                                onChange={() => setStatus(s)}
                                                className="accent-blue-600"
                                            />
                                            {s}
                                        </label>
                                    ))}
                                </div>

                                <textarea
                                    placeholder="Remarks (optional)"
                                    value={remarks}
                                    onChange={(e) => setRemarks(e.target.value)}
                                    className="w-full border rounded-md p-2 text-sm 
                                        focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                />

                                <div className="flex justify-end gap-2 mt-4">
                                    <button
                                        onClick={() => setOpenModal(false)}
                                        className="px-4 py-1.5 rounded-md border text-gray-600 
                                            hover:bg-gray-50 transition"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        disabled={isUpdating}
                                        onClick={async () => {
                                            await updateKycStatus({
                                                kycId: selectedDoc.kycId,
                                                status,
                                                remarks,
                                            });
                                            setOpenModal(false);
                                        }}
                                        className="px-4 py-1.5 rounded-md bg-green-600 text-white 
                                            hover:bg-green-700 disabled:opacity-60 transition"
                                    >
                                        {isUpdating ? "Saving..." : "Submit"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

