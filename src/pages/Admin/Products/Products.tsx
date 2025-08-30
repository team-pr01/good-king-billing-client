/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import AddProductModal from "../../../components/Dashboard/ProductsPage/AddProductModal/AddProductModal";
import Table from "../../../components/Reusable/Table/Table";
import DashboardCard from "../../../components/Dashboard/DashboardCard/DashboardCard";
import { FaBox, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useGetSingleProductByIdQuery,
} from "../../../redux/Features/Product/productApi";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Products = () => {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [modalType, setModalType] = useState<string | null>("add");
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const {
    data: allProducts,
    isLoading,
    isFetching,
  } = useGetAllProductsQuery({ keyword: searchValue, status: statusFilter });
  const {
    data: singleProductData,
    isLoading: isSingleProductLoading,
    isFetching: isSingleProductFetching,
  } = useGetSingleProductByIdQuery(selectedProductId);
  const [deleteProduct] = useDeleteProductMutation();
  const [isAddProductModalOpen, setIsAddProductModalOpen] =
    useState<boolean>(false);

  const availableProducts = allProducts?.data?.filter(
    (product: any) => product.status === "available"
  );

  const unavailableProducts = allProducts?.data?.filter(
    (product: any) => product.status === "unavailable"
  );

  const handleDeleteProduct = async (productId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      await deleteProduct(productId).unwrap();
      toast.success("Product deleted successfully!");
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast.error("Failed to delete the product. Please try again.");
    }
  };

  const allProductsData =
  allProducts?.data?.map((product: any) => {
    const statusColor =
      product.availableStock > 0
        ? "bg-green-100 text-green-800"
        : "bg-red-100 text-red-800";

    return {
      _id: product._id,
      name: product.name,
      price: `₹${product.price}`,
      availableStock: product.availableStock,
      hsnCode: product.hsnCode,
      taxValue: product.taxValue,
      status: (
        <span
          className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${statusColor}`}
        >
          {product.availableStock > 0 ? "Available" : "Out of Stock"}
        </span>
      ),
    };
  }) || [];


  const productColumns = [
    { key: "_id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "price", label: "Price" },
    { key: "availableStock", label: "Available Stock" },
    { key: "hsnCode", label: "HSN Code" },
    { key: "taxValue", label: "Tax value" },
    { key: "status", label: "Status" },
  ];

  const productActions = [
    {
      icon: <FiEdit />,
      label: "Update",
      onClick: (row: any) => {
        setSelectedProductId(row?._id);
        setModalType("update");
        setIsAddProductModalOpen(true);
      },
    },
    {
      icon: <FiTrash2 />,
      label: "Delete",
      onClick: (row: any) => handleDeleteProduct(row?._id),
      className: "text-red-600",
    },
  ];

  const handleExportProducts = () => {
    if (!allProducts?.data || allProducts.length === 0) return;

    // Map product data dynamically based on productColumns
    const exportData = allProducts?.data?.map((product: any) => {
      const row: Record<string, any> = {};
      productColumns.forEach((col) => {
        row[col.label] = product[col.key] ?? ""; // use label as header, key as value source
      });
      return row;
    });

    // Convert to sheet
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

    // Generate and download Excel
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "products.xlsx");
  };
  return (
    <div className="font-Nunito flex flex-col gap-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Products */}
        <DashboardCard
          title="Total Products"
          value={allProducts?.data?.length || 0}
          Icon={FaBox}
          bgColor="bg-purple-500"
        />
        <DashboardCard
          title="Available Products"
          value={availableProducts?.length || 0}
          Icon={FaCheckCircle}
          bgColor="bg-green-500"
        />
        <DashboardCard
          title="Unavailable Products"
          value={unavailableProducts?.length || 0}
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
          onClick={() => {
            setSelectedProductId(null);
            setModalType("add");
            setIsAddProductModalOpen(true);
          }}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center gap-2 transition-colors cursor-pointer"
        >
          <FiPlus className="w-5 h-5" />
          Add Product
        </button>
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
                placeholder="Search products..."
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
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>

            {/* Export Client List Button */}
            <button
              onClick={handleExportProducts}
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
        columns={productColumns}
        data={allProductsData}
        actions={productActions}
        rowKey="_id"
        isLoading={isLoading || isFetching}
      />

      {/* Add Area Modal */}
      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        defaultValues={singleProductData?.data}
        isLoading={isSingleProductLoading || isSingleProductFetching}
        modalType={modalType}
      />
    </div>
  );
};

export default Products;
