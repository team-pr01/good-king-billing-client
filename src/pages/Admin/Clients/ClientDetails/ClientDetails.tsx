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
import { Link } from "react-router-dom";

const ClientDetails = () => {
  const clientData = {
    area: "Downtown",
    phoneNumber: "+1-555-123-4567",
    shopName: "Tech Gadgets Store",
    clientName: "Ethan Harper",
    address: "123 Main Street, Anytown, USA",
    gstNumber: "GST123456789",
    email: "ethan.harper@example.com",
    registrationDate: "2023-01-15",
  };

  const clientOrders = [
    {
      id: "1",
      orderId: "ORD001",
      totalPayment: "₹5,000",
      duePayment: "₹1,000",
      paymentStatus: "paid",
      deliveryStatus: "delivered",
    },
    {
      id: "2",
      orderId: "ORD002",
      totalPayment: "₹3,500",
      duePayment: "₹500",
      paymentStatus: "due",
      deliveryStatus: "pending",
    },
  ];

  const orderColumns = [
    { key: "orderId", label: "Order ID" },
    { key: "totalPayment", label: "Total Payment" },
    { key: "duePayment", label: "Due Payment" },
    { key: "paymentStatus", label: "Payment Status" },
    { key: "deliveryStatus", label: "Delivery Status" },
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
      onClick: (row: any) => console.log("View details for:", row.orderId),
    },
  ];
  return (
    <div className=" min-h-screen font-Nunito flex flex-col gap-6">
      {/* Data Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <DashboardCard
          title="Paid Amount"
          value="₹4,250.00"
          Icon={FaMoneyBillWave}
          bgColor="bg-green-500"
        />
        <DashboardCard
          title="Due Amount"
          value="₹1,875.50"
          Icon={FaCreditCard}
          bgColor="bg-yellow-500"
        />
        <DashboardCard
          title="Total Orders"
          value={47}
          Icon={FaShoppingCart}
          bgColor="bg-purple-500"
        />
        <DashboardCard
          title="Pending Orders"
          value={12}
          Icon={FaClock}
          bgColor="bg-red-500"
        />
        <DashboardCard
          title="Supplied Orders"
          value={35}
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
        <ClientInfo client={clientData} />

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            All Orders
          </h2>
          <Table
            columns={orderColumns}
            data={clientOrders}
            actions={orderActions}
            rowKey="id"
          />
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
