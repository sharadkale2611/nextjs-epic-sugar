"use client";

import { useState } from "react";
import Icon from "@/components/atoms/Icon";
import { useGetMillDetailsQuery, useUpdateMillStatusMutation } from "@/features/mill/millApi";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import KYCDocsPage from "@/app/(admin)/kyc-documents/[userId]/page";

/* =======================
   SMALL REUSABLE COMPONENTS
======================= */

const Tab = ({ label, icon, active, onClick }: any) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition
        ${active ? "bg-blue-500 text-white shadow" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
    >
        <Icon name={icon} className="w-4 h-4" />
        {label}
    </button>
);

const Section = ({ title, icon, children }: any) => (
    <div>
        <h3 className="text-blue-600 font-semibold mb-3 flex items-center gap-2">
            <Icon name={icon} className="w-5 h-5" />
            {title}
        </h3>

        <div className="bg-white rounded-2xl shadow p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            {children}
        </div>
    </div>
);

const InfoCard = ({ label, value }: any) => (
    <div className="bg-gray-50 p-4 rounded-xl">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-semibold">{value || "-"}</p>
    </div>
);

const InfoRow = ({ label, value }: any) => (
    <div className="flex flex-col">
        <span className="text-sm text-gray-500">{label}</span>
        <span className="font-medium">{value || "-"}</span>
    </div>
);

const MillUsersTable = ({ users }: any) => {
    return (
        <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-center gap-2 mb-4">
                <Icon name="GroupIcon" className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-blue-600">Mill Users</h2>
            </div>

            <div className="overflow-hidden rounded-xl border">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b">
                        <tr className="text-left font-semibold">
                            <th className="px-4 py-3">User ID</th>
                            <th className="px-4 py-3">User Name</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user: any) => (
                            <tr key={user.userId} className="border-b last:border-0">
                                <td className="px-4 py-3">{user.userId}</td>
                                <td className="px-4 py-3">{user.userName}</td>
                                <td className="px-4 py-3">{user.email || "-"}</td>
                                <td className="px-4 py-3">
                                    <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                                        <Icon name="CheckCircleIcon" className="w-4 h-4" />
                                        Active
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const KYCDocumentsTable = ({ documents , onVerifyClick }: any) => {
    //  const router = useRouter();
     const userId = documents?.[0]?.userId;
    return (
        <div className="bg-white rounded-2xl shadow p-6 mt-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Icon name="FileIcon" className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-semibold text-blue-600">KYC Documents</h2>
                </div>

                
                {/* <button
                onClick={() => router.push(`/kyc-documents/${userId}`)}
                className="flex items-center gap-2 border border-green-600 text-green-600 px-4 py-2 rounded-full text-sm hover:bg-green-50"
                >
                Verify Documents
                </button> */}

                <button
  onClick={() => onVerifyClick(userId)}
  className="flex items-center gap-2 border border-green-600 text-green-600 px-4 py-2 rounded-full text-sm hover:bg-green-50"
>
  Verify Documents
</button>
            </div>

            <div className="overflow-hidden rounded-xl border">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b">
                        <tr className="text-left font-semibold">
                            <th className="px-4 py-3">KYC ID</th>
                            {/* <th className="px-4 py-3">User Name</th> */}
                            <th className="px-4 py-3">Document Name</th>
                            <th className="px-4 py-3">Document Number</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Remarks</th>
                            <th className="px-4 py-3">Document</th>
                        </tr>
                    </thead>

                    <tbody>
                        {documents.map((doc: any) => (
                            <tr key={doc.kycId} className="border-b last:border-0">
                                <td className="px-4 py-3">{doc.kycId}</td>
                                {/* <td className="px-4 py-3">{doc.user.userName}</td> */}
                                <td className="px-4 py-3">{doc.documentType.documentTypeName}</td>
                                <td className="px-4 py-3">{doc.documentNumber??'-'}</td>

                                <td className="px-4 py-3">
                                    {doc.status === "Verified" ? (
                                        <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                                            <Icon name="CheckCircleIcon" className="w-4 h-4" />
                                            Verified
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                                                <Icon name="TimeIcon" className="w-4 h-4" />
                                            Pending
                                        </span>
                                    )}
                                </td>

                                <td className="px-4 py-3">{doc.remarks}</td>

                                <td className="px-4 py-3">
                                    {doc.file ? (
                                        <button className="text-blue-600 border border-blue-500 px-3 py-1 rounded-full text-xs hover:bg-blue-50">
                                            View
                                        </button>
                                    ) : (
                                        "-"
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


/* =======================
   TABS CONTENT
======================= */

const ProfileTab = ({ mill }: any) => (
    <>
        <Section title="Mill Information" icon="BoxIcon">
            <InfoCard label="Mill Name" value={mill.millName} />
            <InfoCard label="Mill Code" value={mill.millCode} />
            <InfoCard label="GST Number" value={mill.gstNumber} />
        </Section>

        <Section title="Contact Information" icon="UserIcon">
            <InfoRow label="Contact Person" value={mill.contactPerson} />
            <InfoRow label="Contact Number" value={mill.contactNumber} />
            <InfoRow label="Email" value={mill.email} />
        </Section>

        <Section title="Address Details" icon="LocationIcon">
            <InfoRow label="Address" value={mill.address} />
            <InfoRow label="State" value={mill.stateName} />
            <InfoRow label="City" value={mill.cityName} />
            <InfoRow label="Pincode" value={mill.pincode} />
        </Section>
    </>
);

const UsersTab = ({ users }: any) => (
            <MillUsersTable users={users} />

);

// const KYCTab = ({ kycDocs }: any) => (
//     <KYCDocumentsTable documents={kycDocs} />
// );

const KYCTab = ({
  kycDocs,
  onVerifyClick,
  showKycVerification,
  selectedUserId,
  onBack
}: any) => (
  <>
    {!showKycVerification && (
      <KYCDocumentsTable documents={kycDocs} onVerifyClick={onVerifyClick} />
    )}

    {showKycVerification && selectedUserId && (
      <div className="mt-6 animate-fadeIn">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold text-blue-600">Verify KYC</h2>

          <button
            onClick={onBack}
            className="px-4 py-2 rounded-full border text-gray-600 hover:bg-gray-50"
          >
            ← Back to KYC List
          </button>
        </div>

        <KYCDocsPage userId={selectedUserId} />
      </div>
    )}
  </>
);


const ProductsTab = ({ products }: any) => (
    <Section title="Products" icon="BoxCubeIcon">
        {products.length === 0 ? (
            <p className="text-gray-500">No products available</p>
        ) : (
            products.map((p: any, i: number) => (
                <InfoRow key={i} label={p.name} value={p.status} />
            ))
        )}
    </Section>
);

/* =======================
   MAIN PAGE
======================= */

export default function MillProfileView({ millId }: { millId: number }) {
    const [activeTab, setActiveTab] = useState("profile");

    
    const [showKycVerification, setShowKycVerification] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    const { enqueueSnackbar } = useSnackbar();

    const { data, isLoading, isError } = useGetMillDetailsQuery(millId);
    const [updateStatus, { isLoading: updating }] = useUpdateMillStatusMutation();

    if (isLoading) return <p className="p-6">Loading...</p>;
    if (isError || !data) return <p className="p-6 text-red-500">Failed to load mill data</p>;

    const { mill, users, kycDocs, products } = data;

    const handleToggleStatus = async () => {
        try {
            await updateStatus({
                millId: mill.millId,
                isActive: !mill.isActive,
            }).unwrap();

            enqueueSnackbar(
                `Mill ${!mill.isActive ? "activated" : "deactivated"} successfully`,
                { variant: "success" }
            );
        } catch (error) {
            enqueueSnackbar("Failed to update status", { variant: "error" });
        }
    };
    
    
    return (
        <div className="flex gap-6 bg-slate-50 p-6 min-h-screen">

            {/* LEFT SIDEBAR */}
            <div className="w-64 bg-white rounded-2xl shadow p-6 flex flex-col items-center">
                <div className="bg-blue-600 text-white w-14 h-14 flex items-center justify-center rounded-xl text-xl font-bold">
                    {mill.millName?.[0]}
                </div>

                <p className="mt-4 font-semibold text-lg">{mill.millName}</p>

                <div className="flex items-center gap-2 mt-4">
                    <span className="text-sm font-medium">Active Status:</span>
                    <div
                        onClick={handleToggleStatus}
                        className={`cursor-pointer w-10 h-5 rounded-full relative transition ${mill.isActive ? "bg-green-500" : "bg-gray-300"
                            }`}
                    >
                        <span
                            className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition ${mill.isActive ? "right-1" : "left-1"
                                }`}
                        />
                    </div>
                 
                </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="flex-1 space-y-6">
                <div className="bg-white rounded-2xl p-4 flex gap-3 shadow">
                    <Tab label="Mill Profile" icon="BoxIcon" active={activeTab === "profile"} onClick={() => setActiveTab("profile")} />
                    <Tab label="Users" icon="GroupIcon" active={activeTab === "users"} onClick={() => setActiveTab("users")} />
                    <Tab label="KYC Details" icon="FileIcon" active={activeTab === "kyc"} onClick={() => setActiveTab("kyc")} />
                    <Tab label="Products" icon="BoxCubeIcon" active={activeTab === "products"} onClick={() => setActiveTab("products")} />
                </div>

                {activeTab === "profile" && <ProfileTab mill={mill} />}
                {activeTab === "users" && <UsersTab users={users} />}
                {/* {activeTab === "kyc" && <KYCTab kycDocs={kycDocs} />} */}
                {activeTab === "kyc" && (
  <KYCTab
    kycDocs={kycDocs}
    showKycVerification={showKycVerification}
    selectedUserId={selectedUserId}
    onVerifyClick={(userId: number) => {
      setSelectedUserId(userId);
      setShowKycVerification(true);   // always open verification
    }}
    onBack={() => {
      setShowKycVerification(false);  // go back to table
      setSelectedUserId(null);
    }}
  />
)}


                {activeTab === "products" && <ProductsTab products={products} />}
            </div>
        </div>
    );
}
