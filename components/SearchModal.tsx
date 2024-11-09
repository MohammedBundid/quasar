"use client"

import { useEffect, useRef, useState } from "react"

interface SearchModalProps {
    isVisible: boolean;
    searchTerm: string
    onClose: () => void;
  }

const SearchModal = ({ isVisible, searchTerm, onClose }: SearchModalProps) => {
    const [visible, setVisible] = useState(isVisible)
    const modalRef = useRef<HTMLDivElement>(null);

    // Toggle visibility when `isVisible` prop changes
    useEffect(() => {
        setVisible(isVisible);
    }, [isVisible]);

    // Close modal if click happens outside of it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            onClose(); // Call the onClose function passed from parent
        }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    if (!visible) return null; // Don't render the modal if not visible

  return (
    <div
      ref={modalRef}
      className="max-w-2xl w-1/2 bg-secondary-500 h-48 max-h-60 rounded-md absolute top-16 shadow-lg z-10"
    >
      {/* Your modal content goes here */}
      <h2 className="text-white text-xl font-semibold p-4">Search Results for <span>{searchTerm}</span></h2>
    </div>
  )
}

export default SearchModal