import React from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const MAX_PAGE_NUMBERS = 5;
    let pages = [];
    if (totalPages <= MAX_PAGE_NUMBERS) {
        pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else if (currentPage <= Math.ceil(MAX_PAGE_NUMBERS / 2)) {
        pages = Array.from({ length: MAX_PAGE_NUMBERS }, (_, i) => i + 1);
    } else if (currentPage >= totalPages - Math.floor(MAX_PAGE_NUMBERS / 2)) {
        pages = Array.from({ length: MAX_PAGE_NUMBERS }, (_, i) => totalPages - MAX_PAGE_NUMBERS + i + 1);
    } else {
        pages = Array.from({ length: MAX_PAGE_NUMBERS }, (_, i) => currentPage - Math.floor(MAX_PAGE_NUMBERS / 2) + i);
    }

    return (
        <ButtonGroup size="sm" isAttached bg={"coral"} >
            <Button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                bg="coral"
            >
                Previous
            </Button>
            {pages.map((page) => (
                <Button
                    key={page}
                    isActive={currentPage === page}
                    onClick={() => onPageChange(page)}
                    bg="aqua"
                >
                    {page}
                </Button>
            ))}
            <Button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                bg="coral"
            >
                Next
            </Button>
            {totalPages > MAX_PAGE_NUMBERS && currentPage < totalPages - Math.floor(MAX_PAGE_NUMBERS / 2) && (
                <Button bg="coral" isDisabled>...</Button>
            )}
            {totalPages > MAX_PAGE_NUMBERS && currentPage >= Math.ceil(MAX_PAGE_NUMBERS / 2) && (
                <Button isDisabled>...</Button>
            )}
            {totalPages > MAX_PAGE_NUMBERS && currentPage >= totalPages - Math.floor(MAX_PAGE_NUMBERS / 2) && (
                <Button onClick={() => onPageChange(totalPages)}>Last</Button>
            )}
        </ButtonGroup>
    );
};

export default Pagination;
