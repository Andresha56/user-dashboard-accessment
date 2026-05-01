import type { FC } from "react";

const headings = ["#", "User", "Email", "Age", "Phone", "Company", "Role", "Actions"];
const rows = Array.from({ length: 5 });

export const TableSkeleton: FC = () => (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
                <thead className="bg-slate-50">
                    <tr className="border-b border-slate-100">
                        {headings.map((heading) => (
                            <th
                                key={heading}
                                className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap"
                            >
                                <div className="h-3 w-20 rounded-full bg-slate-200/80" />
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="animate-pulse divide-y divide-slate-100">
                    {rows.map((_, index) => (
                        <tr key={index} className="border-b border-slate-100">
                            {headings.map((_, cellIndex) => (
                                <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                    <div className="h-4 w-full max-w-36 rounded-full bg-slate-200/80" />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);
