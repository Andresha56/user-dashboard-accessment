import type { FC, ReactNode } from "react";
import "./textbox.scss";

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
        <div className="textbox-wrapper">
            <div className={`textbox-container ${errorMessage ? "error" : ""}`}>

                {fieldIcon && <span className="textbox-icon">{fieldIcon}</span>}

                <input
                    type="text"
                    value={value}
                    onKeyDown={onKeyDown}
                    onChange={onInputChange}
                    placeholder={placeholder}
                    className="textbox-input"
                />
            </div>

            {errorMessage && (
                <p className="textbox-error">{errorMessage}</p>
            )}
        </div>
    );
};