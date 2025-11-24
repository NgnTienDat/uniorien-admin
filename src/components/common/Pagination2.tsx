interface Pagination2Props {
    page: number;
    totalPages: number;
    isFirst: boolean;
    isLast: boolean;
    setPage: (page: number) => void;
}

export const Pagination2 = ({
    page,
    totalPages,
    isFirst,
    isLast,
    setPage,
}: Pagination2Props) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-4 mt-6">
            {/* Previous */}
            <button
                disabled={isFirst}
                onClick={() => setPage(page - 1)}
                className="
                    px-3 py-1.5 rounded-lg border border-blue-200 
                    text-blue-600 font-medium text-sm
                    bg-white hover:bg-blue-50
                    disabled:opacity-40 disabled:cursor-not-allowed
                    transition-all cursor-pointer
                "
            >
                Previous
            </button>

            {/* Page indicator */}
            <span className="text-blue-600 font-semibold text-sm">
                {page} / {totalPages}
            </span>

            {/* Next */}
            <button
                disabled={isLast}
                onClick={() => setPage(page + 1)}
                className="
                    px-3 py-1.5 rounded-lg border border-blue-200 
                    text-blue-600 font-medium text-sm
                    bg-white hover:bg-blue-50
                    disabled:opacity-40 disabled:cursor-not-allowed
                    transition-all cursor-pointer
                "
            >
                Next
            </button>
        </div>
    );
};
