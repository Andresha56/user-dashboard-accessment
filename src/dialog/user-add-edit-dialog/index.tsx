import type { User } from "@archetypes/user";
import { UserForm } from "@components/form";
import { Modal } from "@components/form-model"
import type { FC } from "react";
interface UserAddEditDialogProps {
    isOpen: boolean;
    onClose: () => void;
    handleSubmit: (data: User) => Promise<void>;
    title: string;
    defaultValues?: Partial<User>;
}

export const UserAddEditDialog: FC<UserAddEditDialogProps> = ({
    isOpen,
    onClose,
    handleSubmit,
    title,
    defaultValues,
}) => {
    return (
        <Modal title={title} isOpen={isOpen} onClose={onClose}>
            <UserForm
                defaultValues={defaultValues}
                onCancel={onClose}
                onSubmit={handleSubmit}
            />
        </Modal>
    );
}