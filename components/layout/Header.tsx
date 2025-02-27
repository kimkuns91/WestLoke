"use client";

import Image from "next/image";
import Link from "next/link";
import LocaleSwitcher from "../LocaleSwitcher";
import { NAV_MENU } from "@/constants/navMenu";
import Nav from "../ui/nav";
import Profile from "./Profile";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const Header = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <header className={cn("py-6", pathname === "/" && "bg-[#F3EEEA]")}>
      <div className="container flex items-center justify-between">
        <div className="hidden flex-1 items-center gap-20 text-sm font-semibold sm:flex">
          {NAV_MENU.map((menu, index) => (
            <Nav key={index} url={menu.path} menu={menu.name} />
          ))}
        </div>
        <div className="flex flex-1 justify-center">
          <Link href={"/"} className="Menu">
            <Image
              src={"/images/Logo.svg"}
              width={100}
              height={30}
              alt="Logo"
              priority
            />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end gap-4 text-sm font-semibold">
          <LocaleSwitcher />
          {status === "authenticated" ? (
            <Profile name={session.user.name ?? ""} session={session} />
          ) : (
            <Nav url={"/signin"} menu={"Sign In"} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
