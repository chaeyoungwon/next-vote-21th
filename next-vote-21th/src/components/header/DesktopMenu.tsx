import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAuthStore } from "@/stores/useAuthStore";

import { getMenuItems } from "@/constants/menuItems";

interface DesktopMenuProps {
  isLoggedIn: boolean;
  onLoginRequired: () => void;
}

const DesktopMenu = ({ isLoggedIn, onLoginRequired }: DesktopMenuProps) => {
  const { clearAuth } = useAuthStore();
  const pathname = usePathname();

  const menuItems = getMenuItems(isLoggedIn, clearAuth);

  return (
    <ul className="hidden gap-9 pr-[29px] min-md:flex">
      {menuItems.map(({ label, href, onClick }) => {
        const isActive = pathname === href;

        const handleClick = (e: React.MouseEvent) => {
          if (label === "Vote" && !isLoggedIn) {
            e.preventDefault();
            onLoginRequired();
            return;
          }

          // 사용자 정의 동작이 있다면 실행
          onClick?.();
        };

        return (
          <li
            key={label}
            className={`text-body1-med text-violet-dark w-[100px] text-center hover:underline md:text-xl ${
              isActive ? "font-semibold underline" : ""
            }`}
          >
            {href ? (
              <Link href={href} onClick={handleClick}>
                {label}
              </Link>
            ) : (
              <button onClick={handleClick} className="w-full text-inherit">
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
