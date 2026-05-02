import { Button } from "@components/button";
import { CloseIcon } from "@icons";
import type { FC, ReactNode } from "react";

interface ModalProps {
    isOpen: boolean;
    title: string;
    children: ReactNode;
    onClose: () => void;
}
export const Modal: FC<ModalProps> = ({
    isOpen,
    title,
    children,
    onClose,
}) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div
            onClick={onClose}
            className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/60
            p-4
            backdrop-blur-sm
         "
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="
               w-full
               max-w-5xl
               rounded-2xl
               bg-white
               shadow-2xl
               max-h-[90vh]
               overflow-y-auto
            "
            >
                <div
                    className="
                  sticky top-0 z-10
                  flex items-center justify-between
                  border-b
                  bg-white
                  px-6 py-4
               "
                >
                    <h2 className="text-2xl font-semibold text-gray-900">
                        {title}
                    </h2>

                    <Button
                        variant="secondary"
                        className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-gray-100"
                        onClick={onClose}
                    >
                        <CloseIcon size={12} />
                    </Button>
                </div>

                <div className="p-6">{children}</div>
            </div>
        </div>
    );
};