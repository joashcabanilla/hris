//hooks
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldErrors } from "react-hook-form";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

//css utils
import { cn } from "@/lib/utils";
import { input, inputIcon, inputClear } from "@/lib/tv/global";

//Icons
import { UserRound, Lock, Eye, EyeOff, LoaderCircle, CircleCheckBig } from "lucide-react";

//shadcn components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

//Components
import { LoginCard } from "@/components/shared/card";
import { FormAlert, AlertType } from "@/components/shared/form-alert";
import AlertDialogComponent from "@/components/shared/alert-dialog";

//form schema
import { ResetUserScheme } from "@/schemas/auth-schema";

//global state
import { useAuthStore } from "@/store/auth-store";

//Services
import { useUpdateUserCredential } from "@/services/mutations/auth";
import { ValidationError } from "@/services/api/auth";

export function ResetPassowrd() {
  //router
  const router = useRouter();

  //ref hook
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmpasswordRef = useRef<HTMLInputElement>(null);

  //global state
  const { resetUser, setResetUser } = useAuthStore();

  //state variable
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [alertTitle, setAlertTitle] = useState<string | undefined>(undefined);
  const [alertType, setAlertType] = useState<AlertType | undefined>("success");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogDescription, setDialogDescription] = useState<string>("");
  const [dialogTitle, setDialogTitle] = useState<string>("");
  const [dialogIcon, setDialogIcon] = useState<React.ReactNode | null>(null);

  //api mutation
  const updateUserCredential = useUpdateUserCredential();

  //use form hook
  const form = useForm<z.infer<typeof ResetUserScheme>>({
    resolver: zodResolver(ResetUserScheme),
    defaultValues: { username: "", password: "", confirmPassword: "" }
  });

  //handle reset account event
  const formSubmit = (data: z.infer<typeof ResetUserScheme>) => {
    if (resetUser) {
      updateUserCredential.mutate(
        {
          id: resetUser.id.toString(),
          username: data.username,
          password: data.password
        },
        {
          onSuccess: (res) => {
            if (res?.success) {
              setDialogTitle("User Credentials Updated");
              setDialogDescription(res?.message + " Please log in to continue.");
              setDialogIcon(<CircleCheckBig strokeWidth={2} size={25} className="text-primary"/>);
              setDialogOpen(true);
            }
          },
          onError: (error: ValidationError) => {
            if (error?.errors) {
              Object.entries(error.errors).forEach((value) => {
                const errorData = value[1];
                if (Array.isArray(errorData)) {
                  setAlertTitle(errorData[0]);
                  setAlertType("error");
                }
              });
            }
          }
        }
      );
    }
  };

  //handle form error
  const handleError = (error: FieldErrors) => {
    const firstError = Object.keys(error)[0];
    switch (firstError) {
      case "username":
        usernameRef.current?.focus();
        break;
      case "password":
        passwordRef.current?.focus();
        break;
      case "confirmPassword":
        confirmpasswordRef.current?.focus();
    }
  };

  //handle toggle show password
  const handleShowPassword = () => {
    const passwordType = passwordRef.current?.type;
    if (passwordType === "password") {
      setShowPassword(true);
    } else {
      setShowPassword(false);
    }
  };

  //handle toggle show confirm password
  const handleShowConfirmPassword = () => {
    const passwordType = confirmpasswordRef.current?.type;
    if (passwordType === "password") {
      setShowConfirmPassword(true);
    } else {
      setShowConfirmPassword(false);
    }
  };

  //handle input focus event
  const handleInputFocus = () => {
    setAlertTitle(undefined);
    setAlertType(undefined);
  };

  //handle confirm dialog event
  const handleConfirmDialog = () => {
    router.replace("/");
  };

  return (
    <LoginCard>
      {/* Form Header */}
      <div>
        <h1 className="text-xl font-bold">Reset your account</h1>
        <p className="text-muted-foreground text-sm">Fill out the form to reset your account.</p>
      </div>

      {/* Form Message */}
      <FormAlert title={alertTitle} type={alertType} />

      {/* Form Content */}
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(formSubmit, handleError)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-bold">Username</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          {...field}
                          ref={usernameRef}
                          placeholder="Username"
                          type="text"
                          autoComplete="false"
                          disabled={updateUserCredential.isPending}
                          name="username"
                          className={input()}
                          onFocus={handleInputFocus}
                        />
                      </FormControl>
                      <div className={inputIcon()}>
                        <UserRound size={25} />
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-bold">Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          {...field}
                          ref={passwordRef}
                          placeholder="Password"
                          type={showPassword ? "text" : "password"}
                          autoComplete="false"
                          disabled={updateUserCredential.isPending}
                          name="password"
                          className={input()}
                          onFocus={handleInputFocus}
                        />
                      </FormControl>
                      <div className={inputIcon()}>
                        <Lock size={25} />
                      </div>
                      <a
                        className={cn(
                          field.value
                            ? inputClear({ visibility: "show" })
                            : inputClear({ visibility: "hide" })
                        )}
                        aria-label="show password"
                        onClick={handleShowPassword}
                      >
                        {showPassword ? (
                          <EyeOff size={25} aria-hidden="true" />
                        ) : (
                          <Eye size={25} aria-hidden="true" />
                        )}
                      </a>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-bold">Confirm Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          {...field}
                          ref={confirmpasswordRef}
                          placeholder="Confirm Password"
                          type={showConfirmPassword ? "text" : "password"}
                          autoComplete="false"
                          disabled={updateUserCredential.isPending}
                          name="confirmPassword"
                          className={input()}
                          onFocus={handleInputFocus}
                        />
                      </FormControl>
                      <div className={inputIcon()}>
                        <Lock size={25} />
                      </div>
                      <a
                        className={cn(
                          field.value
                            ? inputClear({ visibility: "show" })
                            : inputClear({ visibility: "hide" })
                        )}
                        aria-label="show password"
                        onClick={handleShowConfirmPassword}
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={25} aria-hidden="true" />
                        ) : (
                          <Eye size={25} aria-hidden="true" />
                        )}
                      </a>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-center">
                <Button
                  className="w-full font-bold sm:w-1/3"
                  type="submit"
                  disabled={updateUserCredential.isPending}
                >
                  {updateUserCredential.isPending ? (
                    <>
                      <LoaderCircle className="-ms-2 animate-spin" strokeWidth={3} /> Loading...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
      <AlertDialogComponent
        open={dialogOpen}
        hasCancle={false}
        confirmLabel={"Ok"}
        onConfirm={handleConfirmDialog}
        description={dialogDescription}
        title={dialogTitle}
        icon={dialogIcon}
      />
    </LoginCard>
  );
}
