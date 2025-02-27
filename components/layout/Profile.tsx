import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { FiUser } from "react-icons/fi";
import Image from "next/image";
import ProfileMenu from "./ProfileMenu";
import { Session } from "next-auth";
import { useTranslations } from "next-intl";

interface ProfileProps {
  name: string;
  session: Session;
}

const Profile = ({ name, session }: ProfileProps) => {
  const t = useTranslations("DropDownUserMenu");

  const userMenu = [
    { menu: t("mypage"), url: "/mypage" },
    { menu: t("inquiry"), url: "/inquiry" },
  ];

  const adminMenu = [
    { menu: t("dashboard"), url: "/dashboard" },
    { menu: t("mypage"), url: "/mypage" },
  ];

  const menuItems = session?.user?.role === "ADMIN" ? adminMenu : userMenu;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="group relative flex items-center gap-2 rounded-full p-1 outline-none transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="사용자 메뉴"
        >
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              alt={name}
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
              <FiUser className="text-xl text-gray-600 dark:text-gray-300" />
            </div>
          )}
        </button>
      </DropdownMenu.Trigger>
      <ProfileMenu name={name} menu={menuItems} logoutText={t("logout")} />
    </DropdownMenu.Root>
  );
};

export default Profile;
