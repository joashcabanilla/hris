"use client";

//hooks
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldErrors } from "react-hook-form";
import { useRef, useState } from "react";

//css utils
import { input, inputIcon } from "@/lib/tv/global";

//Icons
import { Mail, LoaderCircle } from "lucide-react";

//form schema
import { FindAccountSchema } from "@/schemas/auth-schema";

//shadcn components
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

//Components
import { LoginCard } from "@/components/shared/card";
import { FormAlert, AlertType } from "@/components/shared/form-alert";

//Services
import { useFindAccount } from "@/services/mutations/auth";

//global state
import { useAuthStore } from "@/store/auth-store";

export function FindAccount() {
  //ref hook
  const emailRef = useRef<HTMLInputElement>(null);

  //global state
  const { setResetUser } = useAuthStore();

  //state variable
  const [alertTitle, setAlertTitle] = useState<string | undefined>(undefined);
  const [alertType, setAlertType] = useState<AlertType | undefined>("success");

  //use form hook
  const form = useForm<z.infer<typeof FindAccountSchema>>({
    resolver: zodResolver(FindAccountSchema),
    defaultValues: { email: "" }
  });

  //api mutations
  const findAccountMutation = useFindAccount();

  //handle find account event
  const formSubmit = (data: z.infer<typeof FindAccountSchema>) => {
    findAccountMutation.mutate(data, {
      onSuccess: (res) => {
        setAlertTitle(undefined);
        setAlertType(undefined);

        if (!res.success) {
          setAlertTitle(res.message);
          setAlertType("error");
        } else {
          setResetUser(res.user);
        }
      }
    });
  };

  //handle form error
  const handleError = (error: FieldErrors) => {
    const firstError = Object.keys(error)[0];
    switch (firstError) {
      case "email":
        emailRef.current?.focus();
        break;
    }
  };

  return (
    <LoginCard>
      {/* Form Header */}
      <div>
        <h1 className="text-xl font-bold">Find your account</h1>
        <p className="text-muted-foreground text-sm">
          Enter your email address to find your account.
        </p>
      </div>

      {/* Form Message */}
      <FormAlert title={alertTitle} type={alertType} />

      {/* Form Content */}
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(formSubmit, handleError)}>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative mt-2">
                      <FormControl>
                        <Input
                          {...field}
                          ref={emailRef}
                          placeholder="Email"
                          type="text"
                          autoComplete="false"
                          disabled={findAccountMutation.isPending}
                          name="username"
                          className={input()}
                          onFocus={() => {
                            setAlertTitle(undefined);
                            setAlertType(undefined);
                          }}
                        />
                      </FormControl>
                      <div className={inputIcon()}>
                        <Mail size={25} />
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center">
                <Button
                  size="sm"
                  className="w-fit font-bold"
                  type="submit"
                  disabled={findAccountMutation.isPending}
                >
                  {findAccountMutation.isPending ? (
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
    </LoginCard>
  );
}
