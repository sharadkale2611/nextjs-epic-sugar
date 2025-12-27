"use client";

import { useState } from "react";
import {
    useGetStatesQuery,
    useGetCitiesQuery,
} from "@/features/location/locationApi";

export default function LocationSelector() {
    const [stateId, setStateId] = useState<number | null>(null);

    const { data: states, isLoading } = useGetStatesQuery();
    const { data: cities, isLoading: cityLoading } =
        useGetCitiesQuery(stateId!, {
            skip: !stateId,
        });

    return (
        <div className="space-y-4">
            {/* STATE */}
            <select
                className="border p-2 rounded w-full"
                onChange={(e) => setStateId(Number(e.target.value))}
            >
                <option value="">Select State</option>
                {states?.map((state) => (
                    <option key={state.stateId} value={state.stateId}>
                        {state.stateName}
                    </option>
                ))}
            </select>

            {/* CITY */}
            <select
                className="border p-2 rounded w-full"
                disabled={!stateId}
            >
                <option value="">Select City</option>
                {cities?.map((city) => (
                    <option key={city.cityId} value={city.cityId}>
                        {city.cityName}
                    </option>
                ))}
            </select>
        </div>
    );
}
