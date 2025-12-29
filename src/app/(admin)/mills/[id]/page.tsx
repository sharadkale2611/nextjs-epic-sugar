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

  return <MillProfileView />;
  
}
