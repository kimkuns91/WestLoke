import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavProps {
  url: string;
  menu: string;
  className?: string;
}

const Nav = ({ url, menu, className }: NavProps) => {
  return (
    <Link
      href={url}
      className={cn(
        "text-sm font-semibold",
        "transition-all duration-300 hover:opacity-60",
        className
      )}
    >
      {menu}
    </Link>
  );
};

export default Nav;
