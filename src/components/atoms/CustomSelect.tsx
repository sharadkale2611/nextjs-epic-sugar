export default function CustomSelect({ label, name, value, onChange, options }: any) {
    return (
        <div>
            <label className="font-medium">{label}</label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="mt-1 w-full rounded-lg border px-3 py-2"
            >
                <option value="">Select {label}</option>
                {options.map((opt: any) => (
                    <option key={opt.id} value={opt.id}>
                        {opt.name}
                    </option>
                ))}
            </select>
        </div>
    );
}