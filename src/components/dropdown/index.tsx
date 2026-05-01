import { memo, useEffect, useRef, useState, type FC } from "react";

interface Option {
    label: string;
    value: string;
}

interface DropdownProps {
    label?: string;
    options: Option[];
    value?: string;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    onChange?: (value: string) => void;
}


const triggerBase =
    "flex h-12 w-full items-center justify-between rounded-xl border bg-white px-4 text-sm outline-none transition-all duration-200";

const triggerVariant = {
    normal: "border-gray-300 hover:border-gray-400 focus:border-black focus:ring-2 focus:ring-gray-200",
    error: "border-red-500 focus:ring-2 focus:ring-red-200",
    disabled: "cursor-not-allowed bg-gray-100 opacity-60",
};

const optionBase =
    "flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm transition-colors duration-150";

const optionVariant = {
    selected: "bg-black text-white",
    default: "text-gray-700 hover:bg-gray-100",
};


const DropdownComponent: FC<DropdownProps> = ({
    label,
    options,
    value,
    placeholder = "Select option",
    error,
    disabled,
    onChange,
}) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const selected = options.find((o) => o.value === value);

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (!ref.current?.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () =>
            document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    return (
        <div ref={ref} className="relative flex flex-col gap-2">
            {label && (
                <label className="text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}

            <button
                type="button"
                disabled={disabled}
                onClick={() => setOpen((prev) => !prev)}
                className={[
                    triggerBase,
                    error ? triggerVariant.error : triggerVariant.normal,
                    disabled ? triggerVariant.disabled : "",
                ].join(" ")}
            >
                <span
                    className={`truncate ${selected ? "text-gray-900" : "text-gray-400"}`}
                >
                    {selected?.label ?? placeholder}
                </span>
                <span
                    className={`text-xs transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                >
                    ▼
                </span>
            </button>

            {open && (
                <div className="absolute top-[calc(100%+8px)] z-50 max-h-60 w-full overflow-y-auto rounded-xl border border-gray-200 bg-white p-2 shadow-xl">
                    {options.length > 0 ? (
                        options.map((option) => {
                            const isSelected = value === option.value;
                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => {
                                        onChange?.(option.value);
                                        setOpen(false);
                                    }}
                                    className={`${optionBase} ${isSelected ? optionVariant.selected : optionVariant.default}`}
                                >
                                    {option.label}
                                </button>
                            );
                        })
                    ) : (
                        <div className="px-3 py-2 text-sm text-gray-400">
                            No options available
                        </div>
                    )}
                </div>
            )}

            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
};

export const Dropdown = memo(DropdownComponent);
