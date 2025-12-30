"use client";

import { useState } from "react";
import Icon from "@/components/atoms/Icon";
import {
    useGetStateByIdQuery,
    useUpdateStateStatusMutation,
} from "@/features/states/stateApi";
import { useSnackbar } from "notistack";

/* =======================
   SMALL REUSABLE COMPONENTS
======================= */

const Tab = ({ label, icon, active, onClick }: any) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition
        ${active
                ? "bg-blue-500 text-white shadow"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
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

/* =======================
   TABS
======================= */

const ProfileTab = ({ state }: any) => (
    <>
        <Section title="State Information" icon="LocationIcon">
            <InfoCard label="State Name" value={state.stateName} />
            <InfoCard label="State Code" value={state.stateCode} />
            <InfoCard label="Country" value={state.country} />
        </Section>

        <Section title="Meta Information" icon="InfoIcon">
            <InfoRow label="Created At" value={new Date(state.createdAt).toLocaleDateString()} />
            <InfoRow label="Updated At" value={new Date(state.updatedAt).toLocaleDateString()} />
            <InfoRow label="Status" value={state.isActive ? "Active" : "Inactive"} />
        </Section>
    </>
);

/* =======================
   MAIN PAGE
======================= */

export default function StateProfileView({ stateId }: { stateId: number }) {
    const [activeTab, setActiveTab] = useState("profile");
    const { enqueueSnackbar } = useSnackbar();

    const { data: state, isLoading, isError } = useGetStateByIdQuery(stateId);
    const [updateStatus] = useUpdateStateStatusMutation();

    if (isLoading) return <p className="p-6">Loading...</p>;
    if (isError || !state)
        return <p className="p-6 text-red-500">Failed to load state data</p>;

    const handleToggleStatus = async () => {
        try {
            await updateStatus({
                stateId: state.stateId,
                isActive: !state.isActive,
            }).unwrap();

            enqueueSnackbar(
                `State ${!state.isActive ? "activated" : "deactivated"} successfully`,
                { variant: "success" }
            );
        } catch {
            enqueueSnackbar("Failed to update status", { variant: "error" });
        }
    };

    return (
        <div className="flex gap-6 bg-slate-50 p-6 min-h-screen">

            {/* LEFT SIDEBAR */}
            <div className="w-64 bg-white rounded-2xl shadow p-6 flex flex-col items-center">
                <div className="bg-blue-600 text-white w-14 h-14 flex items-center justify-center rounded-xl text-xl font-bold">
                    {state.stateName?.[0]}
                </div>

                <p className="mt-4 font-semibold text-lg">{state.stateName}</p>

                <div className="flex items-center gap-2 mt-4">
                    <span className="text-sm font-medium">Active Status:</span>
                    <div
                        onClick={handleToggleStatus}
                        className={`cursor-pointer w-10 h-5 rounded-full relative transition
                        ${state.isActive ? "bg-green-500" : "bg-gray-300"}`}
                    >
                        <span
                            className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition
                            ${state.isActive ? "right-1" : "left-1"}`}
                        />
                    </div>
                </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="flex-1 space-y-6">
                <div className="bg-white rounded-2xl p-4 flex gap-3 shadow">
                    <Tab
                        label="State Profile"
                        icon="LocationIcon"
                        active={activeTab === "profile"}
                        onClick={() => setActiveTab("profile")}
                    />
                </div>

                {activeTab === "profile" && <ProfileTab state={state} />}
            </div>
        </div>
    );
}
