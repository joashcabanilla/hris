//hooks
import type { Metadata } from "next";

//components
import { AccountSettings as AccountSettingComponent } from "@/components/content/account-settings";

export const metadata: Metadata = {
  title: "Account Settings"
};

export default function AccountSettings() {
  return <AccountSettingComponent />;
}
