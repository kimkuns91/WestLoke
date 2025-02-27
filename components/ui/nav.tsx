import Link from "next/link";
import { cn } from "@/lib/utils";

interface INavProps {
  url: string;
  menu: string;
  className?: string;
  onClick?: () => void;
}

const Nav = ({ url, menu, className, onClick }: INavProps) => {
  return (
    <Link href={url} className={cn("Menu", className)} onClick={onClick}>
      {menu}
    </Link>
  );
};

export default Nav;
