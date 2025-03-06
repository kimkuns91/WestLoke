import { cn } from "@/lib/utils";

const SeoulSession = () => {
  return (
    <div
      className={cn(
        "flex h-[380px] w-full items-end py-8 md:h-[960px] md:py-16",
        "bg-[url('/images/SeoulSession.png')] bg-cover bg-center bg-no-repeat"
      )}
    >
      {/* <div className="item-center container flex justify-between px-4 text-white md:px-6">
        <div>
          <h2 className="text-bold text-2xl md:text-4xl">Seoul Session</h2>
          <p className="mt-1 text-sm md:text-base">by Ryle Lee and Junu</p>
        </div>
      </div> */}
    </div>
  );
};

export default SeoulSession;
