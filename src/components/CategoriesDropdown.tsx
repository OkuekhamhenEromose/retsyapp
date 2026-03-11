'use client'

import { useRef, useEffect } from "react";
import Link from "next/link";

const categories = [
  { label: "Accessories",               href: "/accessories" },
  { label: "Art & Collectibles",        href: "/art-collectibles" },
  { label: "Baby",                      href: "/c/baby" },
  { label: "Bags & Purses",             href: "/c/bags-purses" },
  { label: "Bath & Beauty",             href: "/c/bath-beauty" },
  { label: "Books, Films & Music",      href: "/c/books-films-music" },
  { label: "Clothing",                  href: "/c/clothing" },
  { label: "Craft Supplies & Tools",    href: "/c/craft-supplies-tools" },
  { label: "Electronics & Accessories", href: "/c/electronics-accessories" },
  { label: "Gifts",                     href: "/gifts" },
  { label: "Home & Living",             href: "/home-favourites" },
  { label: "Jewellery",                 href: "/c/jewellery" },
  { label: "Paper & Party Supplies",    href: "/c/paper-party-supplies" },
  { label: "Pet Supplies",              href: "/c/pet-supplies" },
  { label: "Shoes",                     href: "/c/shoes" },
  { label: "Toys & Games",              href: "/c/toys-games" },
  { label: "Weddings",                  href: "/c/weddings" },
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
          <li key={cat.label}>
            <Link
              href={cat.href}
              className="block px-6 py-3 text-[15px] font-medium text-foreground hover:underline"
              onClick={onClose}
            >
              {cat.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesDropdown;