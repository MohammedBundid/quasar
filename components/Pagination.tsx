import { useState } from "react";

interface PaginationTypes {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationTypes) => {
  const [isAnimating, setIsAnimating] = useState(false);

  // Function to generate the visible page numbers range
  const getPageNumbers = () => {
    const maxVisiblePages = 5;
    const pageNumbers: number[] = [];
    pageNumbers.push(1); // Always show the first page

    // Add range around the current page
    let start = Math.max(2, currentPage - 2); // Ensure the first page is excluded
    let end = Math.min(totalPages - 1, currentPage + 2);

    if (end - start < maxVisiblePages - 1) {
      start = Math.max(2, end - (maxVisiblePages - 2)); // Ensure a consistent length
    }
    
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    if (end < totalPages - 1) {
      pageNumbers.push(totalPages); // Show last page if not already in range
    }

    return pageNumbers;
  };

  // Handle animation
  const handlePageChange = (pageNumber: number) => {
    setIsAnimating(true); // Trigger animation
    onPageChange(pageNumber); // Change the page
    setTimeout(() => setIsAnimating(false), 300); // Remove animation after transition
  };

  return (
    <div className="flex w-full justify-center">
      {/* Previous Button */}
      <button
        className={`px-4 py-2 mx-1 text-text-800 capitalize bg-secondary-400 rounded-md ${
          currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-blue-500'
        }`}
        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <div className="flex items-center -mx-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-1 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          <span className="mx-1">Previous</span>
        </div>
      </button>

      {/* Page Numbers with Sliding Animation */}
      <div className={`flex transition-transform duration-300 ${isAnimating ? 'transform -translate-x-2' : ''}`}>
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 mx-1 text-text-700 transition-colors duration-300 transform bg-secondary-400 rounded-md ${
              page === currentPage ? 'bg-blue-500 text-white' : 'hover:bg-blue-500 hover:text-white'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        className={`px-4 py-2 mx-1 text-text-800 capitalize bg-secondary-400 rounded-md ${
          currentPage === totalPages ? 'cursor-not-allowed' : 'hover:bg-blue-500'
        }`}
        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <div className="flex items-center -mx-1">
          <span className="mx-1">Next</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-1 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default Pagination;
