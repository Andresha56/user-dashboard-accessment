import { useMemo } from "react";

export const DOTS = "...";

interface PaginationProps {
    totalRecords: number;
    pageSize: number;
    siblingCount?: number;
    currentPage: number;
}

const range = (start: number, end: number) => {
    return Array.from(
        { length: end - start + 1 },
        (_, idx) => idx + start
    );
};

export const usePagination = ({
    totalRecords,
    pageSize,
    siblingCount = 1,
    currentPage,
}: PaginationProps) => {

    const paginationRange = useMemo<(number | string)[]>(() => {
        const totalPageCount = Math.ceil(totalRecords / pageSize);

        const totalPageNumbers = siblingCount + 5;

        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount);
        }

        const leftSiblingIndex = Math.max(
            currentPage - siblingCount,
            1
        );

        const rightSiblingIndex = Math.min(
            currentPage + siblingCount,
            totalPageCount
        );

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots =
            rightSiblingIndex < totalPageCount - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;

        // no left dots
        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = 3 + 2 * siblingCount;

            const leftRange = range(1, leftItemCount);

            return [...leftRange, DOTS, totalPageCount];
        }

        // no right dots
        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = 3 + 2 * siblingCount;

            const rightRange = range(
                totalPageCount - rightItemCount + 1,
                totalPageCount
            );

            return [firstPageIndex, DOTS, ...rightRange];
        }

        // both dots
        if (shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = range(
                leftSiblingIndex,
                rightSiblingIndex
            );

            return [
                firstPageIndex,
                DOTS,
                ...middleRange,
                DOTS,
                lastPageIndex,
            ];
        }

        return [];
    }, [totalRecords, pageSize, siblingCount, currentPage]);

    return paginationRange;
};