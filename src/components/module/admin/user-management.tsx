"use client";

//hooks
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

//icons
import { CirclePlus, FunnelX, CircleAlert, Info } from "lucide-react";

//shadcn components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

//zustand global state
import { useTableStore } from "@/store/table-store";

//api services
import { useGetUserList } from "@/services/queries/admin-query";
import { useUpdateUserStatus } from "@/services/mutations/admin-mutation";

export function UserManagement() {
  //zustand global state
  const { setGlobalFilter, setColumnFilters } = useTableStore();

  //local state
  const [openDeactivateDialog, setOpenDeactivateDialog] = useState<boolean>(false);
  const [titleDeactivateDialog, setTitleDeactivateDialog] = useState<string>("");
  const [deactivateIcon, setDeactivateIcon] = useState<React.ReactNode | undefined>(undefined);
  const [deactivateUserId, setDeactivateUserId] = useState<string>("");

  //tanstack api query
  const getUserList = useGetUserList();
  const updateUserStatusMutation = useUpdateUserStatus();

  //tanstack query client
  const queryClient = useQueryClient();

  let dataTable: UserManagementColumnProps[] = [];
  if (!getUserList.isPending) {
    const { data } = getUserList.data;
    dataTable = data.map((user: UserManagementColumnProps) => ({
      id: user.id,
      usertype: { id: user.usertype.id, usertype: user.usertype.usertype },
      firstname: user.firstname,
      middlename: user.middlename,
      lastname: user.lastname,
      email: user.email,
      status: user.deleted_at ? "deactivated" : user.status,
      deleted_at: user.deleted_at,
      last_login_at: user.last_login_at,
      last_login_ip: user.last_login_ip
    }));
  }

  //handle deactivate user
  const handleDeactivateUser = useCallback((user: UserManagementColumnProps) => {
    if (user.status == "active") {
      setTitleDeactivateDialog("Deactivate User");
      setDeactivateIcon(<CircleAlert strokeWidth={2} size={25} className="text-destructive" />);
    } else {
      setTitleDeactivateDialog("Reactivate User");
      setDeactivateIcon(<Info strokeWidth={2} size={25} className="text-cyan-600" />);
    }
    setDeactivateUserId(user.id);
    setOpenDeactivateDialog(true);
  }, []);

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
          toast.error(res.message, {
            toasterId: "globalToast",
            duration: 5000
          });
        } else {
          toast.error(res.message, {
            toasterId: "globalToast",
            duration: 5000
          });
        }
      }
    });
  };

  const column = columns({ handleDeactivateUser });

  return (
    dataTable.length != 0 && (
      <div>
        <ContentHeader mainModule="ADMIN MODULE" subModule="USER MANAGEMENT" />
        <main className="grid grid-cols-1 p-4">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Create, update, and deactivate employee accounts and manage user permissions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* User Management Table */}
              <div className="bg-background flex flex-wrap items-center gap-2 rounded-t-xl p-4 shadow-lg">
                <SearchFilter />
                <UserTypeFilter />
                <UserStatusFilter />
                <Button
                  className="bg-amber-600/90 font-bold hover:bg-amber-600 focus-visible:ring-amber-400"
                  onClick={() => {
                    setColumnFilters([]);
                    setGlobalFilter("");
                  }}
                >
                  <FunnelX strokeWidth={3} /> Clear Filter
                </Button>
                <Button className="font-bold xl:ml-auto">
                  <CirclePlus strokeWidth={3} /> Add User
                </Button>
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
      </div>
    )
  );
}
