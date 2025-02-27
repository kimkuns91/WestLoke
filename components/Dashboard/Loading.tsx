import { Loader2 } from "lucide-react";

interface LoadingProps {
  className?: string;
  height?: string;
}

export function Loading({ className = "min-h-[400px]", height }: LoadingProps) {
  return (
    <div className={`flex items-center justify-center ${height || className}`}>
      <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
    </div>
  );
}
