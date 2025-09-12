"use client";

//hooks
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldErrors } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

//css utils
import { cn } from "@/lib/utils";
import { input, inputClear, inputIcon } from "@/lib/tv/global";

//schemas
import { LoginSchema } from "@/schemas/auth-schema";

//Icons
import { UserRound, Lock, Eye, EyeOff, LoaderCircle } from "lucide-react";

//Shadcn components
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
import { Anchor } from "@/components/ui/anchor";

//Components
import { LoginCard } from "@/components/shared/card";
import { FormAlert, AlertType } from "@/components/shared/form-alert";

//Services
import { useLogin, useLockedUser } from "@/services/mutations/auth-mutation";

//zustand global state
import { useAuthStore, type User } from "@/store/auth-store";

export default function Login() {
  //router
  const router = useRouter();

  //ref hook
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const loginAttempt = useRef(3);

  //global state
  const { user, setUser, setToken, setAuthenticated, setResetUser, authenticated } = useAuthStore();

  //states
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [alertTitle, setAlertTitle] = useState<string | undefined>(undefined);
  const [alertMessage, setAlertMessage] = useState<string | undefined>(undefined);
  const [alertType, setAlertType] = useState<AlertType | undefined>("success");

  //mutations
  const loginMutation = useLogin();
  const lockedUserMutation = useLockedUser();

  //use form hook
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { username: "", password: "" }
  });

  useEffect(() => {
    if (authenticated) {
      switch (user?.usertype_id) {
        case 1:
        case 2:
        case 3:
        case 4:
          router.replace("admin-dashboard", { scroll: false });
          break;
        case 5:
          router.replace("employee-dashboard", { scroll: false });
          break;
      }
    }
  }, [authenticated, user, router]);

  /**
   * Handle HTML Events
   */
  //handle forgot password event
  const handleForgotPassword = () => {
    setResetUser(null);
    router.push("forgot-password");
  };

  //handle login event
  const formSubmit = (data: z.infer<typeof LoginSchema>) => {
    loginMutation.mutate(data, {
      onSuccess: (res) => {
        if (!res.success) {
          setAlertType("error");
          setAlertTitle(res.message);
          setAlertMessage(undefined);
          if (res.message == "The password you entered is incorrect.") {
            loginAttempt.current--;
            if (loginAttempt.current === 0) {
              lockedUserMutation.mutate({ id: res.user.id });
              setAlertTitle("Your account is locked. Please contact support.");
              loginAttempt.current = 3;
            } else {
              setAlertMessage(
                `You have ${loginAttempt.current} remaining login ${loginAttempt.current === 1 ? "attempt" : "attempts"}. Another failed attempt will result in your account being locked.`
              );
            }
          }
        } else {
          setToken(res.token);
          const userState: User = {
            id: res.user.id,
            usertype_id: res.user.usertype_id,
            profile_picture: res.user.profile_picture,
            prefix: res.user.prefix,
            firstname: res.user.firstname,
            middlename: res.user.middlename,
            lastname: res.user.lastname,
            suffix: res.user.suffix,
            email: res.user.email
          };
          setUser(userState);

          if (res.message == "Please verify your email to complete the login process.") {
            router.replace("verify-email");
          } else {
            setAuthenticated(true);
          }
          setAlertType(undefined);
          setAlertTitle(undefined);
        }
      }
    });
  };

  //handle login form error
  const handleError = (error: FieldErrors) => {
    const firstError = Object.keys(error)[0];
    switch (firstError) {
      case "username":
        usernameRef.current?.focus();
        break;
      case "password":
        passwordRef.current?.focus();
        break;
    }
  };

  if (authenticated) {
    return null;
  }

  return (
    <LoginCard>
      {/* Form Header */}
      <div>
        <h1 className="text-xl font-bold">Login to account</h1>
        <p className="text-muted-foreground text-sm">
          Enter your credentials to access your account.
        </p>
      </div>

      {/* Form Message */}
      <FormAlert title={alertTitle} message={alertMessage} type={alertType} />

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
                    <FormLabel className="text-base font-bold">Username / Email</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          {...field}
                          ref={usernameRef}
                          placeholder="Username / Email"
                          type="text"
                          autoComplete="false"
                          disabled={loginMutation.isPending}
                          name="username"
                          className={input()}
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
                          disabled={loginMutation.isPending}
                          name="password"
                          className={input()}
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
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid gap-2">
                <Anchor
                  className="justify-end px-0 text-base font-bold"
                  variant="link"
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </Anchor>
                <Button
                  size="lg"
                  className="text-lg font-bold"
                  type="submit"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? (
                    <>
                      <LoaderCircle className="-ms-2 animate-spin" strokeWidth={3} /> Loading...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </LoginCard>
  );
}
