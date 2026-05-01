import type { FC } from "react";

import { Button } from "@components/button";
import { LeftIcon, RightIcon } from "@icons";
import { usePagination, DOTS } from "@hooks/use-pagination";

interface PaginationProps {
    currentPage: number;
    totalRecords: number;
    pageSize: number;
    onPageChange: (page: number) => void;
}


const Strong: FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="font-semibold text-slate-900">{children}</span>
);

const cellBase =
    "h-10 min-w-10 rounded-xl border border-slate-200 bg-white px-3";

const pageBtn = {
    active: "bg-slate-900 text-white hover:bg-slate-800",
    inactive: `${cellBase} text-slate-700 hover:bg-slate-50`,
};

const navBtn = `${cellBase} text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50`;


export const Pagination: FC<PaginationProps> = ({
    currentPage,
    totalRecords,
    pageSize,
    onPageChange,
}) => {
    const paginationRange = usePagination({
        currentPage,
        totalRecords,
        pageSize,
    });
    const totalPages = Math.ceil(totalRecords / pageSize);

    if (!paginationRange || totalPages <= 1) return null;

    const from = (currentPage - 1) * pageSize + 1;
    const to = Math.min(currentPage * pageSize, totalRecords);

    return (
        <div className="w-full mt-8 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">

            <p className="text-sm font-medium text-slate-500">
                Showing <Strong>{from}</Strong> to <Strong>{to}</Strong> of{" "}
                <Strong>{totalRecords}</Strong> users
            </p>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-2">
                <Button
                    className={navBtn}
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    <LeftIcon />
                </Button>

                {paginationRange.map((page, index) =>
                    page === DOTS ? (
                        <div
                            key={index}
                            className={`${cellBase} flex items-center justify-center text-sm font-medium text-slate-500`}
                        >
                            ...
                        </div>
                    ) : (
                        <Button
                            key={index}
                            onClick={() => onPageChange(page as number)}
                            className={`h-10 min-w-10 rounded-xl px-4 text-sm font-semibold transition ${page === currentPage ? pageBtn.active : pageBtn.inactive}`}
                        >
                            {page}
                        </Button>
                    )
                )}

                <Button
                    variant="secondary"
                    className={navBtn}
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    <RightIcon />
                </Button>
            </div>
        </div>
    );
};


