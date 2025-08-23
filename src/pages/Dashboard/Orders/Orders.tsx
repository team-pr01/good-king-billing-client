/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaClipboardList, FaHourglassHalf, FaTruck } from "react-icons/fa";
import { useState } from "react";
import DashboardCard from "../../../components/Dashboard/DashboardCard/DashboardCard";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit, FiEye, FiPlus, FiTrash2 } from "react-icons/fi";
import Table from "../../../components/Reusable/Table/Table";

const Orders = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const columns = [
  { key: "orderId", label: "Order ID" },
  { key: "shopName", label: "Shop Name" },
  { key: "totalAmount", label: "Total Amount" },
  { key: "pendingAmount", label: "Pending Amount" },
  { key: "paidAmount", label: "Paid Amount" },
];

const orderData = [
  {
    id: 1,
    orderId: "ORD-1001",
    shopName: "Tech Mart",
    totalAmount: "₹1200",
    pendingAmount: "₹200",
    paidAmount: "₹1000",
  },
  {
    id: 2,
    orderId: "ORD-1002",
    shopName: "Gadget Hub",
    totalAmount: "₹800",
    pendingAmount: "₹0",
    paidAmount: "₹800",
  },
  {
    id: 3,
    orderId: "ORD-1003",
    shopName: "ShopSmart",
    totalAmount: "₹1500",
    pendingAmount: "₹500",
    paidAmount: "₹1000",
  },
];


  const actions = [
    {
      icon: <FiEye />,
      label: "View",
      onClick: (row: any) => navigate(`/admin/dashboard/order/${row.id}`),
    },
    {
      icon: <FiEdit />,
      label: "Edit",
      onClick: (row: any) => console.log("Edit", row),
    },
    {
      icon: <FiTrash2 />,
      label: "Delete",
      onClick: (row: any) => console.log("Delete", row),
      className: "text-red-600",
    },
  ];
  return (
    <div className="font-Nunito flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Orders */}
        <DashboardCard
          title="Total Orders"
          value={250}
          Icon={FaClipboardList}
          bgColor="bg-blue-500"
        />
        <DashboardCard
          title="Pending Orders"
          value={40}
          Icon={FaHourglassHalf}
          bgColor="bg-orange-500"
        />
        <DashboardCard
          title="Supplied Orders"
          value={210}
          Icon={FaTruck}
          bgColor="bg-green-500"
        />
      </div>

      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
          <p className="text-gray-600">Manage your orders</p>
        </div>

        <Link
          to="/admin/dashboard/create-order"
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center gap-2 transition-colors cursor-pointer"
        >
          <FiPlus className="w-5 h-5" />
          Create Order
        </Link>
      </div>

      {/* Search and Filters Container */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
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
                placeholder="Search orders..."
              />
            </div>
          </div>

          {/* Filters Container */}
          <div className="flex gap-3 flex-wrap items-center">
            {/* Status Filter Dropdown */}
            <div className="min-w-[150px]">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white cursor-pointer"
              >
                <option value="">Status</option>
                <option value="pending">Pending</option>
                <option value="supplied">Supplied</option>
              </select>
            </div>

            {/* Export Client List Button */}
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center gap-2 transition-colors cursor-pointer">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Export Order List
            </button>
          </div>
        </div>
      </div>

      <Table columns={columns} data={orderData} actions={actions} rowKey="id" />
    </div>
  );
};

export default Orders;
