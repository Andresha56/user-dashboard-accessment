import { Button } from "@components/button";
import React, {
    memo,
    useCallback,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import {
    CheckFillIcon,
    CloseIcon,
    RemoveFillIcon,
} from "@icons";

import {
    DEFAULT_TOAST_DELAY,
    DEFAULT_TOAST_VISIBILITY_DURATION,
} from "@constant";

export interface ToastProps {
    id: string;
    destroy: (id: string) => void;
    title: string;
    content: ReactNode;
    duration?: number;
    variant: "danger" | "success";
}

const ToastComponent: React.FC<ToastProps> = ({
    destroy,
    content,
    title,
    duration,
    id,
    variant,
}) => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(true);

        const timer = setTimeout(() => {
            setActive(false);

            setTimeout(() => {
                destroy(id);
            }, DEFAULT_TOAST_DELAY);
        }, duration ?? DEFAULT_TOAST_VISIBILITY_DURATION);

        return () => clearTimeout(timer);
    }, [destroy, duration, id]);

    const closeToast = useCallback(() => {
        setActive(false);

        setTimeout(() => {
            destroy(id);
        }, DEFAULT_TOAST_DELAY);
    }, [destroy, id]);

    const isSuccess = variant === "success";

    return (
        <div
            className={`
                relative w-full overflow-hidden rounded-2xl border bg-white p-4 shadow-lg
                transition-all duration-300
                ${active ? "translate-x-0 opacity-100" : "translate-x-5 opacity-0"}
                ${isSuccess
                    ? "border-emerald-200"
                    : "border-red-200"
                }
            `}
        >
            <div className="flex items-start gap-3">
                <div
                    className={`
                        mt-0.5 flex h-10 w-10 items-center justify-center rounded-full
                        ${isSuccess
                            ? "bg-emerald-100"
                            : "bg-red-100"
                        }
                    `}
                >
                    {isSuccess ? (
                        <CheckFillIcon size="22" color="#0c8c43" />
                    ) : (
                        <RemoveFillIcon size="22" color="#e53332" />
                    )}
                </div>

                <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-900">
                        {title}
                    </h3>

                    <div className="mt-1 text-sm leading-5 text-gray-600">
                        {content}
                    </div>
                </div>

                <Button
                    onClick={closeToast}
                    variant="secondary"
                    className="
                        flex h-8 w-8 items-center justify-center rounded-lg
                        transition-colors hover:bg-gray-100
                    "
                >
                    <CloseIcon size={12} />
                </Button>
            </div>
        </div>
    );
};

export const Toast = memo(ToastComponent);