"use client";

//hooks
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm, FieldErrors } from "react-hook-form";

//schemas
import { UpdateProfileSchema } from "@/schemas/account-schema";

//icons
import { CircleUserRound, Upload } from "lucide-react";

//shadcn components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

//components
import { ContentHeader } from "@/components/shared/content-header";
import { FormAlert } from "@/components/shared/form-alert";

//zustand global state
import { useAuthStore } from "@/store/auth-store";

//mutation services
import { useUpdateProfilePicture } from "@/services/mutations/account-mutation";

export function AccountSettings() {
  //ref hook
  const profileRef = useRef<HTMLInputElement>(null);

  //mutation hook
  const updateProfilePictureMutation = useUpdateProfilePicture();

  //local state
  const [profileAlertTitle, setProfileAlertTitle] = useState<string>("");

  //global state
  const { user, setUserProfile } = useAuthStore();

  //use form hook
  const formProfile = useForm<z.infer<typeof UpdateProfileSchema>>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: { profile: null }
  });

  //handle change profile button click
  const handleChangeProfile = () => {
    setProfileAlertTitle("");
    profileRef.current?.click();
  };

  //handle profile form
  const formProfileSubmit = (data: z.infer<typeof UpdateProfileSchema>) => {
    const formData = new FormData();
    formData.append("profile", data.profile as File);
    if (user) {
      formData.append("id", user?.id);
    }

    updateProfilePictureMutation.mutate(formData, {
      onSuccess: (res) => {
        if (res.success) {
          setUserProfile(res.profile);
        }
      }
    });
  };

  //handle profile form error
  const formProfileError = (error: FieldErrors) => {
    if (error.profile && typeof error.profile.message === "string") {
      setProfileAlertTitle(error.profile.message);
    }
  };

  return (
    <div>
      <ContentHeader mainModule="USER MODULE" subModule="ACCOUNT SETTINGS" />
      <main className="flex items-center justify-center p-4">
        <Card className="w-full shadow-lg lg:w-2/3">
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account information and profile details.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-start">
              <div className="border-primary flex size-30 items-center justify-center rounded-full border-3">
                <Avatar className="h-full w-full rounded-full">
                  <AvatarImage
                    src={user?.profile_picture || ""}
                    alt={user?.firstname || ""}
                    draggable={false}
                  />
                  <AvatarFallback className="rounded-full bg-transparent">
                    <CircleUserRound size={100} />
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="grid place-items-center gap-2 md:place-items-start">
                <Form {...formProfile}>
                  <form onSubmit={formProfile.handleSubmit(formProfileSubmit, formProfileError)}>
                    <FormField
                      control={formProfile.control}
                      name="profile"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              accept="image/jpeg,image/jpg,image/png"
                              onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                field.onChange(file);
                                formProfile.handleSubmit(formProfileSubmit, formProfileError)();
                              }}
                              ref={profileRef}
                              type="file"
                              name="profile"
                              hidden
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
                {/* Profile Picture Form Message*/}
                <FormAlert title={profileAlertTitle} type="error" />
                <Button className="w-fit text-base" onClick={handleChangeProfile}>
                  <Upload strokeWidth={3} />
                  Change Profile
                </Button>
                <p className="text-muted-foreground text-sm">JPEG, JPG or PNG. Max size 1MB.</p>
              </div>
            </div>
            <div>information</div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
