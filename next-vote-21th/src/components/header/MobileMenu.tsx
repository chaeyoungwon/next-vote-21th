import Link from "next/link";

import clsx from "clsx";

import { menuItems } from "@/constants/header/menuItems";

interface MobileMenuProps {
  onClose: () => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
  isOpen: boolean;
}

const MobileMenu = ({ onClose, menuRef, isOpen }: MobileMenuProps) => {
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
      {/* 닫기 버튼 */}
      <button
        onClick={onClose}
        className="text-heading2 cursor-pointer pr-4 text-right text-black"
        aria-label="Close Menu"
      >
        X
      </button>

      {/* 메뉴 아이템들 */}
      {menuItems.map(({ label, href }) => (
        <Link
          key={label}
          href={href}
          onClick={onClose}
          className="text-violet-dark text-heading2 hover:border-violet-dark w-[174px] cursor-pointer border border-transparent py-[10px] pr-4 text-right"
        >
          {label}
        </Link>
      ))}
    </div>
  );
};

export default MobileMenu;
