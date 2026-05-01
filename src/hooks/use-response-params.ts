import { useSearchParams } from "react-router-dom";

import { SORT_BY, SORT_ORDER } from "@archetypes/user";

export const useResponseParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const search = searchParams.get("search") ?? "";

    const currentPage =
        Number.parseInt(searchParams.get("page") ?? "1", 10) || 1;

    const roleFilter = searchParams.get("role") ?? "";

    const genderFilter = searchParams.get("gender") ?? "";

    const sortBy =
        (searchParams.get("sortBy") as SORT_BY) ?? SORT_BY.NAME;

    const order =
        (searchParams.get("order") as SORT_ORDER) ?? SORT_ORDER.ASC;

    const updateParams = (
        updates: Record<string, string | null>,
        resetPage = false,
    ) => {
        const params = new URLSearchParams(searchParams);

        Object.entries(updates).forEach(([key, value]) => {
            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
        });

        if (resetPage) {
            params.delete("page");
        }

        setSearchParams(params);
    };

    const setSearch = (value: string) => {
        const trimmedValue = value.trim();

        updateParams(
            {
                search: trimmedValue || null,
            },
            true,
        );
    };

    const setCurrentPage = (page: number) => {
        updateParams({
            page: page > 1 ? page.toString() : null,
        });
    };

    const setRoleFilter = (value: string) => {
        updateParams(
            {
                role: value || null,
            },
            true,
        );
    };

    const setGenderFilter = (value: string) => {
        updateParams(
            {
                gender: value || null,
            },
            true,
        );
    };

    const setSortBy = (value: SORT_BY) => {
        updateParams(
            {
                sortBy:
                    value !== SORT_BY.NAME ? value : null,
            },
            true,
        );
    };

    const setOrder = (value: SORT_ORDER) => {
        updateParams(
            {
                order:
                    value !== SORT_ORDER.ASC ? value : null,
            },
            true,
        );
    };
    const clearFilters = () => {
        setSearchParams(new URLSearchParams());
    };
    return {
        search,
        setSearch,
        currentPage,
        setCurrentPage,
        roleFilter,
        setRoleFilter,
        genderFilter,
        setGenderFilter,
        sortBy,
        setSortBy,
        order,
        setOrder,
        clearFilters,
    };
};