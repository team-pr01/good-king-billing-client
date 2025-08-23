/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import AddProductModal from "../../../components/Dashboard/ProductsPage/AddProductModal/AddProductModal";
import Table from "../../../components/Reusable/Table/Table";
import DashboardCard from "../../../components/Dashboard/DashboardCard/DashboardCard";
import {
  FaBox,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const Products = () => {
    const [searchValue, setSearchValue] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
  const [isAddProductModalOpen, setIsAddProductModalOpen] =
    useState<boolean>(false);

  const products = [
    { id: "1", name: "Cricket Bat", price: "₹1,500", stock: 25, status: "Available" },
    { id: "2", name: "Tennis Ball", price: "₹150", stock: 100, status: "Available" },
    { id: "3", name: "Football", price: "₹1,200", stock: 0, status: "Unavailable" },
  ];

  const productColumns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "price", label: "Price" },
    { key: "stock", label: "Available Stock" },
    { key: "status", label: "Status" },
  ];

  const productActions = [
    {
      icon: <FiEdit />,
      label: "Update",
      onClick: (row: any) => console.log("Update product:", row),
    },
    {
      icon: <FiTrash2 />,
      label: "Delete",
      onClick: (row: any) => console.log("Delete product:", row),
      className: "text-red-600",
    },
  ];
  return (
    <div className="font-Nunito flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Products */}
        <DashboardCard
          title="Total Products"
          value={150}
          Icon={FaBox}
          bgColor="bg-purple-500"
        />
        <DashboardCard
          title="Available Products"
          value={120}
          Icon={FaCheckCircle}
          bgColor="bg-green-500"
        />
        <DashboardCard
          title="Unavailable Products"
          value={30}
          Icon={FaTimesCircle}
          bgColor="bg-yellow-500"
        />
      </div>

      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Products</h1>
          <p className="text-gray-600">Manage your products</p>
        </div>

        <button
          onClick={() => setIsAddProductModalOpen(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center gap-2 transition-colors cursor-pointer"
        >
          <FiPlus className="w-5 h-5" />
          Add Product
        </button>
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
                placeholder="Search clients..."
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
                <option value="active">Available</option>
                <option value="inactive">Unavailable</option>
              </select>
            </div>

            {/* Export Client List Button */}
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center gap-2 transition-colors cursor-pointer"
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
              Export Product List
            </button>
          </div>
        </div>
      </div>
      <Table
        columns={productColumns}
        data={products}
        actions={productActions}
        rowKey="id"
      />

      {/* Add Area Modal */}
      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
      />
    </div>
  );
};

export default Products;
