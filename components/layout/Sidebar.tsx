"use client";

import Image from "next/image";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import { NAV_MENU } from "@/constants/navMenu";
import Nav from "../ui/nav";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

interface ISidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: ISidebarProps) => {
  const pathname = usePathname();

  // 사이드바가 열렸을 때 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-[280px] transform bg-white transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4">
            <Link href="/" onClick={onClose}>
              <Image
                src={"/images/Logo.svg"}
                width={100}
                height={30}
                alt="Logo"
                priority
                className="h-auto w-[80px]"
              />
            </Link>
            <button
              onClick={onClose}
              className="text-2xl text-gray-500 transition-colors hover:text-gray-700"
            >
              <IoClose />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex flex-col p-4">
            {NAV_MENU.map((menu, index) => (
              <div key={index} className="border-b border-gray-100">
                <Nav
                  url={menu.path}
                  menu={menu.name}
                  className={cn(
                    "block py-4 text-base transition-colors hover:text-gray-600",
                    pathname === menu.path && "text-[#B50000]"
                  )}
                  onClick={onClose}
                />
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="mt-auto border-t p-4">
            <p className="text-xs text-gray-500">
              © 2024 Westloke Amps. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
