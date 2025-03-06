import { tweedfreak, westlokeamps, westlokemusicEmail } from "@/constants/sns";

import { FiInstagram } from "react-icons/fi";
import Image from "next/image";
import { IoLocationSharp } from "react-icons/io5";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  return (
    <footer
      className={cn(
        "py-10 md:py-20",
        pathname === "/" ? "bg-[#F3EEEA]" : "bg-white"
      )}
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="flex flex-col gap-4 md:flex-row md:gap-8">
            <Image
              src={"/images/LogoGray.png"}
              alt="Logo"
              width={130}
              height={0}
              className="h-auto w-[100px] md:w-[130px]"
            />
            <div className="flex flex-col">
              <p className="font-bold text-[#595959]">Westloke Amps</p>
              <Link
                href={westlokemusicEmail}
                className="text-sm font-normal text-[#595959] md:text-base"
              >
                westlokemusic@gmail.com
              </Link>
            </div>
          </div>
          <div className="flex gap-2 text-[#595959]">
            <FiInstagram className="mt-[3px] text-xl" />
            <div className="flex flex-col text-sm md:text-base">
              <Link href={tweedfreak}>@tweedfreak</Link>
              <Link href={westlokeamps}>@westlokeamps</Link>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[#595959]">
            <IoLocationSharp className="text-xl" />
            <p className="text-sm md:text-base">Bothell, Washington</p>
          </div>
        </div>
        <div className="mt-6 border-t border-[#E5E5E5] pt-6 md:mt-8 md:pt-8">
          <p className="text-xs font-medium text-[#8A8A8A] md:text-sm">
            Ⓒ2024 Westloke Amps. All right reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
