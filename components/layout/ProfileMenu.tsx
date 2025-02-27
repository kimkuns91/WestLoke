"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import {
  FiGrid,
  FiLogOut,
  FiMessageSquare,
  FiSettings,
  FiUser,
} from "react-icons/fi";

import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface ProfileMenuProps {
  name: string;
  menu: Array<{ menu: string; url: string }>;
  logoutText: string;
}

const ProfileMenu = ({ name, menu, logoutText }: ProfileMenuProps) => {
  const router = useRouter();

  const getMenuIcon = (menuName: string) => {
    switch (menuName) {
      case "dashboard":
        return <FiGrid className="mr-2" />;
      case "mypage":
        return <FiUser className="mr-2" />;
      case "inquiry":
        return <FiMessageSquare className="mr-2" />;
      default:
        return <FiSettings className="mr-2" />;
    }
  };

  const handleLogout = async () => {
    signOut();
  };

  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        className="z-[35] min-w-[200px] rounded-xl border border-gray-100 bg-white p-2 shadow-lg will-change-[opacity,transform] dark:border-gray-800 dark:bg-gray-900"
        sideOffset={5}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <DropdownMenu.Label className="px-4 py-3">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {name}
            </p>
          </DropdownMenu.Label>

          <DropdownMenu.Separator className="my-1 h-px bg-gray-200 dark:bg-gray-700" />

          {menu.map((item) => (
            <DropdownMenu.Item
              key={item.url}
              onClick={() => router.push(item.url)}
              className="flex cursor-pointer items-center rounded-lg px-4 py-2.5 text-sm text-gray-700 outline-none transition-all duration-200 ease-in-out hover:bg-gray-100 hover:text-gray-900 active:scale-[0.98] dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
            >
              {getMenuIcon(item.menu.toLowerCase())}
              {item.menu}
            </DropdownMenu.Item>
          ))}

          <DropdownMenu.Separator className="my-1 h-px bg-gray-200 dark:bg-gray-700" />

          <DropdownMenu.Item
            onClick={handleLogout}
            className="flex cursor-pointer items-center rounded-lg px-4 py-2.5 text-sm text-red-600 outline-none transition-all duration-200 ease-in-out hover:bg-red-50 hover:text-red-700 active:scale-[0.98] dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300"
          >
            <FiLogOut className="mr-2" />
            {logoutText}
          </DropdownMenu.Item>
        </motion.div>
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
};

export default ProfileMenu;
