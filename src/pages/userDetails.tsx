import { useEffect, useState, type FC } from "react";
import { useNavigate, useParams } from "react-router-dom";

import type { User } from "@archetypes/user";

import { Button } from "@components/button";

import { getUserById } from "@queries";
import { useToastContext } from "@context/toast";

export const UserDetails: FC = () => {
    const { id } = useParams<{ id: string }>();

    const navigate = useNavigate();
   const { showToast } = useToastContext();

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const loadUser = async () => {
            try {
                setLoading(true);
                setError(false);

                if (!id) {
                    setError(true);
                    return;
                }

                const response = await getUserById(id);

                setUser(response);
            } catch {
                setError(true);
                showToast({
                    content: "Failed to load user details",
                    title: "Error",
                    variant: "danger",
                })
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, [id]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-4 py-10">
                <div className="rounded-2xl border border-slate-200 bg-white px-8 py-6 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">
                        Loading user details...
                    </p>
                </div>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-4 py-10">
                <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-900">
                        Something went wrong
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                        {error || "User not found"}
                    </p>

                    <Button
                        className="mt-6 w-full"
                        onClick={() => navigate("/")}
                        variant="primary"
                    >
                        Back to Users
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            {/* Header */}
            <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
                <div className="mx-auto flex h-auto w-full max-w-6xl flex-col gap-4 px-4 py-5 sm:h-20 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            User Details
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            View user information
                        </p>
                    </div>

                    <Button
                        variant="secondary"
                        onClick={() => navigate("/")}
                    >
                        Back
                    </Button>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                {/* Profile Card */}
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                        {/* Left */}
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                            <img
                                src={user.image}
                                alt={`${user.firstName} ${user.lastName}`}
                                className="h-24 w-24 rounded-2xl object-cover shadow-md sm:h-28 sm:w-28"
                            />

                            <div>
                                <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                                    {user.firstName} {user.lastName}
                                </h2>

                                <p className="mt-2 text-sm text-slate-500">
                                    {user.email}
                                </p>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    <Badge label={user.role} />

                                    <Badge label={user.gender} />
                                </div>
                            </div>
                        </div>

                        {/* Right Stats */}
                        <div className="grid grid-cols-2 gap-4 sm:gap-6">
                            <Stat
                                label="Age"
                                value={String(user.age)}
                            />

                            <Stat
                                label="Country"
                                value={user.address?.country || "-"}
                            />
                        </div>
                    </div>
                </section>

                {/* Sections */}
                <div className="mt-8 space-y-8">
                    <Section title="Basic Information">
                        <InfoItem
                            label="Full Name"
                            value={`${user.firstName} ${user.lastName}`}
                        />

                        <InfoItem
                            label="Email"
                            value={user.email}
                        />

                        <InfoItem
                            label="Phone"
                            value={user.phone}
                        />

                        <InfoItem
                            label="Age"
                            value={String(user.age)}
                        />

                        <InfoItem
                            label="Gender"
                            value={user.gender}
                        />

                        <InfoItem
                            label="Role"
                            value={user.role}
                        />
                    </Section>

                    <Section title="Address Information">
                        <InfoItem
                            label="Address Line"
                            value={user.address?.address}
                            fullWidth
                        />

                        <InfoItem
                            label="City"
                            value={user.address?.city}
                        />

                        <InfoItem
                            label="State"
                            value={user.address?.state}
                        />

                        <InfoItem
                            label="Country"
                            value={user.address?.country}
                        />
                    </Section>

                    <Section title="Company Information">
                        <InfoItem
                            label="Company Name"
                            value={user.company?.name}
                            fullWidth
                        />

                        <InfoItem
                            label="Department"
                            value={user.company?.department}
                        />

                        <InfoItem
                            label="Title"
                            value={user.company?.title}
                        />
                    </Section>

                    <Section title="Additional Information">
                        <InfoItem
                            label="Birth Date"
                            value={
                                user.birthDate
                                    ? new Date(
                                        user.birthDate,
                                    ).toLocaleDateString()
                                    : "-"
                            }
                        />

                        <InfoItem
                            label="University"
                            value={user.university || "-"}
                        />
                    </Section>
                </div>
            </main>
        </div>
    );
};

interface SectionProps {
    title: string;
    children: React.ReactNode;
}

const Section: FC<SectionProps> = ({
    title,
    children,
}) => {
    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">
                    {title}
                </h3>

                <div className="mt-3 h-px w-full bg-slate-100" />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
                {children}
            </div>
        </section>
    );
};

interface InfoItemProps {
    label: string;
    value?: string;
    fullWidth?: boolean;
}

const InfoItem: FC<InfoItemProps> = ({
    label,
    value,
    fullWidth,
}) => {
    return (
        <div
            className={`rounded-2xl border border-slate-100 bg-slate-50 p-8 ${fullWidth ? "sm:col-span-2" : ""
                }`}
        >
            <p className="text-sm font-medium text-slate-500">
                {label}
            </p>

            <p className="mt-2 wrap-break-word text-sm font-semibold leading-6 text-slate-900 sm:text-base">
                {value || "-"}
            </p>
        </div>
    );
};

interface BadgeProps {
    label?: string;
}

const Badge: FC<BadgeProps> = ({ label }) => {
    return (
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold capitalize text-blue-700">
            {label}
        </span>
    );
};

interface StatProps {
    label: string;
    value: string;
}

const Stat: FC<StatProps> = ({
    label,
    value,
}) => {
    return (
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                {label}
            </p>

            <p className="mt-2 text-lg font-bold text-slate-900">
                {value}
            </p>
        </div>
    );
};