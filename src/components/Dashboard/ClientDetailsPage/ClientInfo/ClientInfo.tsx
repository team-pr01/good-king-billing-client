import React from "react";

type ClientInfoProps = {
  client: {
    area: string;
    phoneNumber: string;
    shopName: string;
    clientName: string;
    address: string;
    gstNumber: string;
    email: string;
    registrationDate: string;
  };
};

const ClientInfo: React.FC<ClientInfoProps> = ({ client }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-3 border-b border-gray-200">
        Personal Information
      </h2>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Box 1 - Client Info */}
        <div className="border border-gray-200 rounded-lg p-6 flex-1">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Client Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-sm font-medium text-gray-500">Name</span>
              <p className="text-gray-800 font-medium">{client.clientName}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Email</span>
              <p className="text-gray-800 font-medium break-words">
                {client.email}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">
                Phone Number
              </span>
              <p className="text-gray-800 font-medium">{client.phoneNumber}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">
                Registered Date
              </span>
              <p className="text-gray-800 font-medium">
                {client.registrationDate}
              </p>
            </div>
          </div>
        </div>

        {/* Box 2 - Store Info */}
        <div className="border border-gray-200 rounded-lg p-6 flex-1">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Store Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <span className="text-sm font-medium text-gray-500">
                Store Name
              </span>
              <p className="text-gray-800 font-medium">{client.shopName}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Area</span>
              <p className="text-gray-800 font-medium">{client.area}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">
                GST Number
              </span>
              <p className="text-gray-800 font-medium break-words">
                {client.gstNumber}
              </p>
            </div>
          </div>
          <div className="sm:col-span-2 mt-4">
            <span className="text-sm font-medium text-gray-500">Address</span>
            <p className="text-gray-800 font-medium break-words">
              {client.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientInfo;
