"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";

import { useAuthStore } from "@/stores/useAuthStore";

import LoginModal from "@/components/common/LoginModal";

import HamburgerMenu from "@/public/svgs/header/hamburgerMenu.svg";
import Logo from "@/public/svgs/header/logo.svg";

import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 z-99 flex h-16 w-full items-center justify-between border border-gray-200 bg-gray-100 px-[21px] py-[22px] min-md:px-[31px]">
      <Link href="/">
        <Logo />
      </Link>

      <button
        className="cursor-pointer min-md:hidden"
        onClick={() => setIsOpen(prev => !prev)}
        aria-label="Toggle Menu"
      >
        <HamburgerMenu />
      </button>

      <DesktopMenu
        isLoggedIn={isLoggedIn}
        onLoginRequired={() => setIsModalOpen(true)}
      />
      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        menuRef={menuRef}
        isLoggedIn={isLoggedIn}
        onLoginRequired={() => setIsModalOpen(true)}
      />
      {isModalOpen && (
        <LoginModal
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => {
            setIsModalOpen(false);
            router.push("/login");
          }}
        />
      )}
    </nav>
  );
};

export default Header;
