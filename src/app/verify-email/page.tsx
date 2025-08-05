//hooks
import type { Metadata } from "next";

//components
import VerifyEmail from "@/components/auth/login/verify-email";

//CSS utils
import { container } from "@/lib/tv/global";

export const metadata: Metadata = {
  title: "Email Verification"
};

export default function Home() {
  return (
    <div className={container({ variant: "cardCenter", height: "full" })}>
      <VerifyEmail />
    </div>
  );
}
