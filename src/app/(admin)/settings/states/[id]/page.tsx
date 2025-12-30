"use client";

import { useParams } from "next/navigation";
import StateProfileView from "./StateProfleView";

export default function StateDetailsPage() {
    const params = useParams();
    const stateId = Number(params.id);

    return <StateProfileView stateId={stateId} />;
}
