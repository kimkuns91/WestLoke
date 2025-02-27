import { IoLocationSharp } from "react-icons/io5";
import { cn } from "@/lib/utils";

const Location = () => {
  return (
    <div
      className={cn(
        "container my-8 flex h-[360px] items-end py-16",
        "bg-[url('/images/LocationBG.png')] bg-cover bg-center bg-no-repeat"
      )}
    >
      <div className="container flex flex-col items-start justify-between text-white">
        <div className="mb-6 flex items-center gap-2">
          <IoLocationSharp />
          <p>Redmond, Washington, USA</p>
        </div>
        <h2 className="text-bold mb-2 text-4xl">Made in Redmond,WA</h2>
        <p>Made by Hand</p>
      </div>
    </div>
  );
};
export default Location;
