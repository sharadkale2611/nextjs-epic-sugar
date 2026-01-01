"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ChangePasswordPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect if someone opens URL directly
    router.replace("/settings/profile");
  }, [router]);

  return null;
}
