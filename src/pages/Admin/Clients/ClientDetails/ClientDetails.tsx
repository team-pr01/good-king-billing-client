import {
  FaMoneyBillWave,
  FaCreditCard,
  FaShoppingCart,
  FaClock,
  FaTruck,
} from "react-icons/fa";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import ClientInfo from "../../../../components/Dashboard/ClientDetailsPage/ClientInfo/ClientInfo";
import DashboardCard from "../../../../components/Dashboard/DashboardCard/DashboardCard";

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
  const [isCreateOrderModalOpen, setIsCreateOrderModalOpen] =
    useState<boolean>(false);
  return (
    <div className="p-6 bg-gray-50 min-h-screen font-Nunito flex flex-col gap-6">
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
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Client Information
          </h1>
          <p className="text-gray-600">
            View and manage client information and orders.
          </p>
        </div>

        {/* Create order Button */}
        <button
          onClick={() => setIsCreateOrderModalOpen(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center gap-2 transition-colors cursor-pointer"
        >
          <FiPlus className="w-5 h-5" />
          Create Order
        </button>
      </div>

      {/* Clients Table */}
      <ClientInfo client={clientData} />
    </div>
  );
};

export default ClientDetails;
