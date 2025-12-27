"use client";

import { useState } from "react";
import Icon from "@/components/atoms/Icon";

export default function MillProfileView() {
    const [activeTab, setActiveTab] = useState("profile");

    return (
        <div className="flex gap-6 bg-slate-50 p-6 min-h-screen">

            {/* LEFT SIDEBAR */}
            <div className="w-64 bg-white rounded-2xl shadow p-6 flex flex-col items-center">
                <div className="bg-blue-600 text-white w-14 h-14 flex items-center justify-center rounded-xl text-xl font-bold">
                    BBB
                </div>

                <p className="mt-4 font-semibold text-lg">BBB</p>

                <div className="flex items-center gap-2 mt-4">
                    <span className="text-sm font-medium">Active Status:</span>
                    <span className="w-10 h-5 bg-blue-500 rounded-full relative">
                        <span className="absolute right-1 top-0.5 w-4 h-4 bg-white rounded-full"></span>
                    </span>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 space-y-6">

                {/* Tabs */}
                <div className="bg-white rounded-2xl p-4 flex gap-3 shadow">
                    <Tab label="Mill Profile" icon="BoxIcon" active={activeTab === "profile"} onClick={() => setActiveTab("profile")} />
                    <Tab label="Users" icon="GroupIcon" active={activeTab === "users"} onClick={() => setActiveTab("users")} />
                    <Tab label="KYC Details" icon="FileIcon" active={activeTab === "kyc"} onClick={() => setActiveTab("kyc")} />
                    <Tab label="Product Details" icon="BoxCubeIcon" active={activeTab === "products"} onClick={() => setActiveTab("products")} />
                </div>

                {/* TAB CONTENT */}
                {activeTab === "profile" && <ProfileTab />}
                {activeTab === "users" && <UsersTab />}
                {activeTab === "kyc" && <KYCTab />}
                {activeTab === "products" && <ProductsTab />}
            </div>
        </div>
    );
}

/* ------------------ TABS ------------------ */

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

/* ------------------ TAB CONTENT ------------------ */

const ProfileTab = () => (
    <>
        <Section title="Mill Information" icon="BoxIcon">
            <InfoCard label="Mill Name" value="BBB" />
            <InfoCard label="Mill Code" value="B" />
            <InfoCard label="GST Number" value="F.2, P.12, G.160" />
        </Section>

        <Section title="Contact Information" icon="UserIcon">
            <InfoRow label="Contact Number" value="9673297636" />
            <InfoRow label="Contact Person" value="Sharad Kaduba Kale" />
            <InfoRow label="Email" value="srdkale.kale@gmail.com" />
        </Section>

        <Section title="Address Details" icon="LocationIcon">
            <InfoRow label="Address" value="F.2, P.12, G.160" />
            <InfoRow label="State" value="Maharashtra" />
            <InfoRow label="City" value="Beed" />
            <InfoRow label="Pincode" value="431010" />
        </Section>
    </>
);

const UsersTab = () => (
    <Section title="Users List" icon="GroupIcon">
        <InfoRow label="Admin" value="Sharad Kale" />
        <InfoRow label="Manager" value="Rahul Patil" />
    </Section>
);

const KYCTab = () => (
    <Section title="KYC Documents" icon="FileIcon">
        <InfoRow label="GST Certificate" value="Uploaded" />
        <InfoRow label="PAN Card" value="Uploaded" />
    </Section>
);

const ProductsTab = () => (
    <Section title="Products" icon="BoxCubeIcon">
        <InfoRow label="Product 1" value="Sugar" />
        <InfoRow label="Product 2" value="Molasses" />
    </Section>
);

/* ------------------ SHARED COMPONENTS ------------------ */

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
        <p className="font-semibold">{value}</p>
    </div>
);

const InfoRow = ({ label, value }: any) => (
    <div className="flex flex-col">
        <span className="text-sm text-gray-500">{label}</span>
        <span className="font-medium">{value}</span>
    </div>
);
