"use client";

import { useParams } from "next/navigation";
import { useGetMillByIdQuery, useUpdateMillStatusMutation } from "@/features/mill/millApi";
import { enqueueSnackbar } from "notistack";
import Button from "@/components/atoms/Button";
import MillProfileView from "./MillProfileView";

export default function MillDetailsPage() {
  const params = useParams();
  const millId = Number(params.id);

  const { data, isLoading, isError } = useGetMillByIdQuery(millId);
  const [updateStatus, { isLoading: updating }] = useUpdateMillStatusMutation();

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError || !data) return <p className="p-6 text-red-500">Failed to load mill</p>;

  const handleToggleStatus = async () => {
    try {
      await updateStatus({
        millId: data.millId,
        isActive: !data.isActive,
      }).unwrap();

      enqueueSnackbar(
        `Mill ${!data.isActive ? "activated" : "deactivated"} successfully`,
        { variant: "success" }
      );
    } catch {
      enqueueSnackbar("Failed to update status", { variant: "error" });
    }
  };

  return (
    
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <MillProfileView />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{data.millName}</h1>

        <Button
          variant={data.isActive ? "danger" : "primary"}
          onClick={handleToggleStatus}
          isLoading={updating}
        >
          {data.isActive ? "Deactivate" : "Activate"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded shadow">
        <Info label="Mill Code" value={data.millCode} />
        <Info label="City" value={data.cityName} />
        <Info label="State" value={data.stateName} />
        <Info label="Contact" value={data.contactNumber} />
        <Info label="Email" value={data.email} />
        <Info label="GST" value={data.gstNumber} />
        <Info label="Status" value={data.isActive ? "Active" : "Inactive"} />
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  );
}
