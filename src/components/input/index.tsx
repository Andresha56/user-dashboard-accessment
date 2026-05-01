import type {
    FC,
    InputHTMLAttributes,
} from "react";

interface InputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export const Input: FC<InputProps> = ({
    label,
    error,
    value,
    ...props
}) => {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
                {label}
            </label>

            <input
                {...props}
                value={value ?? ""}
                className={`
               h-11
               w-full
               rounded-xl
               border
               px-4
               text-sm
               outline-none
               transition-all
               focus:ring-2
               ${error
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:border-black focus:ring-gray-200"
                    }
            `}
            />

            {error && (
                <p className="text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
};
