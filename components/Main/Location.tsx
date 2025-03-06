import { IoLocationSharp } from "react-icons/io5";
import { cn } from "@/lib/utils";

const Location = () => {
  return (
    <div
      className={cn(
        "container my-4 flex h-[240px] items-end py-8 md:my-8 md:h-[360px] md:py-16",
        "bg-[url('/images/LocationBG.png')] bg-cover bg-center bg-no-repeat"
      )}
    >
      <div className="container flex flex-col items-start justify-between px-4 text-white md:px-6">
        <div className="mb-4 flex items-center gap-2 text-sm md:mb-6 md:text-base">
          <IoLocationSharp />
          <p>Bothell, Washington, USA</p>
        </div>
        <h2 className="text-bold mb-2 text-2xl md:text-4xl">
          Made in Bothell, WA
        </h2>
        <p className="text-sm md:text-base">Made by Hand</p>
      </div>
    </div>
  );
};
export default Location;
