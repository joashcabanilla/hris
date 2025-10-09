"use client";

//hooks
import { useSearchParams, useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldErrors } from "react-hook-form";
import { RefObject, useRef, useState } from "react";

//css utils
import { cn } from "@/lib/utils";

//icons
import { ArrowLeft, CircleUserRound, Upload } from "lucide-react";

//components
import { ContentHeader } from "@/components/shared/content-header";
import { type EmployeeManagementColumnProps } from "@/components/table/columns/employee-management-column";
import { FormAlert } from "@/components/shared/form-alert";
import { DatePicker } from "@/components/shared/datepicker";

//shadcn components
import {
  Card,
  CardContent,
  CardDescription,
  CardAction,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Anchor } from "@/components/ui/anchor";

//schemas
import { employeeSchema } from "@/schemas/admin-schema";

//api services
import { useGetEmployeeList } from "@/services/queries/admin-query";
import { useGetPrefixSuffixList } from "@/services/queries/account-query";

export function Employee() {
  //router hook
  const router = useRouter();

  //ref hook
  const profileRef = useRef<HTMLInputElement>(null);
  const firstnameRef = useRef<HTMLInputElement>(null);
  const middlenameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const birthdateRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  //local state
  const [profileAlertTitle, setProfileAlertTitle] = useState<string>("");
  const [basicInfoAlertTitle, setBasicInfoAlertTitle] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string | undefined>(undefined);

  const searchParams = useSearchParams();
  const employeeId = searchParams.get("id");
  //tanstack api query
  const getEmployeeList = useGetEmployeeList(
    employeeId === null ? employeeId : `?employeeId=${employeeId}`
  );
  const getPrefixSuffixList = useGetPrefixSuffixList();

  //zod validation form
  const employeeForm = useForm<z.infer<typeof employeeSchema>>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      profile: null,
      prefix: "",
      firstname: "",
      middlename: "",
      lastname: "",
      suffix: "",
      gender: "",
      birthdate: "",
      email: ""
    }
  });

  //handle employee form submit
  const employeeFormSubmit = (data: z.infer<typeof employeeSchema>) => {};

  //handle employee form error
  const employeeFormError = (error: FieldErrors) => {
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
      case "birthdate":
        birthdateRef.current?.focus();
        break;
      case "email":
        emailRef.current?.focus();
        break;
    }
  };

  //handle back to employee management click event
  const handleBack = () => {
    router.replace("/employee-management");
  };

  //handle change profile button click
  const handleChangeProfile = () => {
    setProfileAlertTitle("");
    profileRef.current?.click();
  };

  type typeElement = {
    name:
      | "prefix"
      | "firstname"
      | "middlename"
      | "lastname"
      | "suffix"
      | "gender"
      | "birthdate"
      | "email";
    label: string;
    type?: string;
    ref?: RefObject<HTMLInputElement | null>;
  };

  const personalInputList: typeElement[] = [
    {
      name: "prefix",
      label: "Prefix"
    },
    {
      name: "firstname",
      label: "First Name",
      type: "text",
      ref: firstnameRef
    },
    {
      name: "middlename",
      label: "Middle Name",
      type: "text",
      ref: middlenameRef
    },
    {
      name: "lastname",
      label: "Last Name",
      type: "text",
      ref: lastnameRef
    },
    {
      name: "suffix",
      label: "Suffix"
    },
    {
      name: "gender",
      label: "Gender"
    },
    {
      name: "birthdate",
      label: "Date Of Birth",
      ref: birthdateRef
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      ref: emailRef
    }
  ];

  //list of gender
  const genderList = ["Male", "Female"];

  let employeeData: EmployeeManagementColumnProps | null = null;
  if (!getEmployeeList.isPending) {
    if (getEmployeeList.data.data.length == 1) {
      const { data } = getEmployeeList.data;
      employeeData = data[0];
    }
  }

  return (
    !getEmployeeList.isPending &&
    !getPrefixSuffixList.isPending && (
      <div>
        <ContentHeader
          mainModule="ADMIN MODULE"
          subModule="EMPLOYEE MANAGEMENT"
          page={employeeId ? "EMPLOYEE INFORMATION" : "ADD EMPLOYEE"}
        />
        <main className="grid grid-cols-1 p-4">
          <Card className="shadow-lg">
            <CardHeader className="has-data-[slot=card-action]:grid-cols-1">
              <CardTitle>{employeeId ? "Employee Information" : "New Employee"}</CardTitle>
              <CardDescription>
                {employeeId
                  ? "This feature allows you to view employee information and make necessary updates to their profile, including personal details, job records, and employment status."
                  : "This feature allows you to create and store a new employee profile, including personal information, job details, and employment status."}
              </CardDescription>
              <CardAction className="col-start-1 row-start-3 mt-2 self-center justify-self-start lg:col-start-2 lg:row-start-1 lg:mt-0 lg:justify-self-end">
                <Button className="font-bold" onClick={handleBack}>
                  <ArrowLeft strokeWidth={3} /> Employee Management
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <Form {...employeeForm}>
                <form onSubmit={employeeForm.handleSubmit(employeeFormSubmit, employeeFormError)}>
                  {/* Personal Information */}
                  <div className="bg-background rounded-xl p-4 shadow-lg">
                    <p className="text-base font-medium">Personal Information</p>
                    <span className="text-muted-foreground text-sm font-normal">
                      Basic details about the employee
                    </span>

                    {/* Profile Picture */}
                    <div className="mt-4 flex flex-col items-center justify-center gap-4 md:flex-row md:justify-start">
                      <div className="border-primary flex size-30 items-center justify-center rounded-full border-3">
                        <Avatar className="h-full w-full rounded-full">
                          <AvatarImage
                            src={profilePicture ?? employeeData?.profile_picture ?? undefined}
                            alt={employeeData?.name ?? ""}
                            draggable={false}
                          />
                          <AvatarFallback className="rounded-full bg-transparent">
                            <CircleUserRound size={100} />
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="grid place-items-center gap-2 md:place-items-start">
                        <FormField
                          control={employeeForm.control}
                          name="profile"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  accept="image/jpeg,image/jpg,image/png"
                                  onChange={async (e) => {
                                    const file = e.target.files?.[0] || null;
                                    await field.onChange(file);
                                    await employeeForm.trigger("profile");
                                    const error = employeeForm.getFieldState("profile").error;
                                    if (error) {
                                      setProfileAlertTitle(error.message ?? "");
                                      setProfilePicture(undefined);
                                      return;
                                    }
                                    if (file) {
                                      setProfilePicture(URL.createObjectURL(file));
                                    }
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
                        {/* Profile Picture Form Message*/}
                        <FormAlert title={profileAlertTitle} type="error" />
                        <Anchor className="w-fit text-base" onClick={handleChangeProfile}>
                          <Upload strokeWidth={3} />
                          {employeeData !== null ? "Change Profile" : "Upload Profile"}
                        </Anchor>
                        <p className="text-muted-foreground text-sm">
                          JPEG, JPG or PNG. Max size 1MB.
                        </p>
                      </div>
                    </div>

                    {/*Basic Information Error Message*/}
                    <div className="mt-4">
                      <FormAlert title={basicInfoAlertTitle} type="error" />
                    </div>

                    {/* Basic Information */}
                    <div className="mt-6 grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {personalInputList.map((element) => (
                        <FormField
                          key={element.name}
                          control={employeeForm.control}
                          name={element.name}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium" htmlFor={field.name}>
                                {element.label}
                              </FormLabel>
                              <div className="relative">
                                <FormControl>
                                  {element.name == "prefix" ||
                                  element.name == "suffix" ||
                                  element.name == "gender" ? (
                                    <Select
                                      value={typeof field.value === "string" ? field.value : ""}
                                      onValueChange={field.onChange}
                                      name={field.name}
                                    >
                                      <SelectTrigger
                                        className={cn(
                                          "border-primary w-full cursor-pointer rounded-xl border-1 text-sm font-medium data-[placeholder]:font-normal",
                                          employeeForm.formState.errors[element.name] &&
                                            "border-destructive focus:ring-destructive"
                                        )}
                                        name={field.name}
                                        id={field.name}
                                        onFocus={() => {
                                          setBasicInfoAlertTitle("");
                                        }}
                                        onClick={() => {
                                          setBasicInfoAlertTitle("");
                                        }}
                                      >
                                        <SelectValue placeholder={element.label} />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectGroup>
                                          <SelectLabel>{element.label} List</SelectLabel>
                                          {element.name == "prefix" &&
                                            getPrefixSuffixList.data.data.prefix.map(
                                              (value: string) => (
                                                <SelectItem key={value} value={value}>
                                                  {value}
                                                </SelectItem>
                                              )
                                            )}

                                          {element.name == "suffix" && (
                                            <SelectItem key="None" value="None">
                                              None
                                            </SelectItem>
                                          )}
                                          {element.name == "suffix" &&
                                            getPrefixSuffixList.data.data.suffix.map(
                                              (value: string) => (
                                                <SelectItem key={value} value={value}>
                                                  {value}
                                                </SelectItem>
                                              )
                                            )}
                                          {element.name == "gender" &&
                                            genderList.map((gender: string) => (
                                              <SelectItem key={gender} value={gender}>
                                                {gender}
                                              </SelectItem>
                                            ))}
                                        </SelectGroup>
                                      </SelectContent>
                                    </Select>
                                  ) : element.name == "birthdate" ? (
                                    <DatePicker
                                      id={field.name}
                                      name={element.name}
                                      disabled={false}
                                      inputRef={birthdateRef}
                                      errorState={
                                        employeeForm.formState.errors[element.name] ? true : false
                                      }
                                      value={field.value}
                                      onChange={field.onChange}
                                    />
                                  ) : (
                                    <Input
                                      {...field}
                                      id={field.name}
                                      ref={element.ref}
                                      placeholder={element.label}
                                      type={element.type}
                                      autoComplete="false"
                                      name={element.name}
                                      className="bg-background border-primary h-9 rounded-xl border-1 text-sm font-medium placeholder:font-normal"
                                      onFocus={() => {
                                        setBasicInfoAlertTitle("");
                                      }}
                                    />
                                  )}
                                </FormControl>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  {/* button submit */}
                  <div className="mt-4 flex justify-end">
                    <Button
                      className="font-bold"
                      type="submit"
                      onClick={() => {
                        if (profilePicture == undefined) {
                          employeeForm.setValue("profile", null);
                        }
                      }}
                    >
                      {employeeId === null ? "Create Employee" : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  );
}
