//components
import VerifyEmail from "@/components/auth/verify-email";

//CSS utils
import { container } from "@/lib/tv/global";

export default function Home() {
  return (
    <div className={container({ variant: "cardCenter" })}>
      <VerifyEmail />
    </div>
  );
}
