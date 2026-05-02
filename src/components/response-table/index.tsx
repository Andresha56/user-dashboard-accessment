import { type FC } from "react";

import { type User } from "@archetypes/user";
import { UserIcon } from "@icons";

interface UserTableProps {
    users: User[];
    currentPage: number;
    pageSize: number;
    onView: (id: number) => void;
    onEdit: (user: User) => void;
    onDelete: (id: number) => void;
}

const roleColors: Record<string, string> = {
    admin: "bg-violet-50 text-violet-700 ring-violet-200",
    moderator: "bg-sky-50 text-sky-700 ring-sky-200",
    user: "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

const avatarColors = [
    "bg-violet-100 text-violet-700",
    "bg-sky-100 text-sky-700",
    "bg-emerald-100 text-emerald-700",
    "bg-amber-100 text-amber-700",
    "bg-rose-100 text-rose-700",
];

const thClass =
    "px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap ";

const tdClass = "px-6 py-4 whitespace-nowrap text-sm text-slate-600";

const actionBtn = {
    base: "rounded-lg px-3 py-1.5 text-xs font-medium ring-1 ring-inset transition-colors",
    view: "text-slate-600 ring-slate-200 hover:bg-slate-50 cursor-pointer",
    edit: "text-indigo-600 ring-indigo-200 hover:bg-indigo-50 cursor-pointer",
    delete: "text-red-600 ring-red-200 hover:bg-red-50 cursor-pointer",
};

const getInitials = (first: string, last: string) =>
    `${first?.[0] ?? ""}${last?.[0] ?? ""}`.toUpperCase();

export const UserTable: FC<UserTableProps> = ({
    users,
    currentPage,
    pageSize,
    onView,
    onEdit,
    onDelete,
}) => {
    if (users.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white py-24 text-center shadow-sm">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                    <UserIcon/>
                </div>

                <p className="font-semibold text-slate-700">No users found</p>

                <p className="mt-1 text-sm text-slate-400">
                    Try adjusting your search or filters
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="bg-slate-50">
                        <tr className="border-b border-slate-100">
                            {[
                                "#",
                                "User",
                                "Email",
                                "Age",
                                "Phone",
                                "Company",
                                "Role",
                                "Actions",
                            ].map((col) => (
                                <th key={col} className={thClass}>
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {users.map((user, i) => {
                            const serialNumber =
                                (currentPage - 1) * pageSize + i + 1;
                            return (
                                <tr
                                    key={user.id}
                                    className="transition-colors hover:bg-slate-50/70"
                                >
                                    {/* Serial Number */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-500">
                                        {serialNumber}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            {user.image ? (
                                                <img
                                                    src={user.image}
                                                    alt={`${user.firstName} ${user.lastName}`}
                                                    className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-white shadow-sm"
                                                    onError={(e) => {
                                                        (
                                                            e.target as HTMLImageElement
                                                        ).style.display =
                                                            "none";
                                                    }}
                                                />
                                            ) : (
                                                <div
                                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                                                        avatarColors[
                                                            i %
                                                                avatarColors.length
                                                        ]
                                                    }`}
                                                >
                                                    {getInitials(
                                                        user.firstName,
                                                        user.lastName
                                                    )}
                                                </div>
                                            )}

                                            <div>
                                                <p className="font-semibold text-slate-800">
                                                    {user.firstName}{" "}
                                                    {user.lastName}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className={tdClass}>{user.email}</td>

                                    <td className={tdClass}>{user.age}</td>

                                    <td className={tdClass}>{user.phone}</td>

                                    <td className={tdClass}>
                                        {user.company?.name ?? "—"}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize ring-1 ring-inset ${
                                                roleColors[
                                                    user.role?.toLowerCase()
                                                ] ??
                                                "bg-slate-50 text-slate-600 ring-slate-200"
                                            }`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() =>
                                                    onView(user.id as number)
                                                }
                                                className={`${actionBtn.base} ${actionBtn.view}`}
                                            >
                                                View
                                            </button>

                                            <button
                                                onClick={() => onEdit(user)}
                                                className={`${actionBtn.base} ${actionBtn.edit}`}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    onDelete(user.id as number)
                                                }
                                                className={`${actionBtn.base} ${actionBtn.delete}`}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
