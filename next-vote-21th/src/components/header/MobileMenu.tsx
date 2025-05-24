import Link from "next/link";

import { useEffect } from "react";

import { useAuthStore } from "@/stores/useAuthStore";
import clsx from "clsx";

import { getMenuItems } from "@/constants/header/menuItems";

interface MobileMenuProps {
  onClose: () => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
  isOpen: boolean;
}

const MobileMenu = ({ onClose, menuRef, isOpen }: MobileMenuProps) => {
  const { isLoggedIn, clearAuth } = useAuthStore(); // 최신 상태 사용

  const menuItems = getMenuItems(isLoggedIn, clearAuth);

  const itemClass =
    "text-violet-dark text-heading2 hover:border-violet-dark w-[174px] cursor-pointer border border-transparent py-[10px] pr-4 text-right";

  return (
    <div
      ref={menuRef}
      className={clsx(
        "fixed top-0 right-0 z-50 h-screen w-[200px] bg-gray-200 px-[13px] py-8 shadow-lg min-md:hidden",
        "transition-transform duration-300 ease-in-out",
        "flex flex-col items-end gap-8",
        isOpen ? "translate-x-0" : "translate-x-full",
      )}
    >
      <button
        onClick={onClose}
        className="text-heading2 cursor-pointer pr-4 text-right text-black"
        aria-label="Close Menu"
      >
        X
      </button>

      {menuItems.map(({ label, href, onClick }) => (
        <li key={label}>
          {href ? (
            <Link href={href} onClick={onClose} className={itemClass}>
              {label}
            </Link>
          ) : (
            <button
              onClick={() => {
                onClick?.();
                onClose();
              }}
              className={itemClass}
            >
              {label}
            </button>
          )}
        </li>
      ))}
    </div>
  );
};

export default MobileMenu;
