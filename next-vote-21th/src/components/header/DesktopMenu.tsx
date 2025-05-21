import Link from "next/link";

import { menuItems } from "src/constants/header/menuItems";

const DesktopMenu = () => (
  <ul className="hidden gap-9 pr-[29px] min-md:flex">
    {menuItems.map(({ label, href }) => (
      <li
        key={label}
        className="text-body1-med text-violet-dark w-[100px] text-center hover:underline min-md:!text-[20px]"
      >
        <Link href={href}>{label}</Link>
      </li>
    ))}
  </ul>
);

export default DesktopMenu;
