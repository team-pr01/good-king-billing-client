/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FiEye, FiEdit } from "react-icons/fi";
import { FiPlus, FiMapPin } from "react-icons/fi";
import AddClientModal from "../../../components/Dashboard/ClientPage/AddClientModal/AddClientModal";
import AddAreaModal from "../../../components/Dashboard/ClientPage/AddAreaModal/AddAreaModal";
import Table from "../../../components/Reusable/Table/Table";
import {
  useGetAllClientsQuery,
  useGetSingleClientByIdQuery,
} from "../../../redux/Features/Client/clientApi";
import { Link, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Clients = () => {
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [areaFilter, setAreaFilter] = useState("");
  const { data, isLoading, isFetching } = useGetAllClientsQuery({
    keyword: searchValue,
    area: areaFilter,
  });
  const {
    data: singleClientData,
    isLoading: isSingleClientLoading,
    isFetching: isSingleClientFetching,
  } = useGetSingleClientByIdQuery(selectedClientId);
  const [isAddClientModalOpen, setIsAddClientModalOpen] =
    useState<boolean>(false);
  const [modalType, setModalType] = useState<string | null>("add");
  const [isAddAreaModalOpen, setIsAddAreaModalOpen] = useState<boolean>(false);

  // Sample areas data
  const areas = [
    "North Area",
    "South Area",
    "East Area",
    "West Area",
    "Central Area",
    "Downtown",
    "Uptown",
    "Suburbs",
  ];
  const columns = [
    { key: "_id", label: "ID" },
    { key: "shopName", label: "Shop Name" },
    { key: "name", label: "Name" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "email", label: "Email" },
    { key: "state", label: "State" },
    { key: "city", label: "City" },
    { key: "area", label: "Area" },
  ];

  const actions = [
    {
      icon: <FiEye />,
      label: "View",
      onClick: (row: any) => navigate(`/admin/dashboard/client/${row._id}`),
    },
    {
      icon: <FiEdit />,
      label: "Edit",
      onClick: (row: any) => {
        setSelectedClientId(row?._id);
        setModalType("edit");
        setIsAddClientModalOpen(true);
      },
    },
    // {
    //   icon: <FiTrash2 />,
    //   label: "Delete",
    //   onClick: (row: any) => console.log("Delete", row),
    //   className: "text-red-600",
    // },
  ];

  const handleExportClients = () => {
    if (!data?.data || data.data.length === 0) return;

    // Map client data to match your columns
    const exportData = data?.data?.map((client: any) => ({
      ID: client._id,
      "Shop Name": client.shopName,
      Name: client.name,
      "Phone Number": client.phoneNumber,
      Email: client.email,
      State: client.state,
      City: client.city,
      Area: client.area,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Clients");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "clients.xlsx");
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Clients</h1>
          <p className="text-gray-600">Manage your client list</p>
        </div>

        <div className="flex flex-col md:flex-row w-full md:w-fit gap-3">
          {/* Add New Area Button */}
          <Link
            to="/admin/dashboard/area"
            className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 flex justify-center items-center gap-2 transition-colors cursor-pointer w-full md:w-fit text-center"
          >
            <FiMapPin className="w-5 h-5" />
            View Areas
          </Link>
          <button
            onClick={() => setIsAddAreaModalOpen(true)}
            className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center gap-2 transition-colors cursor-pointer w-full md:w-fit justify-center"
          >
            <FiMapPin className="w-5 h-5" />
            Add Area
          </button>

          {/* Add New Client Button */}
          <button
            onClick={() => {
              setIsAddClientModalOpen(true);
              setModalType("add");
            }}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 gap-2 transition-colors cursor-pointer w-full md:w-fit flex items-center justify-center"
          >
            <FiPlus className="w-5 h-5" />
            Add Client
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
                placeholder="Search clients..."
              />
            </div>
          </div>

          {/* Filters Container */}
          <div className="flex gap-3 flex-wrap items-center">
            {/* Status Filter Dropdown */}
            {/* <div className="min-w-[150px]">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white cursor-pointer"
              >
                <option value="">Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div> */}

            {/* Areas Filter Dropdown */}
            <div className="min-w-[150px]">
              <select
                value={areaFilter}
                onChange={(e) => setAreaFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white cursor-pointer"
              >
                <option value="">All Areas</option>
                {areas.map((area, index) => (
                  <option
                    key={index}
                    value={area.toLowerCase().replace(" ", "-")}
                  >
                    {area}
                  </option>
                ))}
              </select>
            </div>

            {/* Remove Filters Button */}
            <button
              onClick={() => {
                setStatusFilter("");
                setAreaFilter("");
                setSearchValue("");
              }}
              disabled={!statusFilter && !areaFilter && !searchValue}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Remove Filters
            </button>

            {/* Export Client List Button */}
            <button
              onClick={handleExportClients}
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
              Export Client List
            </button>
          </div>
        </div>
      </div>
      {/* Clients Table */}
      <Table
        columns={columns}
        data={data?.data}
        actions={actions}
        rowKey="_id"
        isLoading={isLoading || isFetching}
      />
      {/* Add Client Modal */}
      <AddClientModal
        isOpen={isAddClientModalOpen}
        onClose={() => setIsAddClientModalOpen(false)}
        defaultValues={singleClientData?.data}
        modalType={modalType}
        isLoading={isSingleClientFetching || isSingleClientLoading}
      />
      {/* Add Area Modal */}
      <AddAreaModal
        isOpen={isAddAreaModalOpen}
        onClose={() => setIsAddAreaModalOpen(false)}
      />
    </div>
  );
};

export default Clients;
