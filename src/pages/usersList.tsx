import { useEffect, useMemo, useState, type FC } from "react";
import { useNavigate } from "react-router-dom";

import { addUser, fetchUsers, deleteUser } from "@queries";

import type { User } from "@archetypes/user";

import { UserTable } from "@components/response-table";
import { UsersToolbar } from "@components/user-toolbar";
import { UserAddEditDialog } from "@dialog/user-add-edit-dialog";
import { Pagination } from "@components/pagination";

import { useResponseParams } from "@hooks/use-response-params";

import { PAGE_SIZE } from "@constant";
import { useToastContext } from "@context/toast";

export const UsersList: FC = () => {
   const navigate = useNavigate();
   const {
      search,
      setSearch,
      currentPage,
      setCurrentPage,
      roleFilter,
      setRoleFilter,
      genderFilter,
      setGenderFilter,
      sortBy,
      setSortBy,
      order,
      setOrder,
      clearFilters
   } = useResponseParams();
   const { showToast } = useToastContext();

   const [usersData, setUsersData] = useState<User[]>([]);
   const [localUsers, setLocalUsers] = useState<User[]>([]);

   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");

   const [totalRecords, setTotalRecords] = useState(0);

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedUser, setSelectedUser] = useState<User | null>(null);

   useEffect(() => {
      const loadUsers = async () => {
         try {
            setLoading(true);
            setError("");

            const data = await fetchUsers({
               page: currentPage,
               search,
               role: roleFilter,
               gender: genderFilter,
               sortBy,
               order,
            });

            setUsersData(data.users || []);
            setTotalRecords(data.total || 0);
         } catch {
            setError("Failed to fetch users. Please try again.");
         } finally {
            setLoading(false);
         }
      };

      loadUsers();
   }, [
      currentPage,
      search,
      roleFilter,
      genderFilter,
      sortBy,
      order,
   ]);

   const handleAddUser = () => {
      setSelectedUser(null);
      setIsModalOpen(true);
   };

   const handleEditUser = (user: User) => {
      setSelectedUser(user);
      setIsModalOpen(true);
   };

   const handleDeleteUser = async (id: number) => {
      try {
         await deleteUser(id);
         setUsersData((prev) => prev.filter((user) => user.id !== id));
         setLocalUsers((prev) => prev.filter((user) => user.id !== id));
         setTotalRecords((prev) => Math.max(0, prev - 1));
         showToast({
            variant: "success",
            title: "Delete",
            content: "User deleted successfully.",
         });
      } catch {
         showToast({
            variant: "danger",
            title: "Delete",
            content: "Failed to delete user. Please try again.",
         });
      }
   };

   const handleSubmitUser = async (values: User) => {
      try {
         if (selectedUser) {
            setUsersData((prev) =>
               prev.map((user) =>
                  user.id === selectedUser.id
                     ? values
                     : user,
               ),
            );

            setLocalUsers((prev) =>
               prev.map((user) =>
                  user.id === selectedUser.id
                     ? values
                     : user,
               ),
            );
         } else {
            const response = await addUser(values);

            const newUser: User = {
               ...values,
               id: response.id || Date.now(),
            };

            setLocalUsers((prev) => [
               newUser,
               ...prev,
            ]);

            setTotalRecords((prev) => prev + 1);
         }
         setIsModalOpen(false);
         showToast({
            variant: "success",
            title: "Success",
            content: `User ${selectedUser ? "updated" : "added"} successfully.`,
         });
      } catch {
         showToast({
            variant: "danger",
            title: "Error",
            content: `Failed to ${selectedUser ? "update" : "add"} user. Please try again.`,
         });
      }
   };

   const mergedUsers = useMemo(() => {
      const apiIds = new Set(
         usersData.map((user) => user.id),
      );

      const filteredLocalUsers = localUsers.filter(
         (user) => !apiIds.has(user.id),
      );

      return [
         ...filteredLocalUsers,
         ...usersData,
      ];
   }, [localUsers, usersData]);

   const editFormValues =
      selectedUser || undefined;

   return (
       <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
           <div className="mx-auto w-full space-y-4">
               <UsersToolbar
                   users={mergedUsers}
                   search={search}
                   onSearch={setSearch}
                   roleFilter={roleFilter}
                   onRoleFilter={setRoleFilter}
                   genderFilter={genderFilter}
                   onGenderFilter={setGenderFilter}
                   sortBy={sortBy}
                   onSortBy={setSortBy}
                   order={order}
                   onOrder={setOrder}
                   onAddUser={handleAddUser}
                   clearFilters={clearFilters}
               />

               {loading ? (
                   <div className="rounded-2xl border border-slate-200 bg-white py-32 flex items-center justify-center">
                       <div className="flex flex-col items-center gap-3">
                           <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-slate-200 border-t-indigo-600" />

                           <p className="text-sm text-slate-400">
                               Loading users...
                           </p>
                       </div>
                   </div>
               ) : error ? (
                   <div className="rounded-2xl border border-red-200 bg-red-50 py-16 px-4 flex flex-col items-center text-center">
                       <p className="font-medium text-red-700">{error}</p>

                       <p className="mt-1 text-sm text-red-500">
                           Check your connection and try again
                       </p>
                   </div>
               ) : (
                   <>
                       <UserTable
                           users={mergedUsers}
                           onView={(id) => navigate(`/user/${id}`)}
                           currentPage={currentPage}
                           pageSize={PAGE_SIZE}
                           onEdit={handleEditUser}
                           onDelete={handleDeleteUser}
                       />

                       <div className="flex items-center justify-between px-1">
                           <Pagination
                               currentPage={currentPage}
                               totalRecords={totalRecords}
                               pageSize={PAGE_SIZE}
                               onPageChange={setCurrentPage}
                           />
                       </div>
                   </>
               )}

               <UserAddEditDialog
                   isOpen={isModalOpen}
                   onClose={() => setIsModalOpen(false)}
                   handleSubmit={handleSubmitUser}
                   defaultValues={editFormValues}
                   title={selectedUser ? "Edit User" : "Add User"}
               />
           </div>
       </div>
   );
};