import { PAGE_SIZE } from "../constant";

import { SORT_BY, SORT_ORDER, type User } from "@archetypes/user";

const BASE_URL = "https://dummyjson.com/users";

interface FetchUsersParams {
    page?: number;
    search?: string;
    role?: string;
    gender?: string;
    sortBy?: SORT_BY;
    order?: SORT_ORDER;
}

export const fetchUsers = async ({
    page = 1,
    search = "",
    role = "",
    gender = "",
    sortBy = SORT_BY.NAME,
    order = SORT_ORDER.ASC,
}: FetchUsersParams) => {
    const hasLocalFilters = role || gender;

    const skip = (page - 1) * PAGE_SIZE;

    const baseUrl = search ? `${BASE_URL}/search` : BASE_URL;

    const params = new URLSearchParams();

    params.set(
        "limit",
        hasLocalFilters ? "0" : PAGE_SIZE.toString(),
    );

    if (!hasLocalFilters) {
        params.set("skip", skip.toString());
    }

    if (search) {
        params.set("q", search);
    }

    if (sortBy !== SORT_BY.NAME) {
        params.set("sortBy", sortBy);
    }

    if (order !== SORT_ORDER.ASC) {
        params.set("order", order);
    }

    const url = `${baseUrl}?${params.toString()}`;

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error("Failed to fetch users");
    }

    const data = await res.json();

    let filteredUsers = data.users || [];

    // local filters
    if (role) {
        filteredUsers = filteredUsers.filter(
            (user: { role?: string }) =>
                user.role?.toLowerCase() === role.toLowerCase(),
        );
    }

    if (gender) {
        filteredUsers = filteredUsers.filter(
            (user: { gender?: string }) =>
                user.gender?.toLowerCase() === gender.toLowerCase(),
        );
    }

    const paginatedUsers = hasLocalFilters
        ? filteredUsers.slice(skip, skip + PAGE_SIZE)
        : filteredUsers;

    return {
        ...data,
        users: paginatedUsers,
        total: hasLocalFilters
            ? filteredUsers.length
            : data.total,
    };
};

export const getUserById = async (id: string) => {
    const res = await fetch(`${BASE_URL}/${id}`);

    if (!res.ok) {
        throw new Error("Failed to fetch user");
    }

    return res.json();
};

export const addUser = async (data: User) => {
    const res = await fetch(`${BASE_URL}/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error("Failed to add user");
    }

    return res.json();
};

export const deleteUser = async (id: number) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        throw new Error("Failed to delete user");
    }

    return res.json();
};