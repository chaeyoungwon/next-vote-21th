import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAuthStore } from "@/stores/useAuthStore";

// 경로 정리
import { getMenuItems } from "@/constants/header/menuItems";

const DesktopMenu = () => {
  const { isLoggedIn, clearAuth } = useAuthStore();
  const pathname = usePathname();

  const menuItems = getMenuItems(isLoggedIn, clearAuth); // logout → clearAuth

  return (
    <ul className="hidden gap-9 pr-[29px] min-md:flex">
      {menuItems.map(({ label, href, onClick }) => {
        const isActive = pathname === href;

        return (
          <li
            key={label}
            className={`text-body1-med text-violet-dark w-[100px] text-center hover:underline md:text-xl ${
              isActive ? "font-semibold underline" : ""
            }`}
          >
            {href ? (
              <Link href={href}>{label}</Link>
            ) : (
              <button onClick={onClick} className="w-full text-inherit">
                {label}
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default DesktopMenu;
