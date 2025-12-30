"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import CustomInput from "@/components/atoms/CustomInput";
import LocationSelector from "@/components/molecules/LocationSelector";

import {
  useGetCityByIdQuery,
  useUpdateCityMutation,
} from "@/features/city";

import { enqueueSnackbar } from "notistack";

export default function EditCityPage() {
  const router = useRouter();
  const params = useParams();

  const cityId = parseInt(
    Array.isArray(params.id) ? params.id[0] : params.id || "0",
    10
  );

  const { data: city, isLoading } = useGetCityByIdQuery(cityId, {
    skip: !cityId,
  });

  const [updateCity] = useUpdateCityMutation();

  const [form, setForm] = useState({
    cityName: "",
    stateId: null as number | null,
    isActive: true,
  });

  const [formError, setFormError] = useState<string | null>(null);

  // Load API data into form
  useEffect(() => {
    if (city && !isLoading) {
      setForm({
        cityName: city.cityName,
        stateId: city.stateId ?? null,
        isActive: city.isActive,
      });
    }
  }, [city, isLoading]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setFormError(null);

    try {
      await updateCity({
        cityId,
        cityName: form.cityName,
        stateId: form.stateId ?? undefined,
        isActive: form.isActive,
      }).unwrap();

      enqueueSnackbar("City updated successfully", {
        variant: "success",
      });

      router.push("/setting/city");
    } catch {
      setFormError("Something went wrong while updating the city.");
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">

      <h1 className="text-2xl font-semibold mb-2">Edit City</h1>
      <p className="text-sm text-gray-500 mb-4">
        Modify city information
      </p>

      <div className="rounded-xl border bg-white shadow-sm">
        <div className="space-y-8 p-6">

          {formError && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-600">
              {formError}
            </div>
          )}

          {/* CITY DETAILS */}
          <section>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
              City Details
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

              {/* TEXTBOX — CITY NAME */}
              <CustomInput
                label="City Name"
                name="cityName"
                value={form.cityName}
                onChange={handleChange}
              />

              <LocationSelector
  stateId={form.stateId}
  cityId={null}

  onStateChange={(val) =>
    setForm(prev => ({
      ...prev,
      stateId: val ?? null,
    }))
  }

  onCityChange={() => {}}   // <- required placeholder

  showCity={false}          // <- hides city dropdown
/>
            </div>

            {/* ACTIVE TOGGLE */}
            <div className="mt-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) =>
                    setForm(prev => ({
                      ...prev,
                      isActive: e.target.checked,
                    }))
                  }
                />
                Active
              </label>
            </div>
          </section>

          {/* ACTIONS */}
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
              Save City
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
