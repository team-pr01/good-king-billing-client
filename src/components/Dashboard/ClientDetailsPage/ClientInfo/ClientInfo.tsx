import React from 'react';

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
    <div >
      <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-3 border-b border-gray-200">
        Personal Information
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Area & Phone Number */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-medium text-gray-500">Area</span>
              <span className="text-sm font-medium text-gray-500">Phone Number</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-800 font-medium">{client.area}</span>
              <span className="text-gray-800 font-medium">{client.phoneNumber}</span>
            </div>
          </div>

          {/* Store Name & Client Name */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-medium text-gray-500">Store Name</span>
              <span className="text-sm font-medium text-gray-500">Client Name</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-800 font-medium">{client.shopName}</span>
              <span className="text-gray-800 font-medium">{client.clientName}</span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Address & GST Number */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-medium text-gray-500">Address</span>
              <span className="text-sm font-medium text-gray-500">GST Number</span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-gray-800 font-medium max-w-[48%] break-words">
                {client.address}
              </span>
              <span className="text-gray-800 font-medium max-w-[48%] break-words">
                {client.gstNumber}
              </span>
            </div>
          </div>

          {/* Email & Registration Date */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-medium text-gray-500">Email</span>
              <span className="text-sm font-medium text-gray-500">Registration Date</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-800 font-medium break-words max-w-[48%]">
                {client.email}
              </span>
              <span className="text-gray-800 font-medium">{client.registrationDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientInfo;