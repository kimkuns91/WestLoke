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
      className={cn("py-20", pathname === "/" ? "bg-[#F3EEEA]" : "bg-white")}
    >
      <div className="container">
        <div className="flex justify-between">
          <div className="flex gap-8">
            <Image
              src={"/images/LogoGray.png"}
              alt="Logo"
              width={130}
              height={0}
            />
            <div className="flex flex-col">
              <p className="font-bold text-[#595959]">Westloke Amps</p>
              <Link
                href={westlokemusicEmail}
                className="font-normal text-[#595959]"
              >
                westlokemusic@gmail.com
              </Link>
            </div>
          </div>
          <div className="flex gap-2 text-[#595959]">
            <FiInstagram className="mt-[3px] text-xl" />
            <div className="flex flex-col">
              <Link href={tweedfreak}>@tweedfreak</Link>
              <Link href={westlokeamps}>@westlokeamps</Link>
            </div>
          </div>
          <div className="mb-8 flex items-center gap-2 text-[#595959]">
            <IoLocationSharp className="text-xl" />
            <p>3304 22th SE, Bothell 98021, Washington</p>
          </div>
        </div>
        <div className="py-6">
          <p className="text-sm font-medium text-[#8A8A8A]">
            Ⓒ2024 Westloke Amps. All right reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
