import { logout } from "@/apis/auth";

type MenuItem =
  | { label: string; href: string; onClick?: never }
  | { label: string; href?: never; onClick: () => void };

export const getMenuItems = (
  isLoggedIn: boolean,
  logoutFn: () => void,
): MenuItem[] => {
  const authItem: MenuItem = isLoggedIn
    ? {
        label: "Logout",
        onClick: async () => {
          try {
            await logout();
            logoutFn();
            location.href = "/login";
          } catch (e) {
            console.error("로그아웃 실패", e);
          }
        },
      }
    : { label: "Login", href: "/login" };

  return [
    { label: "Vote", href: "/vote" },
    { label: "Members", href: "/members" },
    authItem,
  ];
};
