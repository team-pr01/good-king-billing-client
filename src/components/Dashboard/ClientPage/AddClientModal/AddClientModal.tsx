import React from "react";
import { useForm } from "react-hook-form";
import TextInput from "../../../Reusable/TextInput/TextInput";
import Modal from "../../../Reusable/Modal/Modal";

type FormValues = {
  clientName: string;
  email: string;
  phoneNumber: string;
  shopName: string;
  gstNumber: string;
  area: string;
  address: string;
};

type AddClientModalProps = {
  isOpen: boolean;
  onClose: () => void;
  areas: string[];
};

const AddClientModal: React.FC<AddClientModalProps> = ({
  isOpen,
  onClose,
  areas,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log("Client data:", data);
    // Handle form submission here
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div>
      <Modal title="Add New Client" isOpen={isOpen} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              label="Client Name"
              placeholder="Enter client name"
              {...register("clientName", {
                required: "Client name is required",
              })}
              error={errors.clientName}
            />

            <TextInput
              label="Email"
              type="email"
              placeholder="Enter email address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              error={errors.email}
            />

            <TextInput
              label="Phone Number"
              placeholder="Enter phone number"
              {...register("phoneNumber", {
                required: "Phone number is required",
              })}
              error={errors.phoneNumber}
            />

            <TextInput
              label="Shop Name"
              placeholder="Enter shop name"
              {...register("shopName", { required: "Shop name is required" })}
              error={errors.shopName}
            />

            <TextInput
              label="GST Number (Optional)"
              placeholder="Enter GST number"
              {...register("gstNumber")}
              error={errors.gstNumber}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Area
              </label>
              <select
                {...register("area", { required: "Area is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select Area</option>
                {areas.map((area, index) => (
                  <option key={index} value={area}>
                    {area}
                  </option>
                ))}
              </select>
              {errors.area && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.area.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <TextInput
              label="Address"
              placeholder="Enter full address"
              {...register("address", { required: "Address is required" })}
              error={errors.address}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Add Client
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddClientModal;
