"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { selectAuthUser } from "@/features/auth/authSelectors";
import { logout } from "@/lib/auth";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector(selectAuthUser);
  const router = useRouter();

  const toggleDropdown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    router.replace("/signin");
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-700 dark:text-gray-400"
      >
        <span className="mr-3 flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-gray-200 text-sm font-semibold text-gray-700">
          {user?.username?.[0]?.toUpperCase() || "U"}
        </span>

        <span className="mr-1 font-medium text-theme-sm">
          {user?.username || "User"}
        </span>

        <svg
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""
            }`}
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
        >
          <path
            d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="absolute right-0 mt-[17px] w-[260px] rounded-2xl border bg-white p-3 shadow-lg"
      >
        {/* USER INFO */}
        <div>
          <span className="block font-medium text-gray-700">
            {user?.username}
          </span>
          <span className="block text-sm text-gray-500">
            {user?.email}
          </span>
        </div>

        {/* MENU */}
        <ul className="mt-3 border-t pt-3">
          <li>
            <DropdownItem
              href="/profile"
              onItemClick={() => setIsOpen(false)}
            >
              Profile
            </DropdownItem>
          </li>

          <li>
            <DropdownItem
              href="/settings"
              onItemClick={() => setIsOpen(false)}
            >
              Settings
            </DropdownItem>
          </li>
        </ul>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="mt-3 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          Logout
        </button>
      </Dropdown>
    </div>
  );
}
