import { cn } from "@/lib/utils";

const SeoulSession = () => {
  return (
    <div
      className={cn(
        "flex h-[960px] w-full items-end py-16",
        "bg-[url('/images/SeoulSession.png')] bg-cover bg-center bg-no-repeat"
      )}
    >
      <div className="item-center container flex justify-between text-white">
        <div>
          <h2 className="text-bold text-4xl">Seoul Session</h2>
          <p>by Ryle Lee and Junu</p>
        </div>
      </div>
    </div>
  );
};

export default SeoulSession;
