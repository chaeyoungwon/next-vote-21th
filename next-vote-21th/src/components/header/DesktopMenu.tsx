import Link from "next/link";
import { usePathname } from "next/navigation";

import { menuItems } from "@/constants/header/menuItems";

const DesktopMenu = () => {
  const pathname = usePathname();
  return (
    <ul className="hidden gap-9 pr-[29px] min-md:flex">
      {menuItems.map(({ label, href }) => {
        const isActive = pathname === href;

        return (
          <li
            key={label}
            className={`text-body1-med text-violet-dark w-[100px] text-center hover:underline md:text-xl ${
              isActive ? "font-semibold underline" : ""
            }`}
          >
            <Link href={href}>{label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default DesktopMenu;
