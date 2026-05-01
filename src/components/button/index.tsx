import {
    forwardRef,
    memo,
    type ReactNode,
    type ButtonHTMLAttributes,
} from "react";

type Variant = "primary" | "secondary" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: Variant;
    loading?: boolean;
}


const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"; ;

const variants: Record<Variant, string> = {
    primary: "bg-slate-900 text-white hover:bg-slate-700",
    secondary:
        "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
    danger: "bg-red-500 text-white hover:bg-red-600",
};


const ButtonComponent = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        { children, variant = "primary", className = "", loading, ...props },
        ref
    ) => (
        <button
            ref={ref}
            className={`${base} ${variants[variant]} ${className}`}
            disabled={loading || props.disabled}
            {...props}
        >
            {loading ? (
                <span className="flex items-center gap-2">
                    <svg
                        className="h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                    </svg>
                    Loading...
                </span>
            ) : (
                children
            )}
        </button>
    )
);

ButtonComponent.displayName = "Button";

export const Button = memo(ButtonComponent);
