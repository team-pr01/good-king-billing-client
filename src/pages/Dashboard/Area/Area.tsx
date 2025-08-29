/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FiEdit, FiMapPin, FiTrash2 } from "react-icons/fi";
import Table from "../../../components/Reusable/Table/Table";
import {
  useDeleteAreaMutation,
  useGetAllAreaQuery,
  useGetSingleAreaByIdQuery,
} from "../../../redux/Features/Area/areaApi";
import AddAreaModal from "../../../components/Dashboard/ClientPage/AddAreaModal/AddAreaModal";
import { toast } from "sonner";

const Area = () => {
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);
  const [modalType, setModalType] = useState<string | null>("add");
  const [searchValue, setSearchValue] = useState("");
  const [isAddAreaModalOpen, setIsAddAreaModalOpen] = useState<boolean>(false);
  const {
    data: allArea,
    isLoading: isAllAreaLoading,
    isFetching,
  } = useGetAllAreaQuery({ keyword: searchValue });
  const {
    data: singleAreaData,
    isLoading: isSingleAreaLoading,
    isFetching: isSingleAreaFetching,
  } = useGetSingleAreaByIdQuery(selectedAreaId);

  const [deleteArea, { isLoading: isDeleting }] = useDeleteAreaMutation();

  const columns = [
    { key: "_id", label: "ID" },
    { key: "state", label: "State" },
    { key: "district", label: "District" },
    { key: "city", label: "City" },
    { key: "area", label: "Area" },
  ];

  const handleDeleteArea = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this area?"
    );
    if (isDeleting) {
      toast.loading("Deleting Area...");
    }
    if (!confirmDelete) return;

    try {
      await deleteArea(id).unwrap();
      toast.success("Area deleted successfully!");
    } catch (error) {
      console.error("Failed to delete Area:", error);
      toast.error("Failed to delete the Area. Please try again.");
    }
  };

  const actions = [
    {
      icon: <FiEdit />,
      label: "Edit",
      onClick: (row: any) => {
        setSelectedAreaId(row?._id);
        setModalType("edit");
        setIsAddAreaModalOpen(true);
      },
    },
    {
      icon: <FiTrash2 />,
      label: "Delete",
      onClick: (row: any) => handleDeleteArea(row?._id),
      className: "text-red-600",
    },
  ];
  return (
    <div className="min-h-screen">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Area</h1>
        <p className="text-gray-600">Manage all area</p>
      </div>
      {/* Search and Filters Container */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 my-6">
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
                placeholder="Search area..."
              />
            </div>
          </div>

          <button
            onClick={() => setIsAddAreaModalOpen(true)}
            className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center gap-2 transition-colors cursor-pointer"
          >
            <FiMapPin className="w-5 h-5" />
            Add New Area
          </button>
        </div>
      </div>
      {/* Clients Table */}
      <Table
        columns={columns}
        data={allArea?.data}
        actions={actions}
        rowKey="_id"
        isLoading={isAllAreaLoading || isFetching}
      />
      {/* Add Area Modal */}
      <AddAreaModal
        isOpen={isAddAreaModalOpen}
        onClose={() => setIsAddAreaModalOpen(false)}
        defaultValues={singleAreaData?.data}
        isLoading={isSingleAreaFetching || isSingleAreaLoading}
        modalType={modalType}
      />
    </div>
  );
};

export default Area;
