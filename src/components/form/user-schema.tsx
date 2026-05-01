import { z } from "zod";

export const userSchema = z.object({
    id: z.number().optional(),
    firstName: z
        .string()
        .min(1, "First name is required"),

    lastName: z
        .string()
        .min(1, "Last name is required"),

    email: z.email("Invalid email address"),

    phone: z
        .string()
        .min(1, "Phone is required"),

    age: z
        .number({
            error: "Age is required",
        })
        .min(1, "Invalid age"),

    gender: z
        .string()
        .min(1, "Gender is required"),

    role: z
        .string()
        .min(1, "Role is required"),

    image: z.url().optional().or(z.literal("")),
    
    address: z.object({
        address: z
            .string()
            .min(1, "Address is required"),
        city: z
            .string()
            .min(1, "City is required"),
        state: z
            .string()
            .min(1, "State is required"),
        country: z
            .string()
            .min(1, "Country is required"),
    }),
    
    company: z.object({
        name: z
            .string()
            .min(1, "Company name is required"),
        department: z   
            .string()   
            .min(1, "Department is required"),
        title: z
            .string()
            .min(1, "Title is required"),        
    }),
    
    birthDate: z.string().optional(),
    university: z.string().optional(),
});