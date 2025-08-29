/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  FiCheckCircle,
  FiEye,
  FiPlus,
  FiTrash2,
  FiXCircle,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../../redux/Features/Order/orderApi";
import { toast } from "sonner";
import Table from "../../../components/Reusable/Table/Table";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const OrdersTable = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const { data, isLoading } = useGetAllOrdersQuery({
    keyword: searchValue,
    status: statusFilter,
  });

  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();

  const handleDeleteOrder = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (isDeleting) {
      toast.loading("Deleting Order...");
    }
    if (!confirmDelete) return;

    try {
      await deleteOrder(id).unwrap();
      toast.success("Order deleted successfully!");
    } catch (error) {
      console.error("Failed to delete Order:", error);
      toast.error("Failed to delete the Order. Please try again.");
    }
  };

  const columns = [
    { key: "_id", label: "Order ID" },
    { key: "shopName", label: "Shop Name" },
    { key: "totalAmount", label: "Total Amount" },
    { key: "pendingAmount", label: "Pending Amount" },
    { key: "paidAmount", label: "Paid Amount" },
    { key: "status", label: "Delivery Status" },
    { key: "createdAt", label: "Date" },
  ];

  const allOrders =
  data?.data?.map((order: any) => {
    // Determine tag color based on status
    let statusColor = "bg-yellow-100 text-yellow-800"; // default pending
    if (order.status === "supplied") statusColor = "bg-green-100 text-green-800";
    if (order.status === "cancelled") statusColor = "bg-red-100 text-red-800";

    return {
      _id: order._id,
      shopName: order.shopName,
      totalAmount: `₹${order.totalAmount}`,
      pendingAmount: `₹${order.pendingAmount}`,
      paidAmount: `₹${order.totalAmount - order.pendingAmount}`,
      // Return JSX for status tag
      status: (
        <span
          className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${statusColor}`}
        >
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      ),
      createdAt: new Date(order.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
  }) || [];


  const [updateOrderStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();

  const handleUpdateOrderStatus = async (status: string, id: string) => {
    if (isUpdating) {
      toast.loading("Updating order status...");
    }
    try {
      // Show loading toast

      const payload = { status };
      await updateOrderStatus({ id, data: payload }).unwrap();

      // Update toast to success
      toast.success("Order updated successfully!");
    } catch (error) {
      console.error("Failed to update Order:", error);
      // Update toast to error
      toast.error("Failed to update the Order. Please try again.");
    }
  };

  const actions = [
    {
      icon: <FiEye />,
      label: "View",
      onClick: (row: any) => navigate(`/admin/dashboard/order/${row._id}`),
    },
    {
      icon: <FiCheckCircle />,
      label: "Supplied",
      onClick: (row: any) => handleUpdateOrderStatus("supplied", row?._id),
      className: "text-green-600",
    },
    {
      icon: <FiXCircle />,
      label: "Cancelled",
      onClick: (row: any) => handleUpdateOrderStatus("cancelled", row?._id),
      className: "text-red-600",
    },
    {
      icon: <FiTrash2 />,
      label: "Delete",
      onClick: (row: any) => handleDeleteOrder(row._id),
      className: "text-red-600",
    },
  ];

  const handleExport = () => {
    if (!allOrders || allOrders.length === 0) return;

    // map data to match columns labels
    const exportData = allOrders.map((order: any) => ({
      "Order ID": order._id,
      "Shop Name": order.shopName,
      "Total Amount": order.totalAmount,
      "Pending Amount": order.pendingAmount,
      "Paid Amount": order.paidAmount,
      "Delivery Status": order.status,
      Date: order.createdAt,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "orders.xlsx");
  };
  return (
    <div className="flex flex-col gap-4 mt-5">
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
          <div className="flex gap-3 flex-row items-center">
            {/* Status Filter Dropdown */}
            <div className="min-w-[150px]">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white cursor-pointer"
              >
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="supplied">Supplied</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Export Client List Button */}
            <button
              onClick={handleExport}
              className="px-2 md:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center gap-2 transition-colors cursor-pointer"
            >
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
              Export Data
            </button>
          </div>
        </div>
      </div>

      <Table
        columns={columns}
        data={allOrders}
        actions={actions}
        rowKey="_id"
        isLoading={isLoading}
      />
    </div>
  );
};

export default OrdersTable;
