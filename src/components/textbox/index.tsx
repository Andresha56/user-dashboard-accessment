import type { FC, ReactNode } from "react";

interface TextboxProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    errorMessage?: string;
    fieldIcon?: ReactNode;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const Textbox: FC<TextboxProps> = ({
    value,
    onChange,
    placeholder = "Enter text...",
    errorMessage,
    fieldIcon,
    onKeyDown,
}) => {
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className="w-full">
            <div
                className={`
                    flex items-center rounded-md border bg-white px-3 py-2
                    ${errorMessage ? "border-red-600" : "border-slate-300"}
                `}
            >
                {fieldIcon && (
                    <span className="mr-2 flex items-center">{fieldIcon}</span>
                )}

                <input
                    type="text"
                    value={value}
                    onKeyDown={onKeyDown}
                    onChange={onInputChange}
                    placeholder={placeholder}
                    className="
                        w-full border-none bg-transparent text-sm
                        outline-none placeholder:text-slate-400
                    "
                />
            </div>

            {errorMessage && (
                <p className="mt-1 text-xs text-red-600">{errorMessage}</p>
            )}
        </div>
    );
};
