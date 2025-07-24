"use client";

//react hooks
import { useId, useEffect, useState } from "react";

//other library hooks
import { OTPInput, SlotProps, REGEXP_ONLY_DIGITS } from "input-otp";

//css utils
import { cn } from "@/lib/utils";

//Shadcn components
import { Button } from "@/components/ui/button";

//Components
import { LoginCard } from "@/components/shared/card";
import { Copyright } from "@/components/shared/copyright";
import { FormAlert, AlertType } from "@/components/shared/form-alert";

//Services
import { useResendOtp } from "@/services/mutations/auth";

//context global state
import { useAuthContext } from "@/context/auth/auth-context";

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "border-primary/50 bg-card text-foreground flex size-9 items-center justify-center rounded-md border font-medium shadow-xs transition-[color,box-shadow]",
        { "border-ring ring-ring/50 z-10 ring-[3px]": props.isActive }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  );
}

export default function VerifyEmail() {
  //react hook
  const id = useId();

  //global state
  const { state } = useAuthContext();

  //component state
  const [timeLeft, setTimeLeft] = useState(2 * 60);
  const [alertTitle, setAlertTitle] = useState<string | undefined>(undefined);
  const [alertType, setAlertType] = useState<AlertType>("success");

  //mutations
  const resendOtpMutation = useResendOtp();

  //handle validate OTP event
  const handleOTP = (otp: string) => {
    //TODO logic for OTP validation
  };

  //handle resend OTP
  const handleResend = () => {
    if (state.user) {
      resendOtpMutation.mutate(
        { id: state.user.id },
        {
          onSuccess: (res) => {
            setAlertTitle(res.message);
            if (!res.success) {
              setAlertType("error");
            } else {
              setAlertType("success");
            }
          }
        }
      );
      setTimeLeft(2 * 60);
    }
  };

  useEffect(() => {
    if (timeLeft === 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
      if (timeLeft == 100 && !resendOtpMutation.isPending) {
        setAlertTitle(undefined);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, resendOtpMutation]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <LoginCard>
      <div className="grid gap-4">
        {/* Form Header */}
        <div>
          <h1 className="text-xl font-bold">Verify your account</h1>
          <p className="text-muted-foreground text-sm">Enter the OTP sent to your email address.</p>
        </div>

        {/* Form Message */}
        <FormAlert title={alertTitle} type={alertType} />

        {/* OTP Content */}
        <div className="flex justify-center *:not-first:mt-2">
          <OTPInput
            autoFocus
            id={id}
            pattern={REGEXP_ONLY_DIGITS}
            containerClassName="flex items-center gap-3 has-disabled:opacity-50"
            maxLength={6}
            onComplete={handleOTP}
            render={({ slots }) => (
              <div className="flex gap-2">
                {slots.map((slot, idx) => (
                  <Slot key={idx} {...slot} />
                ))}
              </div>
            )}
          />
        </div>

        {/* Resend OTP */}
        <div className="flex flex-col justify-center gap-2 text-center">
          {timeLeft ? (
            <p className="text-sm font-medium">
              Resend OTP in <strong>{formatTime(timeLeft)}</strong>
            </p>
          ) : (
            <div className="flex justify-center">
              <Button
                size="sm"
                className="w-fit font-semibold"
                onClick={handleResend}
                disabled={resendOtpMutation.isPending}
              >
                RESEND
              </Button>
            </div>
          )}
        </div>

        <Copyright />
      </div>
    </LoginCard>
  );
}
