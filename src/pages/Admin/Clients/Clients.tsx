import { useState } from "react";
import { FiMoreVertical, FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { FiPlus, FiMapPin } from "react-icons/fi";
import AddClientModal from "../../../components/Dashboard/ClientPage/AddClientModal/AddClientModal";

const Clients = () => {
  // State for search and filter values
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [areaFilter, setAreaFilter] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState<boolean>(false);

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

  // Sample client data
  const clientsData = [
    {
      id: 1,
      shopName: "Green Grocers",
      name: "John Smith",
      status: "paid",
      phoneNumber: "(555) 123-4567",
      amountDue: "$0.00",
      area: "North Area",
    },
    {
      id: 2,
      shopName: "Tech Haven",
      name: "Sarah Johnson",
      status: "pending",
      phoneNumber: "(555) 987-6543",
      amountDue: "$245.50",
      area: "South Area",
    },
    {
      id: 3,
      shopName: "Fashion Boutique",
      name: "Michael Brown",
      status: "paid",
      phoneNumber: "(555) 456-7890",
      amountDue: "$0.00",
      area: "East Area",
    },
    {
      id: 4,
      shopName: "Home Essentials",
      name: "Emily Davis",
      status: "pending",
      phoneNumber: "(555) 234-5678",
      amountDue: "$189.99",
      area: "West Area",
    },
  ];

  // Toggle menu visibility
  const toggleMenu = (id: string) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  // Close menu when clicking outside
  const closeMenu = () => {
    setOpenMenuId(null);
  };

  // Handle menu actions
  const handleViewDetails = () => {
    console.log("View details:");
    closeMenu();
  };

  const handleEdit = () => {
    console.log("Edit:");
    closeMenu();
  };

  const handleDelete = () => {
    console.log("Delete:");
    closeMenu();
  };

  // Filter clients based on search and filter values
  const filteredClients = clientsData.filter((client) => {
    const matchesSearch =
      client.shopName.toLowerCase().includes(searchValue.toLowerCase()) ||
      client.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      client.phoneNumber.includes(searchValue);

    const matchesStatus = statusFilter === "" || client.status === statusFilter;
    const matchesArea =
      areaFilter === "" ||
      client.area.toLowerCase().replace(" ", "-") === areaFilter;

    return matchesSearch && matchesStatus && matchesArea;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Clients</h1>
          <p className="text-gray-600">Manage your client list</p>
        </div>

        <div className="flex gap-3">
          {/* Add New Area Button */}
          <button className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center gap-2 transition-colors cursor-pointer">
            <FiMapPin className="w-5 h-5" />
            Add New Area
          </button>

          {/* Add New Client Button */}
          <button onClick={() => setIsAddClientModalOpen(true)} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center gap-2 transition-colors cursor-pointer">
            <FiPlus className="w-5 h-5" />
            Add New Client
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
            <div className="min-w-[150px]">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white cursor-pointer"
              >
                <option value="">All Statuses</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
              </select>
            </div>

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
              onClick={() => {
                // Handle export functionality here
                console.log("Exporting client list:", filteredClients);
              }}
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
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Shop Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Phone Number
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Amount Due
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Area
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {client.shopName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {client.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          client.status === "paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {client.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {client.phoneNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {client.amountDue}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {client.area}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium relative">
                      <button
                        onClick={() => toggleMenu(String(client.id))}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none p-1 rounded hover:bg-gray-100 cursor-pointer"
                      >
                        <FiMoreVertical className="h-5 w-5" />
                      </button>

                      {/* Dropdown Menu */}
                      {openMenuId === String(client.id) && (
                        <div className="absolute right-0 z-10 mt-1 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200">
                          <button
                            onClick={() => handleViewDetails()}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left cursor-pointer"
                          >
                            <FiEye className="mr-3 h-4 w-4 text-gray-500" />
                            View Details
                          </button>
                          <button
                            onClick={() => handleEdit()}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left cursor-pointer"
                          >
                            <FiEdit className="mr-3 h-4 w-4 text-gray-500" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete()}
                            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left cursor-pointer"
                          >
                            <FiTrash2 className="mr-3 h-4 w-4 text-red-500" />
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">
                    No clients found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Overlay to close menu when clicking outside */}
      {openMenuId && (
        <div
          className="fixed inset-0 z-0"
          onClick={closeMenu}
          style={{ zIndex: 5 }}
        />
      )}


      {/* Add Client Modal */}
      <AddClientModal
        isOpen={isAddClientModalOpen}
        onClose={() => setIsAddClientModalOpen(false)}
        areas={areas}
      />
    </div>
  );
};

export default Clients;
