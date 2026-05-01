import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import { Toast } from "@components/toast";

interface ToastProviderProps {
    children: ReactNode;
}

interface ToastContextType {
    showToast: (toast: ToastType) => void;
}

export interface ToastType {
    title: string;
    content: ReactNode;
    duration?: number;
    id?: string;
    variant: "success" | "danger";
}

const ToastContext = createContext<ToastContextType | undefined>(
    undefined,
);

const ToastProvider: React.FC<ToastProviderProps> = ({
    children,
}) => {
    const [toasts, setToasts] = useState<ToastType[]>([]);

    const showToast = useCallback((newToast: ToastType) => {
        setToasts((prevToasts) => [
            ...prevToasts,
            {
                ...newToast,
                id: newToast.id || crypto.randomUUID(),
            },
        ]);
    }, []);

    const destroyToast = useCallback((toastId: string) => {
        setToasts((prevToasts) =>
            prevToasts.filter((toast) => toast.id !== toastId),
        );
    }, []);

    const contextValue = useMemo(
        () => ({
            showToast,
        }),
        [showToast],
    );

    return (
        <ToastContext.Provider value={contextValue}>
            {children}

            <div
                className="
                    pointer-events-none fixed right-4 top-4 z-9999
                    flex w-full max-w-sm flex-col gap-3
                "
            >
                {toasts.map(
                    ({
                        id,
                        title,
                        content,
                        duration,
                        variant,
                    }) => (
                        <div key={id} className="pointer-events-auto">
                            <Toast
                                id={id as string}
                                title={title}
                                content={content}
                                duration={duration}
                                variant={variant}
                                destroy={destroyToast}
                            />
                        </div>
                    ),
                )}
            </div>
        </ToastContext.Provider>
    );
};

const useToastContext = (): ToastContextType => {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error(
            "useToastContext must be used within a ToastProvider",
        );
    }

    return context;
};

export { useToastContext, ToastProvider };