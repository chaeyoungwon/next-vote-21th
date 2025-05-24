import { logout } from "@/apis/auth";

type MenuItem =
  | { label: string; href: string; onClick?: undefined }
  | { label: string; href?: undefined; onClick: () => void };

export const getMenuItems = (
  isLoggedIn: boolean,
  logoutFn: () => void,
): MenuItem[] => {
  if (isLoggedIn) {
    return [
      { label: "Vote", href: "/vote" },
      { label: "Members", href: "/members" },
      {
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
      },
    ];
  }

  return [
    { label: "Login", href: "/login" },
    { label: "Vote", href: "/vote" },
    { label: "Members", href: "/members" },
  ];
};
