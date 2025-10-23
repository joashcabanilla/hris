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
import { Combobox } from "@/components/shared/combobox";
import { Copyright } from "@/components/shared/copyright";

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
import { Textarea } from "@/components/ui/textarea";

//schemas
import { employeeSchema } from "@/schemas/admin-schema";

//api services
import {
  useGetEmployeeList,
  useGetCivilStatusList,
  useGetRegionList,
  useGetProvinceList,
  useGetCityList,
  useGetBarangayList
} from "@/services/queries/admin-query";
import { useGetPrefixSuffixList } from "@/services/queries/account-query";

export function Employee() {
  //router hook
  const router = useRouter();

  //ref hook
  const prefixRef = useRef<HTMLButtonElement>(null);
  const profileRef = useRef<HTMLInputElement>(null);
  const firstnameRef = useRef<HTMLInputElement>(null);
  const middlenameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const suffixRef = useRef<HTMLButtonElement>(null);
  const genderRef = useRef<HTMLButtonElement>(null);
  const birthdateRef = useRef<HTMLInputElement>(null);
  const civilStatusRef = useRef<HTMLButtonElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const contactNoRef = useRef<HTMLInputElement>(null);
  const emergencyContactNameRef = useRef<HTMLInputElement>(null);
  const emergencyContactNoRef = useRef<HTMLInputElement>(null);
  const regionRef = useRef<HTMLButtonElement>(null);
  const provinceRef = useRef<HTMLButtonElement>(null);
  const cityRef = useRef<HTMLButtonElement>(null);
  const barangayRef = useRef<HTMLButtonElement>(null);
  const addressRef = useRef<HTMLTextAreaElement>(null);
  const zipCodeRef = useRef<HTMLInputElement>(null);
  const employeeNoRef = useRef<HTMLInputElement>(null);

  //local state
  const [profileAlertTitle, setProfileAlertTitle] = useState<string>("");
  const [basicInfoAlertTitle, setBasicInfoAlertTitle] = useState<string>("");
  const [employeeInfoAlertTitle, setEmployeeInfoAlertTitle] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string | undefined>(undefined);
  const [selectedRegion, setSelectedRegion] = useState<number>(0);
  const [selectedProvince, setSelectedProvince] = useState<number>(0);
  const [selecctedCity, setSelectedCity] = useState<number>(0);

  const searchParams = useSearchParams();
  const employeeId = searchParams.get("id");

  //tanstack api query
  const getEmployeeList = useGetEmployeeList(
    employeeId === null ? employeeId : `?employeeId=${employeeId}`
  );
  const getPrefixSuffixList = useGetPrefixSuffixList();
  const getCivilStatusList = useGetCivilStatusList();
  const getRegionList = useGetRegionList();
  const getProvinceList = useGetProvinceList();
  const getCityList = useGetCityList();
  const getBarangayList = useGetBarangayList();

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
      civilStatus: "",
      email: "",
      contactNo: "",
      emergencyContactName: "",
      emergencyContactNo: "",
      region: "",
      province: "",
      city: "",
      barangay: "",
      address: "",
      zipCode: "",
      employeeNo: ""
    }
  });

  //handle employee form submit
  const employeeFormSubmit = (data: z.infer<typeof employeeSchema>) => {};

  //handle employee form error
  const employeeFormError = (error: FieldErrors) => {
    const firstError = Object.keys(error)[0];
    switch (firstError) {
      case "prefix":
        prefixRef.current?.focus();
        break;
      case "firstname":
        firstnameRef.current?.focus();
        break;
      case "middlename":
        middlenameRef.current?.focus();
        break;
      case "lastname":
        lastnameRef.current?.focus();
        break;
      case "suffix":
        suffixRef.current?.focus();
        break;
      case "gender":
        genderRef.current?.focus();
        break;
      case "birthdate":
        birthdateRef.current?.focus();
        break;
      case "civilStatus":
        civilStatusRef.current?.focus();
        break;
      case "email":
        emailRef.current?.focus();
        break;
      case "contactNo":
        contactNoRef.current?.focus();
        break;
      case "emergencyContactName":
        emergencyContactNameRef.current?.focus();
        break;
      case "emergencyContactNo":
        emergencyContactNoRef.current?.focus();
        break;
      case "region":
        regionRef.current?.focus();
        break;
      case "province":
        provinceRef.current?.focus();
        break;
      case "city":
        cityRef.current?.focus();
        break;
      case "barangay":
        barangayRef.current?.focus();
        break;
      case "address":
        addressRef.current?.focus();
        break;
      case "zipCode":
        zipCodeRef.current?.focus();
        break;
      case "employeeNo":
        employeeNoRef.current?.focus();
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
      | "civilStatus"
      | "email"
      | "contactNo"
      | "emergencyContactName"
      | "emergencyContactNo"
      | "region"
      | "province"
      | "city"
      | "barangay"
      | "address"
      | "zipCode"
      | "employeeNo";
    label: string;
    type?: string;
    ref?: RefObject<HTMLInputElement | null>;
    selectRef?: RefObject<HTMLButtonElement | null>;
    textareaRef?: RefObject<HTMLTextAreaElement | null>;
    comboBox?: boolean;
  };

  const personalInputList: typeElement[] = [
    {
      name: "prefix",
      label: "Prefix",
      selectRef: prefixRef
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
      label: "Suffix",
      selectRef: suffixRef
    },
    {
      name: "gender",
      label: "Gender",
      selectRef: genderRef
    },
    {
      name: "birthdate",
      label: "Date Of Birth",
      ref: birthdateRef
    },
    {
      name: "civilStatus",
      label: "Civil Status",
      selectRef: civilStatusRef
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      ref: emailRef
    },
    {
      name: "contactNo",
      type: "text",
      label: "Contact Number",
      ref: contactNoRef
    },
    {
      name: "emergencyContactName",
      type: "text",
      label: "Emergency Contact Name",
      ref: emergencyContactNameRef
    },
    {
      name: "emergencyContactNo",
      type: "text",
      label: "Emergency Contact Number",
      ref: emergencyContactNoRef
    }
  ];

  const addressInputList: typeElement[] = [
    {
      name: "region",
      label: "Region",
      comboBox: true,
      selectRef: regionRef
    },
    {
      name: "province",
      label: "Province",
      comboBox: true,
      selectRef: provinceRef
    },
    {
      name: "city",
      label: "City / Municipality",
      comboBox: true,
      selectRef: cityRef
    },
    {
      name: "barangay",
      label: "Barangay",
      comboBox: true,
      selectRef: barangayRef
    },
    {
      name: "zipCode",
      label: "Zip Code",
      type: "text",
      ref: zipCodeRef
    },
    {
      name: "address",
      label: "Address",
      type: "text",
      textareaRef: addressRef
    }
  ];

  const employeeInputList: typeElement[] = [
    {
      name: "employeeNo",
      label: "Employee Number",
      type: "text",
      ref: employeeNoRef
    }
  ];

  //list of gender
  const genderList = ["Male", "Female"];

  //handle combobox options data
  const handleComboboxOptions = (name: string) => {
    switch (name) {
      case "region":
        if (!getRegionList.isPending) {
          return getRegionList.data.data.map(
            (region: { id: string; region_code: string; name: string }) => ({
              id: region.id,
              label: region.name,
              value: region.region_code
            })
          );
        }
        break;
      case "province":
        if (!getProvinceList.isPending) {
          return getProvinceList.data.data
            .filter((province: { region_code: number }) => province.region_code === selectedRegion)
            .map((province: { id: string; province_code: string; name: string }) => ({
              id: province.id,
              label: province.name,
              value: province.province_code
            }));
        }
        break;
      case "city":
        if (!getCityList.isPending) {
          return getCityList.data.data
            .filter(
              (city: { region_code: number; province_code: number }) =>
                city.region_code === selectedRegion && city.province_code === selectedProvince
            )
            .map((city: { id: string; citymun_code: string; name: string }) => ({
              id: city.id,
              label: city.name,
              value: city.citymun_code
            }));
        }
        break;
      case "barangay":
        if (!getBarangayList.isPending) {
          return getBarangayList.data.data
            .filter(
              (barangay: { region_code: number; province_code: number; citymun_code: number }) =>
                barangay.region_code === selectedRegion &&
                barangay.province_code === selectedProvince &&
                barangay.citymun_code === selecctedCity
            )
            .map((barangay: { id: string; brgy_code: string; name: string }) => ({
              id: barangay.id,
              label: barangay.name,
              value: barangay.brgy_code
            }));
        }
        break;
    }
    return [];
  };

  let employeeData: EmployeeManagementColumnProps | null = null;
  if (!getEmployeeList.isPending && getEmployeeList.data != undefined) {
    if (getEmployeeList.data.data.length == 1) {
      const { data } = getEmployeeList.data;
      employeeData = data[0];
    }
  }

  const checkFetchedData =
    !getEmployeeList.isPending &&
    !getPrefixSuffixList.isPending &&
    !getCivilStatusList.isPending &&
    !getRegionList.isPending &&
    !getProvinceList.isPending &&
    !getCityList.isPending &&
    !getBarangayList.isPending &&
    getEmployeeList.data != undefined &&
    getPrefixSuffixList.data != undefined &&
    getCivilStatusList.data != undefined &&
    getRegionList.data != undefined &&
    getProvinceList.data != undefined &&
    getCityList.data != undefined &&
    getBarangayList.data != undefined;

  return (
    checkFetchedData && (
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
                                  element.name == "gender" ||
                                  element.name == "civilStatus" ? (
                                    <Select
                                      value={typeof field.value === "string" ? field.value : ""}
                                      onValueChange={field.onChange}
                                      name={field.name}
                                    >
                                      <SelectTrigger
                                        className={cn(
                                          "border-primary w-full cursor-pointer rounded-xl border-1 text-sm font-medium data-[placeholder]:font-normal",
                                          employeeForm.formState.errors[element.name] &&
                                            "border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive"
                                        )}
                                        name={field.name}
                                        id={field.name}
                                        onFocus={() => {
                                          setBasicInfoAlertTitle("");
                                        }}
                                        onClick={() => {
                                          setBasicInfoAlertTitle("");
                                        }}
                                        ref={element.selectRef}
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
                                          {element.name == "civilStatus" &&
                                            getCivilStatusList.data.data.map((value: string) => (
                                              <SelectItem key={value} value={value}>
                                                {value}
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
                                      placeholder={
                                        element.label == "Contact Number" ||
                                        element.label == "Emergency Contact Number"
                                          ? "09XXXXXXXXX"
                                          : element.label
                                      }
                                      type={element.type}
                                      autoComplete="false"
                                      name={element.name}
                                      maxLength={
                                        element.label == "Contact Number" ||
                                        element.label == "Emergency Contact Number"
                                          ? 11
                                          : undefined
                                      }
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

                    {/* Address element */}
                    <p className="mt-6 mb-2 text-sm font-medium">Current Address</p>
                    <div className="grid items-start gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                      {addressInputList.map((element) => (
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
                                {element.comboBox && (
                                  <FormControl>
                                    <Combobox
                                      id={field.name}
                                      name={element.name}
                                      placeholder={element.label}
                                      options={handleComboboxOptions(element.name)}
                                      errorState={
                                        employeeForm.formState.errors[element.name] ? true : false
                                      }
                                      value={field.value}
                                      onChange={(value) => {
                                        field.onChange(value);
                                        if (element.name == "region") {
                                          setSelectedRegion(parseInt(value));
                                          employeeForm.setValue("province", "");
                                          employeeForm.setValue("city", "");
                                          employeeForm.setValue("barangay", "");
                                        }

                                        if (element.name == "province") {
                                          setSelectedProvince(parseInt(value));
                                          employeeForm.setValue("city", "");
                                          employeeForm.setValue("barangay", "");
                                        }

                                        if (element.name == "city") {
                                          setSelectedCity(parseInt(value));
                                          employeeForm.setValue("barangay", "");
                                        }
                                      }}
                                      buttonRef={element.selectRef}
                                    />
                                  </FormControl>
                                )}
                                {element.name == "zipCode" && (
                                  <FormControl>
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
                                  </FormControl>
                                )}
                                {element.name == "address" && (
                                  <FormControl>
                                    <Textarea
                                      {...field}
                                      id={field.name}
                                      ref={element.textareaRef}
                                      name={element.name}
                                      className="bg-background border-primary h-14 rounded-xl border-1 text-sm font-medium placeholder:font-normal"
                                      placeholder={element.label}
                                      autoComplete="false"
                                      onFocus={() => {
                                        setBasicInfoAlertTitle("");
                                      }}
                                    />
                                  </FormControl>
                                )}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Employee Information */}
                  <div className="bg-background mt-4 rounded-xl p-4 shadow-lg">
                    <p className="text-base font-medium">Employee Information</p>
                    <span className="text-muted-foreground text-sm font-normal">
                      Employment-related details such as employee number, department, position, date
                      of hire, and current employment status.
                    </span>

                    {/*Employee Information Error Message*/}
                    <div className="mt-4">
                      <FormAlert title={employeeInfoAlertTitle} type="error" />
                    </div>

                    <div className="mt-6 grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {/* Employee Info Element */}
                      {employeeInputList.map((element) => (
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
                                      setEmployeeInfoAlertTitle("");
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
        <Copyright className="mt-0 mb-8 text-sm" />
      </div>
    )
  );
}
