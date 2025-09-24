"use client";

//hooks
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldErrors } from "react-hook-form";
import { useCallback, useState, useRef, RefObject } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

//utils
import { cn } from "@/lib/utils";
import { input, inputClear } from "@/lib/tv/global";

//icons
import { FunnelX, CircleAlert, Info, EyeOff, Eye, LoaderCircle } from "lucide-react";

//shadcn components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
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
import { Input } from "@/components/ui/input";

//schemas
import { updateCredentialsSchema } from "@/schemas/admin-schema";

//components
import { ContentHeader } from "@/components/shared/content-header";
import { Copyright } from "@/components/shared/copyright";
import {
  columns,
  type UserManagementColumnProps
} from "@/components/table/columns/user-management-column";
import { DataTable } from "@/components/shared/data-table";
import { SearchFilter } from "@/components/table/filters/search-filter";
import { UserTypeFilter } from "@/components/table/filters/usertype-filter";
import { UserStatusFilter } from "@/components/table/filters/userstatus-filter";
import AlertDialogComponent from "@/components/shared/alert-dialog";
import { FormModal } from "@/components/shared/form-modal";
import { FormAlert } from "@/components/shared/form-alert";
import { ClearFilterButton } from "@/components/table/filters/clear-filter";

//zustand global state
import { useTableStore } from "@/store/table-store";
import { useAuthStore } from "@/store/auth-store";

//api services
import { useGetUserList, useGetUsertypeList } from "@/services/queries/admin-query";

//mutation services
import { ValidationError } from "@/services/api/fetchrequest-api";
import { useUpdateUserStatus } from "@/services/mutations/admin-mutation";
import { useUpdateUserInfo } from "@/services/mutations/account-mutation";

export function UserManagement() {
  //zustand global state
  const { setGlobalFilter, setColumnFilters, setPagination } = useTableStore();
  const { user, setUser } = useAuthStore();

  //local state
  const [openDeactivateDialog, setOpenDeactivateDialog] = useState<boolean>(false);
  const [titleDeactivateDialog, setTitleDeactivateDialog] = useState<string>("");
  const [deactivateIcon, setDeactivateIcon] = useState<React.ReactNode | undefined>(undefined);
  const [deactivateUserId, setDeactivateUserId] = useState<string>("");
  const [openUpdateCredentialModal, setOpenUpdateCredentialModal] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [updateCredentialsUser, setUpdateCredentialsUser] = useState<{
    id: string;
    firstname: string;
    lastname: string;
  } | null>(null);
  const [updateCredentialsAlertTitle, setUpdateCredentialsAlertTitle] = useState<string>("");
  const [selectUsertypeOpen, setSelectUsertypeOpen] = useState<boolean>(false);

  //useRef
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  //tanstack api query
  const getUserList = useGetUserList();
  const getUsertypeList = useGetUsertypeList();
  const updateUserStatusMutation = useUpdateUserStatus();
  const updateUserInfoMutation = useUpdateUserInfo();

  //tanstack query client
  const queryClient = useQueryClient();

  let dataTable: UserManagementColumnProps[] = [];
  if (!getUserList.isPending) {
    const { data } = getUserList.data;
    dataTable = data.map((user: UserManagementColumnProps) => ({
      id: user.id,
      usertype: { id: user.usertype.id, usertype: user.usertype.usertype },
      prefix: user.prefix,
      firstname: user.firstname,
      middlename: user.middlename,
      lastname: user.lastname,
      suffix: user.suffix,
      email: user.email,
      username: user.username,
      status: user.deleted_at ? "deactivated" : user.status,
      deleted_at: user.deleted_at,
      last_login_at: user.last_login_at,
      last_login_ip: user.last_login_ip
    }));
  }

  const updateCredentialsForm = useForm<z.infer<typeof updateCredentialsSchema>>({
    resolver: zodResolver(updateCredentialsSchema),
    defaultValues: {
      name: "",
      usertype: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: ""
    }
  });

  type typeElement = {
    name: "usertype" | "email" | "username" | "password" | "confirmPassword";
    label: string;
    type?: string;
    ref?: RefObject<HTMLInputElement | null>;
  };

  const credentialElementList: typeElement[] = [
    {
      name: "usertype",
      type: "text",
      label: "User Type"
    },
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

  //handle deactivate user
  const handleDeactivateUser = useCallback(
    (userData: UserManagementColumnProps) => {
      if (userData.id == user?.id) {
        return toast.error("You can't deactivate an authenticated user's account.", {
          toasterId: "globalToast"
        });
      }
      if (userData.status == "active") {
        setTitleDeactivateDialog("Deactivate User");
        setDeactivateIcon(<CircleAlert strokeWidth={2} size={25} className="text-destructive" />);
      } else {
        setTitleDeactivateDialog("Reactivate User");
        setDeactivateIcon(<Info strokeWidth={2} size={25} className="text-cyan-600" />);
      }
      setDeactivateUserId(userData.id);
      setOpenDeactivateDialog(true);
    },
    [user]
  );

  //handle confirm deactivate user
  const handleConfirmDeactivate = () => {
    const data = {
      id: deactivateUserId,
      status: titleDeactivateDialog == "Deactivate User" ? "deactivate" : "active"
    };
    updateUserStatusMutation.mutate(data, {
      onSuccess: (res) => {
        if (res.success) {
          setOpenDeactivateDialog(false);
          queryClient.invalidateQueries({ queryKey: ["adminGetUserList"] });
          toast.success(res.message, {
            toasterId: "globalToast"
          });
        } else {
          toast.error(res.message, {
            toasterId: "globalToast"
          });
        }
      }
    });
  };

  //handle update credentials
  const handleUpdateCredentials = useCallback(
    (user: UserManagementColumnProps) => {
      updateCredentialsForm.reset({
        name: `${user.prefix} ${user.firstname} ${user.middlename} ${user.lastname} ${user.suffix == null ? "" : user.suffix}`,
        usertype: user.usertype.id.toString(),
        email: user.email,
        username: user.username,
        password: "",
        confirmPassword: ""
      });
      setUpdateCredentialsUser({ id: user.id, firstname: user.firstname, lastname: user.lastname });
      setOpenUpdateCredentialModal(true);
    },
    [updateCredentialsForm]
  );

  //handle update credential form submit
  const updateCredentialSubmit = (data: z.infer<typeof updateCredentialsSchema>) => {
    if (updateCredentialsUser?.id) {
      const formData = {
        id: updateCredentialsUser.id,
        usertype: parseInt(data.usertype),
        firstname: updateCredentialsUser.firstname,
        lastname: updateCredentialsUser.lastname,
        email: data.email,
        username: data.username,
        password: data.password || undefined
      };

      updateUserInfoMutation.mutate(formData, {
        onSuccess: (res) => {
          if (user?.id == res.user.id) {
            setUser({
              id: res.user.id,
              usertype_id: res.user.usertype_id,
              profile_picture: res.user.profile_picture,
              prefix: res.user.prefix,
              firstname: res.user.firstname,
              middlename: res.user.middlename,
              lastname: res.user.lastname,
              suffix: res.user.suffix,
              email: res.user.email
            });
          }
          queryClient.invalidateQueries({ queryKey: ["adminGetUserList"] });
          setOpenUpdateCredentialModal(false);
          toast.success("User credentials updated successfully.", {
            toasterId: "globalToast"
          });
        },
        onError: (error: ValidationError) => {
          if (error?.errors) {
            Object.entries(error.errors).forEach((value) => {
              const errorData = value[1];
              if (Array.isArray(errorData)) {
                setUpdateCredentialsAlertTitle(errorData[0]);
              }
            });
          }
        }
      });
    }
  };

  //handle update credentilas form error
  const updateCredentialError = (error: FieldErrors) => {
    const firstError = Object.keys(error)[0];
    switch (firstError) {
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

  const column = columns({ handleDeactivateUser, handleUpdateCredentials });

  return (
    dataTable.length > 0 &&
    !getUsertypeList.isPending && (
      <div>
        <ContentHeader mainModule="ADMIN MODULE" subModule="USER MANAGEMENT" />
        <main className="grid grid-cols-1 p-4">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Update user credentials, and manage user reactivation and deactivation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* User Management Table */}
              <div className="bg-background flex flex-wrap items-center gap-2 rounded-t-xl p-4 shadow-lg">
                <SearchFilter />
                <UserTypeFilter getUsertypeList={getUsertypeList} />
                <UserStatusFilter />
                <ClearFilterButton />
              </div>
              <DataTable columns={column} data={dataTable} />
            </CardContent>
          </Card>
        </main>

        <Copyright className="mt-0 mb-8 text-sm" />

        <AlertDialogComponent
          open={openDeactivateDialog}
          hasCancel={true}
          onCancel={() => {
            setOpenDeactivateDialog(false);
          }}
          confirmLabel={"Confirm"}
          onConfirm={handleConfirmDeactivate}
          description={`Are you sure you want to ${titleDeactivateDialog == "Deactivate User" ? "deactivate" : "reactivate"} this user?`}
          title={titleDeactivateDialog}
          icon={deactivateIcon}
          confirmClassName={`${titleDeactivateDialog == "Deactivate User" && "bg-destructive/90 hover:bg-destructive"}`}
        />

        <FormModal
          open={openUpdateCredentialModal}
          onOpenChange={setOpenUpdateCredentialModal}
          onClose={() => {
            setUpdateCredentialsAlertTitle("");
            setShowPassword(false);
            setShowConfirmPassword(false);
          }}
          onEscapeKeyDown={() => {
            setSelectUsertypeOpen(false);
          }}
          title="Update User Credentials"
          description="Update this user's credentials, including username, email, or password."
        >
          {/* Update Credentials Form Message*/}
          <FormAlert title={updateCredentialsAlertTitle} type="error" />

          <Form {...updateCredentialsForm}>
            <form
              onSubmit={updateCredentialsForm.handleSubmit(
                updateCredentialSubmit,
                updateCredentialError
              )}
            >
              <div className="mb-4 grid items-start gap-2 md:mb-6 md:gap-4">
                <FormField
                  control={updateCredentialsForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          name="name"
                          autoComplete="false"
                          readOnly
                          className={cn(
                            input(),
                            "border-primary/50 bg-secondary h-9 cursor-not-allowed border-1 ps-1 text-sm font-normal select-none placeholder:font-normal"
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {credentialElementList.map((element) => (
                  <FormField
                    key={element.name}
                    control={updateCredentialsForm.control}
                    name={element.name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium" htmlFor={field.name}>
                          {element.label}
                        </FormLabel>
                        <div className="relative">
                          <FormControl>
                            {element.name == "usertype" ? (
                              <Select
                                onValueChange={field.onChange}
                                {...field}
                                open={selectUsertypeOpen}
                                onOpenChange={setSelectUsertypeOpen}
                              >
                                <SelectTrigger
                                  className="bg-card border-primary/50 relative h-9 w-full cursor-pointer rounded-xl"
                                  name={field.name}
                                  id={field.name}
                                  onFocus={() => {
                                    setUpdateCredentialsAlertTitle("");
                                  }}
                                  onClick={() => {
                                    setUpdateCredentialsAlertTitle("");
                                  }}
                                >
                                  <SelectValue placeholder="User Type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>User Type List</SelectLabel>
                                    {getUsertypeList.data.data.map(
                                      (value: {
                                        id: number;
                                        usertype: string;
                                        created_at: Date;
                                        updated_at: Date;
                                      }) => (
                                        <SelectItem key={value.id} value={value.id.toString()}>
                                          {value.usertype}
                                        </SelectItem>
                                      )
                                    )}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            ) : (
                              <Input
                                {...field}
                                id={field.name}
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
                                name={field.name}
                                className={cn(
                                  input(),
                                  "border-primary/50 bg-card h-9 border-1 ps-1 text-sm font-normal placeholder:font-normal"
                                )}
                                onFocus={() => {
                                  setUpdateCredentialsAlertTitle("");
                                }}
                              />
                            )}
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

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={updateUserInfoMutation.isPending}>
                  {updateUserInfoMutation.isPending ? (
                    <>
                      <LoaderCircle className="-ms-2 animate-spin" strokeWidth={3} /> Loading...
                    </>
                  ) : (
                    "Save changes"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </FormModal>
      </div>
    )
  );
}
