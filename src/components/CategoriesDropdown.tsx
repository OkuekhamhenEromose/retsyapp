'use client'

import { useRef, useEffect } from "react";

const categories = [
  "Accessories",
  "Art & Collectibles",
  "Baby",
  "Bags & Purses",
  "Bath & Beauty",
  "Books, Films & Music",
  "Clothing",
  "Craft Supplies & Tools",
  "Electronics & Accessories",
  "Gifts",
  "Home & Living",
  "Jewellery",
  "Paper & Party Supplies",
  "Pet Supplies",
  "Shoes",
  "Toys & Games",
  "Weddings",
];

interface CategoriesDropdownProps {
  open: boolean;
  onClose: () => void;
}

const CategoriesDropdown = ({ open, onClose }: CategoriesDropdownProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className="absolute top-full left-0 mt-1 w-72 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-[70vh] overflow-y-auto"
    >
      <ul className="py-2">
        {categories.map((cat) => (
          <li key={cat}>
            <a
              href="#"
              className="block px-6 py-3 text-[15px] font-medium text-foreground hover:underline"
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
            >
              {cat}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesDropdown;
