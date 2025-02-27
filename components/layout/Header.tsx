"use client";

import Image from "next/image";
import Link from "next/link";
import LocaleSwitcher from "../LocaleSwitcher";
import { NAV_MENU } from "@/constants/navMenu";
import Nav from "../ui/nav";
import Profile from "./Profile";
import { RiMenu3Line } from "react-icons/ri";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";

const Header = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <header className={cn("py-4 md:py-6", pathname === "/" && "bg-[#F3EEEA]")}>
      <div className="container flex items-center justify-between">
        {/* Left Section with Mobile Menu Button */}
        <div className="flex flex-1 items-center">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="mr-4 text-2xl lg:hidden"
          >
            <RiMenu3Line />
          </button>
          <div className="hidden flex-1 items-center gap-20 text-sm font-semibold lg:flex">
            {NAV_MENU.map((menu, index) => (
              <Nav key={index} url={menu.path} menu={menu.name} />
            ))}
          </div>
        </div>

        {/* Logo */}
        <div className="flex flex-1 justify-center">
          <Link href={"/"} className="Menu">
            <Image
              src={"/images/Logo.svg"}
              width={100}
              height={30}
              alt="Logo"
              priority
              className="h-auto w-[80px] md:w-[100px]"
            />
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex flex-1 items-center justify-end gap-4 text-sm font-semibold">
          <LocaleSwitcher />
          {status === "authenticated" ? (
            <Profile name={session.user.name ?? ""} session={session} />
          ) : (
            <Nav url={"/signin"} menu={"Sign In"} />
          )}
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </header>
  );
};

export default Header;
