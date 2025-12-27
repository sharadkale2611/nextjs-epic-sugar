"use client";

import {
    useGetStatesQuery,
    useGetCitiesQuery,
} from "@/features/location/locationApi";
import { skipToken } from "@reduxjs/toolkit/query";
import CustomSelect from "@/components/atoms/CustomSelect";

/* -------------------------------- TYPES -------------------------------- */

type GridSpan = {
    base?: 12 | 6 | 4 | 3;
    md?: 12 | 6 | 4 | 3;
    lg?: 12 | 6 | 4 | 3;
};

interface LocationSelectorProps {
    stateId: number | null;
    cityId: number | null;
    onStateChange: (value: number) => void;
    onCityChange: (value: number) => void;
    stateCol?: GridSpan;
    cityCol?: GridSpan;
}

/* -------------------------- GRID CLASS BUILDER -------------------------- */

const buildGridClass = (span?: GridSpan) => {
    if (!span) return "col-span-12";

    return [
        span.base && `col-span-${span.base}`,
        span.md && `md:col-span-${span.md}`,
        span.lg && `lg:col-span-${span.lg}`,
    ]
        .filter(Boolean)
        .join(" ");
};

/* -------------------------- COMPONENT -------------------------- */

export default function LocationSelector({
    stateId,
    cityId,
    onStateChange,
    onCityChange,
    stateCol = { base: 12 },
    cityCol = { base: 12 },
}: LocationSelectorProps) {
    const { data: states } = useGetStatesQuery();

    const { data: cities } = useGetCitiesQuery(
        stateId ?? skipToken
    );

    return (
        <div className="grid grid-cols-12 gap-4">
            {/* STATE */}
            <div className={buildGridClass(stateCol)}>
                <CustomSelect
                    label="State"
                    name="state"
                    value={stateId ?? ""}
                    onChange={(e) => onStateChange(Number(e.target.value))}
                    options={
                        states?.map((s: any) => ({
                            id: s.stateId,
                            name: s.stateName,
                        })) || []
                    }
                />
            </div>

            {/* CITY */}
            <div className={buildGridClass(cityCol)}>
                <CustomSelect
                    label="City"
                    name="city"
                    value={cityId ?? ""}
                    disabled={!stateId}
                    onChange={(e) => onCityChange(Number(e.target.value))}
                    options={
                        cities?.map((c: any) => ({
                            id: c.cityId,
                            name: c.cityName,
                        })) || []
                    }
                />
            </div>
        </div>
    );
}
