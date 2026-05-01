

export enum SORT_BY {
    NAME = "name",
    AGE = "age",
}

export enum SORT_ORDER {
    ASC = "asc",
    DESC = "desc",
}
// types.ts

export interface User {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    age: number;
    gender: string;
    role: string;
    image?: string;
    birthDate?: string;
    university?: string;

    address: {
        address: string;
        city: string;
        state: string;
        country: string;
    };

    company: {
        name: string;
        department: string;
        title: string;
    };
}