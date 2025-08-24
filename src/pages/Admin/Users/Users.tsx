/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FiDownload } from "react-icons/fi";
import Table from "../../../components/Reusable/Table/Table";
import { FiUserPlus, FiUserCheck } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import AddUserModal from "../../../components/Dashboard/UsersPage/AddUserModal/AddUserModal";
import { useGetAllUsersQuery } from "../../../redux/Features/Auth/authApi";

const Users = () => {
  const [roleFilter, setRoleFilter] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const {data} = useGetAllUsersQuery({keyword : searchValue, role : roleFilter});
  console.log(data);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState<boolean>(false);

  // Sample user data
  const usersData = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      role: "Admin",
      phoneNumber: "(555) 123-4567",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      role: "Salesperson",
      phoneNumber: "(555) 987-6543",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      role: "Supplier",
      phoneNumber: "(555) 456-7890",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      role: "Client",
      phoneNumber: "(555) 234-5678",
    },
  ];

  // Table columns
  const userColumns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "phoneNumber", label: "Phone Number" },
  ];

  // Actions (only Delete for users)
  const userActions = [
    {
      icon: <FiTrash2 />,
      label: "Delete",
      onClick: (row: any) => console.log("Delete User", row),
      className: "text-red-600",
    },
  ];
  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Users</h1>
          <p className="text-gray-600">
            Manage all users (clients, salespeople, suppliers)
          </p>
        </div>

        <div className="flex gap-3">
          {/* Add New Supplier Button */}
          <button onClick={() => setIsAddUserModalOpen(true)} className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center gap-2 transition-colors cursor-pointer">
            <FiUserPlus className="w-5 h-5" />
            Add New Supplier
          </button>

          {/* Add New Salesperson Button */}
          <button onClick={() => setIsAddUserModalOpen(true)} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center gap-2 transition-colors cursor-pointer">
            <FiUserCheck className="w-5 h-5" />
            Add New Salesperson
          </button>
        </div>
      </div>
      {/* Search and Filters Container */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex justify-between items-center gap-4 flex-wrap">
          {/* Search Bar */}
          <div className="flex-grow max-w-md">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 transition duration-300"
                placeholder="Search users..."
              />
            </div>
          </div>

          {/* Filters Container */}
          <div className="flex gap-3 flex-wrap items-center">
            {/* Status Filter Dropdown */}
            <div className="min-w-[150px]">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white cursor-pointer"
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="salesperson">Salesperson</option>
                <option value="supplier">Supplier</option>
                <option value="client">Client</option>
              </select>
            </div>

            {/* Remove Filters Button */}
            <button
              onClick={() => {
                setSearchValue("");
                setRoleFilter("");
              }}
              disabled={!roleFilter && !searchValue}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Remove Filters
            </button>

            {/* Export Client List Button */}
            <button
              onClick={() => {
                // Handle export functionality here
                console.log("Exporting client list:", usersData);
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center gap-2 transition-colors cursor-pointer"
            >
              <FiDownload className="w-4 h-4" />
              Export User List
            </button>
          </div>
        </div>
      </div>
      {/* Clients Table */}
      <Table
        columns={userColumns}
        data={usersData}
        actions={userActions}
        rowKey="id"
      />

      {/* Add Area Modal */}
      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
      />
    </div>
  );
};

export default Users;
