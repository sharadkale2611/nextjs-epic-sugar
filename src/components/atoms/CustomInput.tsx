import React from "react";

interface CustomInputProps {
    label: string;
    name: string;
    value: string;
    type?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    error?: string;
}

export default function CustomInput({
    label,
    name,
    value,
    onChange,
    type = "text",
    placeholder,
    error,
}: CustomInputProps) {
    return (
        <div className="space-y-1">
            <label className="font-medium text-gray-700">
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className={`w-full rounded-lg border px-3 py-2 focus:ring-2 outline-none
          ${error ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-500"}
        `}
            />

            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}
        </div>
    );
}
