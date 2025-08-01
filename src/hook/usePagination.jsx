import {useState} from 'react';

const usePagination = (numberItems, itemPerPage, siblingCount = 1) => {
    const [curPage, setCurPage] = useState(1);

    const DOTS = "...";
    const totalPages = Math.ceil(numberItems / itemPerPage);
    const lastIndex = curPage * itemPerPage;
    const firstIndex = lastIndex - itemPerPage;
    const totalPagesDisplayed = siblingCount + 5;
    const leftSiblingIndex = Math.max(curPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
        curPage + siblingCount,
        totalPages
    );
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;
    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    let listOfPages = [];

    const range = (start, end) => {
        const length = end - start + 1;
        return Array.from({length}, (_, index) => {
            return index + start;
        })
    }

    if (totalPagesDisplayed >= totalPages) {
        listOfPages = range(1, totalPages);
    }

    if (!shouldShowLeftDots && shouldShowRightDots) {
        let leftItemCount = 3 + 2 * siblingCount;
        let leftRange = range(1, leftItemCount);

        listOfPages = [...leftRange, DOTS, totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
        let rightItemCount = 3 + 2 * siblingCount;
        let rightRange = range(
            totalPages - rightItemCount + 1,
            totalPages
        );
        listOfPages = [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
        let middleRange = range(leftSiblingIndex, rightSiblingIndex);
        listOfPages = [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }

    const setPage = (num) => {
        if (num > totalPages) {
            setCurPage(totalPages);
        } else if (num < 1) {
            setCurPage(1);
        } else {
            setCurPage(num);
        }
    }

    return {
        firstIndex,
        lastIndex,
        nextPage: () => setPage(curPage + 1),
        prevPage: () => setPage(curPage - 1),
        firstPage: () => setPage(1),
        lastPage: () => setPage(totalPages),
        curPage,
        setPage,
        DOTS,
        listOfPages
    }
}


export default usePagination;
