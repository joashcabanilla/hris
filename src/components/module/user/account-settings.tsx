"use client";

//hooks
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, RefObject } from "react";
import { useForm, FieldErrors } from "react-hook-form";

//css utils
import { cn } from "@/lib/utils";
import { input, inputClear } from "@/lib/tv/global";

//schemas
import { UpdateProfileSchema, UpdateUserInfoSchema } from "@/schemas/account-schema";

//icons
import { CircleUserRound, Upload, EyeOff, Eye, LoaderCircle, CircleCheckBig } from "lucide-react";

//shadcn components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

//components
import { ContentHeader } from "@/components/shared/content-header";
import { FormAlert } from "@/components/shared/form-alert";
import AlertDialogComponent from "@/components/shared/alert-dialog";
import { Copyright } from "@/components/shared/copyright";

//zustand global state
import { useAuthStore } from "@/store/auth-store";

//mutation services
import { useUpdateProfilePicture, useUpdateUserInfo } from "@/services/mutations/account-mutation";
import { ValidationError } from "@/services/api/fetchrequest-api";

export function AccountSettings() {
  //ref hook
  const profileRef = useRef<HTMLInputElement>(null);
  const firstnameRef = useRef<HTMLInputElement>(null);
  const middlenameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  //mutation hook
  const updateProfilePictureMutation = useUpdateProfilePicture();
  const updateUserInfoMutation = useUpdateUserInfo();

  //global state
  const { user, setUser, setUserProfile } = useAuthStore();

  //local state
  const [profileAlertTitle, setProfileAlertTitle] = useState<string>("");
  const [userAlertTitle, setUserAlertTitle] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogDescription, setDialogDescription] = useState<string>("");
  const [dialogTitle, setDialogTitle] = useState<string>("");
  const [dialogIcon, setDialogIcon] = useState<React.ReactNode | null>(null);

  //use form hook
  const formProfile = useForm<z.infer<typeof UpdateProfileSchema>>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: { profile: null }
  });

  const formUserInfo = useForm<z.infer<typeof UpdateUserInfoSchema>>({
    resolver: zodResolver(UpdateUserInfoSchema),
    defaultValues: {
      firstname: user?.firstname,
      middlename: user?.middlename || "",
      lastname: user?.lastname,
      email: user?.email,
      username: "",
      password: "",
      confirmPassword: ""
    }
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

  //handle user information form
  const formUserInfoSubmit = (data: z.infer<typeof UpdateUserInfoSchema>) => {
    if (user) {
      const formData = {
        id: user.id.toString(),
        firstname: data.firstname,
        middlename: data.middlename || undefined,
        lastname: data.lastname,
        email: data.email,
        username: data.username || undefined,
        password: data.password || undefined
      };
      updateUserInfoMutation.mutate(formData, {
        onSuccess: (res) => {
          if (res.success) {
            setUser({
              id: res.user.id,
              usertype_id: res.user.usertype_id,
              profile_picture: res.user.profile_picture,
              firstname: res.user.firstname,
              middlename: res.user.middlename,
              lastname: res.user.lastname,
              email: res.user.email
            });
            setDialogTitle("Account Information Updated");
            setDialogDescription(res?.message);
            setDialogIcon(<CircleCheckBig strokeWidth={2} size={25} className="text-primary" />);
            setDialogOpen(true);
          }
        },
        onError: (error: ValidationError) => {
          if (error?.errors) {
            Object.entries(error.errors).forEach((value) => {
              const errorData = value[1];
              if (Array.isArray(errorData)) {
                setUserAlertTitle(errorData[0]);
              }
            });
          }
        }
      });
    }
  };

  //handle user information form error
  const formUserInfoError = (error: FieldErrors) => {
    const firstError = Object.keys(error)[0];
    switch (firstError) {
      case "firstname":
        firstnameRef.current?.focus();
        break;
      case "middlename":
        middlenameRef.current?.focus();
        break;
      case "lastname":
        lastnameRef.current?.focus();
        break;
      case "email":
        emailRef.current?.focus();
        break;
      case "username":
        usernameRef.current?.focus();
        break;
      case "password":
        passwordRef.current?.focus();
        break;
      case "confirmPassword":
        confirmPasswordRef.current?.focus();
        break;
    }
  };

  //handle confirm dialog
  const handleConfirmDialog = () => {
    window.location.reload();
  };

  type typeElement = {
    name:
      | "username"
      | "password"
      | "confirmPassword"
      | "firstname"
      | "middlename"
      | "lastname"
      | "email";
    label: string;
    type?: string;
    ref: RefObject<HTMLInputElement | null>;
  };

  //name input element array
  const nameElementList: typeElement[] = [
    {
      name: "firstname",
      label: "First Name",
      ref: firstnameRef
    },
    {
      name: "middlename",
      label: "Middle Name",
      ref: middlenameRef
    },
    {
      name: "lastname",
      label: "Last Name",
      ref: lastnameRef
    }
  ];

  //credentials input element array
  const credentialElementList: typeElement[] = [
    {
      name: "email",
      type: "email",
      label: "Email",
      ref: emailRef
    },
    {
      name: "username",
      type: "text",
      label: "Username",
      ref: usernameRef
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      ref: passwordRef
    },
    {
      name: "confirmPassword",
      type: "password",
      label: "Confirm Password",
      ref: confirmPasswordRef
    }
  ];

  return (
    <div>
      <ContentHeader mainModule="USER MODULE" subModule="ACCOUNT SETTINGS" />
      <main className="flex items-center justify-center p-4">
        <Card className="w-full shadow-lg xl:w-2/3">
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account information and profile details.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-8">
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
                <Button
                  className="w-fit text-base"
                  disabled={updateProfilePictureMutation.isPending}
                  onClick={handleChangeProfile}
                >
                  <Upload strokeWidth={3} />
                  Change Profile
                </Button>
                <p className="text-muted-foreground text-sm">JPEG, JPG or PNG. Max size 1MB.</p>
              </div>
            </div>

            {/* User Information Form Message*/}
            <FormAlert title={userAlertTitle} type="error" />

            {/* User Information Form */}
            <Form {...formUserInfo}>
              <form
                className="grid gap-4"
                onSubmit={formUserInfo.handleSubmit(formUserInfoSubmit, formUserInfoError)}
              >
                {/* name input element */}
                <div className="grid items-start gap-4 lg:grid-cols-3">
                  {nameElementList.map((element) => (
                    <FormField
                      key={element.name}
                      control={formUserInfo.control}
                      name={element.name}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">{element.label}</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input
                                {...field}
                                ref={element.ref}
                                placeholder={element.label}
                                type="text"
                                autoComplete="false"
                                disabled={updateUserInfoMutation.isPending}
                                name={element.name}
                                className={cn(
                                  input(),
                                  "border-primary h-10 border-1 ps-1 text-sm font-medium placeholder:font-normal"
                                )}
                                onFocus={() => {
                                  setUserAlertTitle("");
                                }}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>

                {/* credentials input element */}
                <div className="grid items-start gap-4 lg:grid-cols-2">
                  {credentialElementList.map((element) => (
                    <FormField
                      key={element.name}
                      control={formUserInfo.control}
                      name={element.name}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">{element.label}</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input
                                {...field}
                                ref={element.ref}
                                placeholder={element.label}
                                type={
                                  element.name == "password" && showPassword
                                    ? "text"
                                    : element.name == "confirmPassword" && showConfirmPassword
                                      ? "text"
                                      : element.type
                                }
                                autoComplete="false"
                                disabled={updateUserInfoMutation.isPending}
                                name={element.name}
                                className={cn(
                                  input(),
                                  "border-primary h-10 border-1 ps-1 text-sm font-medium placeholder:font-normal"
                                )}
                                onFocus={() => {
                                  setUserAlertTitle("");
                                }}
                              />
                            </FormControl>

                            {/* show password button */}
                            {element.name == "password" && (
                              <a
                                className={cn(
                                  field.value
                                    ? inputClear({ visibility: "show" })
                                    : inputClear({ visibility: "hide" })
                                )}
                                aria-label="show password"
                                onClick={() => {
                                  const passwordType = passwordRef.current?.type;
                                  if (passwordType === "password") {
                                    setShowPassword(true);
                                  } else {
                                    setShowPassword(false);
                                  }
                                }}
                              >
                                {showPassword ? (
                                  <EyeOff size={25} aria-hidden="true" />
                                ) : (
                                  <Eye size={25} aria-hidden="true" />
                                )}
                              </a>
                            )}

                            {/* show confirm password button */}
                            {element.name == "confirmPassword" && (
                              <a
                                className={cn(
                                  field.value
                                    ? inputClear({ visibility: "show" })
                                    : inputClear({ visibility: "hide" })
                                )}
                                aria-label="show password"
                                onClick={() => {
                                  const passwordType = confirmPasswordRef.current?.type;
                                  if (passwordType === "password") {
                                    setShowConfirmPassword(true);
                                  } else {
                                    setShowConfirmPassword(false);
                                  }
                                }}
                              >
                                {showConfirmPassword ? (
                                  <EyeOff size={25} aria-hidden="true" />
                                ) : (
                                  <Eye size={25} aria-hidden="true" />
                                )}
                              </a>
                            )}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>

                {/* button submit */}
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className={cn(
                      "w-full text-base font-bold lg:w-1/7",
                      updateUserInfoMutation.isPending && "text-sm"
                    )}
                    disabled={updateUserInfoMutation.isPending}
                  >
                    {updateUserInfoMutation.isPending ? (
                      <>
                        <LoaderCircle className="-ms-2 animate-spin" strokeWidth={3} /> Loading...
                      </>
                    ) : (
                      "Save"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
      <Copyright className="mt-0 mb-8 text-sm" />
      <AlertDialogComponent
        open={dialogOpen}
        hasCancel={false}
        confirmLabel={"Ok"}
        onConfirm={handleConfirmDialog}
        description={dialogDescription}
        title={dialogTitle}
        icon={dialogIcon}
      />
    </div>
  );
}
