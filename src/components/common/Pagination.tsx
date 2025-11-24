// src/components/common/Pagination/Pagination.tsx
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalElements: number;
    onPageChange: (page: number) => void;
    isFirst: boolean;
    isLast: boolean;
}

export const Pagination = ({
    currentPage,
    totalPages,
    totalElements,
    onPageChange,
    isFirst,
    isLast,
}: PaginationProps) => {
    const generatePageNumbers = () => {
        const pages: (number | string)[] = [];
        const showEllipsis = totalPages > 7;

        if (!showEllipsis) {
            // Show all pages if total is 7 or less
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            if (currentPage > 3) {
                pages.push('...');
            }

            // Show pages around current page
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push('...');
            }

            // Always show last page
            pages.push(totalPages);
        }

        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={isFirst}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={isLast}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>

            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing{' '}
                        <span className="font-medium">
                            {totalElements === 0 ? 0 : (currentPage - 1) * 10 + 1}
                        </span>{' '}
                        to{' '}
                        <span className="font-medium">
                            {Math.min(currentPage * 10, totalElements)}
                        </span>{' '}
                        of <span className="font-medium">{totalElements}</span> results
                    </p>
                </div>

                <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                        {/* Previous Button */}
                        <button
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={isFirst}
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        {/* Page Numbers */}
                        {generatePageNumbers().map((page, index) =>
                            page === '...' ? (
                                <span
                                    key={`ellipsis-${index}`}
                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                                >
                                    ...
                                </span>
                            ) : (
                                <button
                                    key={page}
                                    onClick={() => onPageChange(page as number)}
                                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === page
                                            ? 'z-10 bg-blue-600 border-blue-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                        }`}
                                >
                                    {page}
                                </button>
                            )
                        )}

                        {/* Next Button */}
                        <button
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={isLast}
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
};