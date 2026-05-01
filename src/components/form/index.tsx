import type { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { userSchema } from "@components/form/user-schema";
import type { User } from "@archetypes/user";
import { genderOptions, roleOptions } from "@constant";

import { Input } from "@components/input";
import { Dropdown } from "@components/dropdown";
import { Button } from "@components/button";

interface UserFormProps {
    defaultValues?: Partial<User>;
    onSubmit: (values: User) => Promise<void>;
    onCancel: () => void;
}


const sectionCard = "rounded-2xl border border-slate-100 bg-slate-50/60 p-5";
const sectionTitle =
    "mb-4 text-[11px] font-semibold uppercase tracking-widest text-slate-400";
const grid2 = "grid grid-cols-1 gap-4 sm:grid-cols-2";
const fullSpan = "sm:col-span-2";


const Section: FC<{ title: string; children: React.ReactNode }> = ({
    title,
    children,
}) => (
    <div className={sectionCard}>
        <p className={sectionTitle}>{title}</p>
        <div className={grid2}>{children}</div>
    </div>
);


export const UserForm: FC<UserFormProps> = ({
    defaultValues,
    onSubmit,
    onCancel,
}) => {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<User>({
        resolver: zodResolver(userSchema),
        defaultValues,
    });

    return (
        <form
            onSubmit={handleSubmit((data) => onSubmit({ ...data }))}
            className="flex flex-col gap-4"
        >
            <Section title="Personal info">
                <Controller
                    control={control}
                    name="firstName"
                    render={({ field }) => (
                        <Input
                            label="First name"
                            error={errors.firstName?.message}
                            {...field}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="lastName"
                    render={({ field }) => (
                        <Input
                            label="Last name"
                            error={errors.lastName?.message}
                            {...field}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                        <Input
                            label="Email"
                            type="email"
                            error={errors.email?.message}
                            {...field}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="phone"
                    render={({ field }) => (
                        <Input
                            label="Phone"
                            error={errors.phone?.message}
                            {...field}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="age"
                    render={({ field }) => (
                        <Input
                            label="Age"
                            type="number"
                            error={errors.age?.message?.toString()}
                            value={field.value || ""}
                            onChange={(e) =>
                                field.onChange(Number(e.target.value))
                            }
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="gender"
                    render={({ field }) => (
                        <Dropdown
                            label="Gender"
                            placeholder="Select gender"
                            options={genderOptions}
                            value={field.value}
                            onChange={field.onChange}
                            error={errors.gender?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="role"
                    render={({ field }) => (
                        <Dropdown
                            label="Role"
                            placeholder="Select role"
                            options={roleOptions}
                            value={field.value}
                            onChange={field.onChange}
                            error={errors.role?.message}
                        />
                    )}
                />
                <div className={fullSpan}>
                    <Controller
                        control={control}
                        name="image"
                        render={({ field }) => (
                            <Input
                                label="Profile image URL"
                                error={errors.image?.message}
                                {...field}
                            />
                        )}
                    />
                </div>
            </Section>

            <Section title="Address">
                <div className={fullSpan}>
                    <Controller
                        control={control}
                        name="address.address"
                        render={({ field }) => (
                            <Input
                                label="Street address"
                                error={errors.address?.address?.message}
                                {...field}
                            />
                        )}
                    />
                </div>
                <Controller
                    control={control}
                    name="address.city"
                    render={({ field }) => (
                        <Input
                            label="City"
                            error={errors.address?.city?.message}
                            {...field}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="address.state"
                    render={({ field }) => (
                        <Input
                            label="State"
                            error={errors.address?.state?.message}
                            {...field}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="address.country"
                    render={({ field }) => (
                        <Input
                            label="Country"
                            error={errors.address?.country?.message}
                            {...field}
                        />
                    )}
                />
            </Section>

            <Section title="Company">
                <Controller
                    control={control}
                    name="company.name"
                    render={({ field }) => (
                        <Input
                            label="Company name"
                            error={errors.company?.name?.message}
                            {...field}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="company.department"
                    render={({ field }) => (
                        <Input
                            label="Department"
                            error={errors.company?.department?.message}
                            {...field}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="company.title"
                    render={({ field }) => (
                        <Input
                            label="Title"
                            error={errors.company?.title?.message}
                            {...field}
                        />
                    )}
                />
            </Section>

            <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:justify-end">
                <Button variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" variant="primary" loading={isSubmitting}>
                    Save user
                </Button>
            </div>
        </form>
    );
};
