interface CustomSelectProps {
    label: string;
    name: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { id: number | string; name: string }[];
    disabled?: boolean;
}

export default function CustomSelect({
    label,
    name,
    value,
    onChange,
    options,
    disabled = false,
}: CustomSelectProps) {
    return (
        <div>
            <label className="font-medium text-gray-700">{label}</label>

            <select
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`mt-1 w-full rounded-lg border px-3 py-2 
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
        `}
            >
                <option value="">
                    Select {label}
                </option>

                {options.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                        {opt.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
