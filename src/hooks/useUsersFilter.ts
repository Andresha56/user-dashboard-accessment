import type { User } from "@archetypes/user";
import { useMemo } from "react";

type Params = {
    users: User[];
    search: string;
    roleFilter: string;
    genderFilter: string;
};

export const useUsersFilter = ({
    users,
    search,
    roleFilter,
    genderFilter,
}: Params) => {
    return useMemo(() => {
        let filtered = [...users];

        //  SEARCH
        if (search) {
            const query = search.toLowerCase();

            filtered = filtered.filter((user) => {
                const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();

                return (
                    fullName.includes(query) ||
                    user.email.toLowerCase().includes(query)
                );
            });
        }


        // FILTER
        if (roleFilter) {
            filtered = filtered.filter((user) => user.role?.toLowerCase() === roleFilter.toLowerCase());
        }

        if (genderFilter) {
            filtered = filtered.filter((user) => user.gender?.toLowerCase() === genderFilter.toLowerCase());
        }

        return filtered;
    }, [users, search, roleFilter, genderFilter]);
};