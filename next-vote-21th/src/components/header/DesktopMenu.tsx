import Link from "next/link";
import { usePathname } from "next/navigation";

import { menuItems } from "@/constants/header/menuItems";

interface DesktoMenuProps {
  isLoggedIn: boolean;
  onLoginRequired: () => void;
}
const DesktopMenu = ({ isLoggedIn, onLoginRequired }: DesktoMenuProps) => {
  const pathname = usePathname();
  return (
    <ul className="hidden gap-9 pr-[29px] min-md:flex">
      {menuItems.map(({ label, href }) => {
        const isActive = pathname === href;
        const handleClick = (e: React.MouseEvent) => {
          if (label === "Vote" && !isLoggedIn) {
            e.preventDefault(); // 기본 링크 이동 막기
            onLoginRequired(); // 로그인 모달 오픈
          }
        };

        return (
          <li
            key={label}
            className={`text-body1-med text-violet-dark w-[100px] text-center hover:underline md:text-xl ${
              isActive ? "font-semibold underline" : ""
            }`}
          >
            <Link href={href} onClick={handleClick}>
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default DesktopMenu;
