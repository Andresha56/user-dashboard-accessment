import { useState, type FC, useEffect, memo } from "react";
import { Button } from "@components/button";
import { Textbox } from "@components/textbox";
import { CloseIcon, SearchIcon } from "@icons";

interface SearchBoxProps {
    className?: string;
    placeholder?: string;
    onSubmit?: (value: string) => void;
    value?: string;
}

const SearchBoxComponent: FC<SearchBoxProps> = ({
    className = "",
    value = "",
    onSubmit,
    placeholder = "Search...",
}) => {
    const [internalValue, setInternalValue] = useState(value);

    useEffect(() => {
        setInternalValue(value);
    }, [value]);

    const handleChange = (newValue: string) => {
        setInternalValue(newValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSubmit?.(internalValue);
        }
    };

    const handleClear = () => {
        setInternalValue("");
        onSubmit?.("");
    };

    return (
        <div className={`relative w-full ${className}`}>
            <Textbox
                value={internalValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                fieldIcon={<SearchIcon />}
            />

            {internalValue && (
                <Button
                    variant="secondary"
                    className="
                        absolute right-2 top-1/2 -translate-y-1/2
                        rounded-md border-0 bg-transparent p-2
                        shadow-none hover:bg-slate-100
                    "
                    onClick={handleClear}
                >
                    <CloseIcon size={12} color="black" />
                </Button>
            )}
        </div>
    );
};

export const SearchBox = memo(SearchBoxComponent);
