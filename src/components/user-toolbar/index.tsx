import { useMemo, useState, type FC } from "react";

import { SORT_BY, SORT_ORDER, type User } from "@archetypes/user";

import { SearchBox } from "@components/search";
import { Dropdown } from "@components/dropdown";
import { Button } from "@components/button";

import { PlusIcon } from "@icons";

interface Props {
    users: User[];
    search: string;
    onSearch: (value: string) => void;
    roleFilter: string;
    onRoleFilter: (value: string) => void;
    genderFilter: string;
    onGenderFilter: (value: string) => void;
    sortBy: SORT_BY;
    onSortBy: (value: SORT_BY) => void;
    order: SORT_ORDER;
    onOrder: (value: SORT_ORDER) => void;
    onAddUser: () => void;
    clearFilters: () => void;
}

export const UsersToolbar: FC<Props> = ({
    users,
    search,
    onSearch,
    roleFilter,
    onRoleFilter,
    genderFilter,
    onGenderFilter,
    sortBy,
    onSortBy,
    order,
    onOrder,
    onAddUser,
    clearFilters,
}) => {
    const [showFilters, setShowFilters] = useState(false);

    const roleOptions = useMemo(
        () => [
            { label: "All Roles", value: "" },
            ...Array.from(new Set(users.map((u) => u.role))).map((role) => ({
                label: role,
                value: role,
            })),
        ],
        [users],
    );

    const genderOptions = useMemo(
        () => [
            { label: "All Genders", value: "" },
            ...Array.from(new Set(users.map((u) => u.gender))).map((gender) => ({
                label: gender,
                value: gender,
            })),
        ],
        [users],
    );

    return (
        <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur-md">
            <div className="px-4 py-4 lg:px-6">
                {/* Top Section */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    {/* Left */}
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Users Management
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage users, filters and sorting easily.
                        </p>
                    </div>

                    <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:items-center">
                        <div className="flex-1 lg:w-[320px]">
                            <SearchBox
                                placeholder="Search by name or email..."
                                value={search}
                                onSubmit={onSearch}
                            />
                        </div>

                        <div className="flex gap-3">
                            {/* Mobile Filter Toggle */}
                            <Button
                                onClick={() => setShowFilters((prev) => !prev)}
                                className="
                                    h-11 rounded-xl border border-slate-300
                                    px-4 text-sm font-medium text-slate-700
                                    hover:bg-slate-100 lg:hidden
                                "
                            >
                                {showFilters ? "Hide Filters" : "Filters"}
                            </Button>

                            <Button
                                onClick={onAddUser}
                                className="
                                    flex h-11 items-center gap-2 whitespace-nowrap
                                    rounded-xl bg-slate-900 px-4 transition-all
                                    hover:bg-slate-800
                                "
                            >
                                <PlusIcon color="#fff" />

                                <span className="text-sm font-medium text-white">
                                    Add User
                                </span>
                            </Button>

                            <Button
                                variant="secondary"
                                className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 hover:bg-slate-50"
                                onClick={clearFilters}
                            >
                                Clear Filters
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Filters Section */}
                <div
                    className={`
                        mt-6  rounded-3xl border border-slate-200
                        bg-white p-4 shadow-sm transition-all duration-300 sm:p-5
                        ${showFilters ? "block" : "hidden"}
                        lg:block
                    `}
                >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

                        {/* Left Filters */}
                        <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                            {/* Role */}
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Role
                                </label>

                                <Dropdown
                                    placeholder="Select role"
                                    options={roleOptions}
                                    value={roleFilter}
                                    onChange={onRoleFilter}
                                />
                            </div>

                            {/* Gender */}
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Gender
                                </label>

                                <Dropdown
                                    placeholder="Select gender"
                                    options={genderOptions}
                                    value={genderFilter}
                                    onChange={onGenderFilter}
                                />
                            </div>

                            {/* Sort By */}
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Sort By
                                </label>

                                <Dropdown
                                    placeholder="Sort by"
                                    options={[
                                        {
                                            label: "Name",
                                            value: SORT_BY.NAME,
                                        },
                                        {
                                            label: "Age",
                                            value: SORT_BY.AGE,
                                        },
                                    ]}
                                    value={sortBy}
                                    onChange={(value) =>
                                        onSortBy(value as SORT_BY)
                                    }
                                />
                            </div>

                            {/* Order */}
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Order
                                </label>

                                <Dropdown
                                    placeholder="Select order"
                                    options={[
                                        {
                                            label: "Ascending",
                                            value: SORT_ORDER.ASC,
                                        },
                                        {
                                            label: "Descending",
                                            value: SORT_ORDER.DESC,
                                        },
                                    ]}
                                    value={order}
                                    onChange={(value) =>
                                        onOrder(value as SORT_ORDER)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};