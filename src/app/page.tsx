//components
import Login from "@/components/auth/login";

//CSS utils
import { container } from "@/lib/tv/global";

export default function Home() {
  return (
    <div className={container({ variant: "cardCenter" })}>
      <Login />
    </div>
  );
}
