/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FaMoneyBillWave,
  FaCreditCard,
  FaShoppingCart,
  FaClock,
  FaTruck,
} from "react-icons/fa";
import {
  FiCheckCircle,
  FiDownload,
  FiEye,
  FiPlus,
  FiXCircle,
} from "react-icons/fi";
import ClientInfo from "../../../../components/Dashboard/ClientDetailsPage/ClientInfo/ClientInfo";
import DashboardCard from "../../../../components/Dashboard/DashboardCard/DashboardCard";
import Table from "../../../../components/Reusable/Table/Table";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetSingleClientByIdQuery } from "../../../../redux/Features/Client/clientApi";
import {
  useGetOrdersByShopIdQuery,
  useGetSingleOrderByIdQuery,
  useUpdateOrderStatusMutation,
} from "../../../../redux/Features/Order/orderApi";
import Loader from "../../../../components/Reusable/Loader/Loader";
import { useEffect, useState } from "react";
import { pdf } from "@react-pdf/renderer";
// import Invoice from "../../../../components/Dashboard/Invoice/Invoice";
import { toast } from "sonner";
import { MdOutlineFileDownload } from "react-icons/md";
import TwoInvoice from "../../../../components/Dashboard/Invoice/TwoInvoices";
const ClientDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const { data: singleOrder, isLoading: isSingleOrderLoading } =
    useGetSingleOrderByIdQuery(selectedOrderId!, {
      skip: !selectedOrderId,
    });

  // When API finishes, trigger download
  useEffect(() => {
    if (!isSingleOrderLoading && singleOrder?.data) {
      handleDownload(singleOrder.data);
    }
  }, [isSingleOrderLoading, singleOrder]);

  // For download invoice
  const handleDownload = async (order: any) => {
    const totalAmount = order.products.reduce(
      (sum: number, item: any) =>
        sum + (item.price + item.taxValue) * item.quantity,
      0
    );

    const invoiceData = {
      invoiceNumber: order.orderId,
      date: new Date(order.createdAt).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      customerName: order.shopId?.name,
      businessEmail: order.shopId?.email,
      businessPhone: order.shopId?.phoneNumber,
      businessAddress: `${order.shopId?.city}, ${order.shopId?.area}, ${order.shopId?.district}, ${order.shopId?.state}, ${order.shopId?.pinCode}`,
      businessName: order.shopId?.shopName,
      items: order.products,
      status: order.pendingAmount > 0 ? "Due" : "Paid",
      dueAmount: order.pendingAmount,
      previousOrderId: order.previousOrderId,
      subtotal: totalAmount,
       coveredDueAmount: order?.coveredDueAmount  === 0 || order?.coveredDueAmount === undefined ? order?.previousDue : order?.coveredDueAmount,
      paidAmount: order?.paidAmount,
    };

    // Generate PDF
    const blob = await pdf(<TwoInvoice data={invoiceData} />).toBlob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `invoice_${invoiceData.invoiceNumber}.pdf`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const { data, isLoading } = useGetSingleClientByIdQuery(id);

  const { data: orderData, isLoading: orderLoading } =
    useGetOrdersByShopIdQuery(data?.data?._id, {
      skip: !data?.data?._id,
    });

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
  orderData?.data
    ?.slice() // copy to avoid mutating original
    ?.sort(
      (a: any, b: any) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    ?.map((order: any) => {
      // Payment status color
      const paymentColor =
        order.pendingAmount > 0
          ? "bg-yellow-100 text-yellow-800" // due
          : "bg-green-100 text-green-800"; // paid

      // Delivery status color
      let deliveryColor = "bg-yellow-100 text-yellow-800"; // pending
      if (order.status === "supplied")
        deliveryColor = "bg-green-100 text-green-800";
      if (order.status === "cancelled")
        deliveryColor = "bg-red-100 text-red-800";

      return {
        rowId: order._id,
        _id: (
          <Link
            to={`/admin/dashboard/order/${order._id}`}
            className="text-blue-600 hover:underline"
          >
            {order.orderId}
            {order?.paymentMethod ? `-${order.paymentMethod}` : ""}
          </Link>
        ),
        totalPayment: `₹${order.totalAmount}`,
        duePayment: `₹${order.pendingAmount}`,
        paymentStatus: (
          <span
            className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${paymentColor}`}
          >
            {order.pendingAmount > 0 ? "Due" : "Paid"}
          </span>
        ),
        deliveryStatus: (
          <span
            className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${deliveryColor}`}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1) ||
              "Pending"}
          </span>
        ),
        paymentMethod: order.paymentMethod,
        updatedAt: new Date(order.updatedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        }),
        download: (
          <button
            onClick={() => setSelectedOrderId(order._id)}
            className="text-blue-600 hover:underline flex items-center gap-1 text-2xl cursor-pointer text-center w-full justify-center"
          >
            <MdOutlineFileDownload />
          </button>
        ),
      };
    }) || [];



  // Filtered Orders
  const filteredOrders = clientOrders.reverse().filter((order: any) => {
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
    { key: "paymentMethod", label: "Payment Method" },
    { key: "updatedAt", label: "Date" },
     { key: "download", label: "PDF Bill" },
  ];

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
      toast.success("Order updated successfully!");
    } catch (error) {
      console.error("Failed to update Order:", error);
      // Update toast to error
      toast.error("Failed to update the Order. Please try again.");
    }
  };

  const orderActions = [
    {
      icon: <FiDownload />,
      label: isSingleOrderLoading ? "Downloading..." : "Download Invoice",
      onClick: (row: any) => {
        setSelectedOrderId(row.rowId);
      },
    },
    {
      icon: <FiEye />,
      label: "View Details",
      onClick: (row: any) => navigate(`/admin/dashboard/order/${row.rowId}`),
    },
    {
      icon: <FiCheckCircle />,
      label: "Supplied",
      onClick: (row: any) => handleUpdateOrderStatus("supplied", row?.rowId),
      className: "text-green-600",
    },
    {
      icon: <FiXCircle />,
      label: "Cancelled",
      onClick: (row: any) => handleUpdateOrderStatus("cancelled", row?.rowId),
      className: "text-red-600",
    },
  ];

  return isLoading || orderLoading ? (
    <Loader />
  ) : (
    <div className=" min-h-screen font-Nunito flex flex-col gap-6">
      {/* Data Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
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
      <div className="flex flex-col md:flex-row gap-3 md:gap-0 justify-between items-start mt-4">
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

      <div className="bg-transparent md:bg-white rounded-lg shadow-none md:shadow-sm border-none md:border border-gray-200 p-0 md:p-6 flex flex-col gap-8">
        {/* Clients Table */}
        <ClientInfo client={data?.data} />

        <div>
          <div className="flex flex-col md:flex-row gap-3 md:gap-0 items-center md:items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 ">All Orders</h2>
            {/* Filters Container */}
            <div className="flex gap-3 flex-wrap items-center">
              {/* Status Filter Dropdown */}
              <div className="min-w-[150px] w-full md:w-fit">
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
              <div className="min-w-[150px] w-full md:w-fit">
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
            rowKey="rowId"
            isLoading={orderLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
