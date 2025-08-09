import { Loader } from "lucide-react";
export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Loader className="animate-spin" strokeWidth={3} size={50} />
    </div>
  );
}
