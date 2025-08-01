//hooks
import type { Metadata } from "next";

//CSS utils
import { container } from "@/lib/tv/global";

//components
import { ForgotPassword } from "@/components/auth/forgotpassword/forgot-password";

export const metadata: Metadata = {
  title: "Forgot Password"
};

export default function ResetPassword() {
  return (
    <div className={container({ variant: "cardCenter" })}>
      <ForgotPassword />
    </div>
  );
}
