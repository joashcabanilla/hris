"use client";

//hooks
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldErrors } from "react-hook-form";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

//cookie library
import Cookies from "js-cookie";

//css utils
import { cn } from "@/lib/utils";
import { input, inputClear, inputIcon } from "@/lib/tv/global";

//schemas
import { LoginSchema } from "@/schemas";

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
import { Copyright } from "@/components/shared/copyright";
import { FormAlert, AlertType } from "@/components/shared/form-alert";

//Services
import { useLogin, useLockedUser } from "@/services/mutations/auth";

//context global state
import { useAuthContext } from "@/context/auth/auth-context";

export default function Login() {
  //router
  const router = useRouter();

  //ref hook
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const loginAttempt = useRef(3);

  //global state
  const { dispatch } = useAuthContext();

  //states
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [alertTitle, setAlertTitle] = useState<string | undefined>(undefined);
  const [alertMessage, setAlertMessage] = useState<string | undefined>(undefined);
  const [alertType, setAlertType] = useState<AlertType>("success");

  //mutations
  const loginMutation = useLogin();
  const lockedUserMutation = useLockedUser();

  //use form hook
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { username: "", password: "" }
  });

  /**
   * Handle HTML Events
   */
  //handle forgot password event
  const handleForgotPassword = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    //TODO - forgot password function
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
          Cookies.set("token", res.token, { secure: true, expires: 1 });
          const payload = {
            id: res.user.id,
            usertype_id: res.user.usertype_id,
            firstname: res.user.firstname,
            middlename: res.user.middlename,
            lastname: res.user.lastname,
            email: res.user.email,
            email_verified: res.user.last_login_at && new Date(res.user.last_login_at),
            username: res.user.username,
            status: res.user.status
          };
          dispatch({ type: "LOGIN", payload: payload });

          if (res.message == "Please verify your email to complete the login process.") {
            router.replace("verify-email");
          }
          setAlertType("success");
          setAlertTitle(res.message);
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

  return (
    <LoginCard>
      <div className="grid gap-4">
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
                            disabled={false}
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
                            disabled={false}
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
        <Copyright />
      </div>
    </LoginCard>
  );
}
