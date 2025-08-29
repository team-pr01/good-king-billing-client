/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FaMoneyBillWave,
  FaCreditCard,
  FaShoppingCart,
  FaClock,
  FaTruck,
} from "react-icons/fa";
import { FiDownload, FiEye, FiPlus } from "react-icons/fi";
import ClientInfo from "../../../../components/Dashboard/ClientDetailsPage/ClientInfo/ClientInfo";
import DashboardCard from "../../../../components/Dashboard/DashboardCard/DashboardCard";
import Table from "../../../../components/Reusable/Table/Table";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetSingleClientByIdQuery } from "../../../../redux/Features/Client/clientApi";
import { useGetOrdersByShopIdQuery } from "../../../../redux/Features/Order/orderApi";
import Loader from "../../../../components/Reusable/Loader/Loader";
import { useState } from "react";

const ClientDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading } = useGetSingleClientByIdQuery(id);

  const { data: orderData, isLoading: orderLoading } =
    useGetOrdersByShopIdQuery(data?.data?._id, {
      skip: !data?.data?._id,
    });
  console.log(orderData);

  // Total due and paid amount
  const totals = orderData?.data?.reduce(
    (acc: { paid: number; due: number }, order: any) => {
      acc.paid += order.paidAmount || 0;
      acc.due += order.pendingAmount || 0;
      return acc;
    },
    { paid: 0, due: 0 }
  );

  const totalPendingOrders = orderData?.data?.filter(
    (order: any) => order.status === "pending"
  );
  const totalSuppliedOrders = orderData?.data?.filter(
    (order: any) => order.status === "supplied"
  );

  const [statusFilter, setStatusFilter] = useState("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("");

  const clientOrders =
    orderData?.data?.map((order: any) => ({
      _id: order._id,
      totalPayment: `₹${order.totalAmount}`,
      duePayment: `₹${order.pendingAmount}`,
      paymentStatus: order.pendingAmount > 0 ? "due" : "paid",
      deliveryStatus: order.status || "pending",
      createdAt: new Date(order.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    })) || [];

  // Filtered Orders based on statusFilter and paymentStatusFilter
  const filteredOrders = clientOrders.filter((order: any) => {
    const matchesStatus = statusFilter
      ? order.deliveryStatus.toLowerCase() === statusFilter.toLowerCase()
      : true;
    const matchesPayment = paymentStatusFilter
      ? order.paymentStatus.toLowerCase() === paymentStatusFilter.toLowerCase()
      : true;

    return matchesStatus && matchesPayment;
  });

  const orderColumns = [
    { key: "_id", label: "Order ID" },
    { key: "totalPayment", label: "Total Payment" },
    { key: "duePayment", label: "Due Payment" },
    { key: "paymentStatus", label: "Payment Status" },
    { key: "deliveryStatus", label: "Delivery Status" },
    { key: "createdAt", label: "Order Date" },
  ];

  const orderActions = [
    {
      icon: <FiDownload />,
      label: "Download Invoice",
      onClick: (row: any) => console.log("Download invoice for:", row.orderId),
    },
    {
      icon: <FiEye />,
      label: "View Details",
      onClick: (row: any) => navigate(`/admin/dashboard/order/${row._id}`),
    },
  ];

  return isLoading || orderLoading ? (
    <Loader />
  ) : (
    <div className=" min-h-screen font-Nunito flex flex-col gap-6">
      {/* Data Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <DashboardCard
          title="Paid Amount"
          value={`₹${totals?.paid.toFixed(2)}`}
          Icon={FaMoneyBillWave}
          bgColor="bg-green-500"
        />
        <DashboardCard
          title="Due Amount"
          value={`₹${totals?.due.toFixed(2)}`}
          Icon={FaCreditCard}
          bgColor="bg-yellow-500"
        />
        <DashboardCard
          title="Total Orders"
          value={orderData?.data?.length || 0}
          Icon={FaShoppingCart}
          bgColor="bg-purple-500"
        />
        <DashboardCard
          title="Pending Orders"
          value={totalPendingOrders?.length || 0}
          Icon={FaClock}
          bgColor="bg-red-500"
        />
        <DashboardCard
          title="Supplied Orders"
          value={totalSuppliedOrders?.length || 0}
          Icon={FaTruck}
          bgColor="bg-blue-500"
        />
      </div>
      {/* Header */}
      <div className="flex justify-between items-start mt-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Client Information
          </h1>
          <p className="text-gray-600">
            View and manage client information and orders.
          </p>
        </div>

        {/* Create order Button */}
        <Link
          to="/admin/dashboard/create-order"
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center gap-2 transition-colors cursor-pointer"
        >
          <FiPlus className="w-5 h-5" />
          Create Order
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col gap-8">
        {/* Clients Table */}
        <ClientInfo client={data?.data} />

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 ">All Orders</h2>
            {/* Filters Container */}
            <div className="flex gap-3 flex-wrap items-center">
              {/* Status Filter Dropdown */}
              <div className="min-w-[150px]">
                <select
                  value={paymentStatusFilter}
                  onChange={(e) => setPaymentStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white cursor-pointer"
                >
                  <option value="">Select Payment Status</option>
                  <option value="paid">Paid</option>
                  <option value="due">Due</option>
                </select>
              </div>
              {/* Delivery Status Filter Dropdown */}
              <div className="min-w-[150px]">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white cursor-pointer"
                >
                  <option value="">Select Delivery Status</option>
                  <option value="pending">Pending</option>
                  <option value="supplied">Supplied</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
          <Table
            columns={orderColumns}
            data={filteredOrders}
            actions={orderActions}
            rowKey="_id"
            isLoading={orderLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
