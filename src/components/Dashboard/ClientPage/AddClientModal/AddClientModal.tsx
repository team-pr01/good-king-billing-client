/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../../../Reusable/TextInput/TextInput";
import Modal from "../../../Reusable/Modal/Modal";
import {
  useAddClientMutation,
  useUpdateClientMutation,
} from "../../../../redux/Features/Client/clientApi";
import Button from "../../../Reusable/Button/Button";
import Loader from "../../../Reusable/Loader/Loader";
import SelectDropdown from "../../../Reusable/SelectDropdown/SelectDropdown";
import { useGetAllAreaQuery } from "../../../../redux/Features/Area/areaApi";

type FormValues = {
  name: string;
  email: string;
  phoneNumber: string;
  shopName: string;
  gstNumber: string;
  area: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  city: string;
  district: string;
  pinCode: string;
  state: string;
};

type AddClientModalProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultValues?: any;
  isLoading?: boolean;
  modalType?: string | null;
};

const AddClientModal: React.FC<AddClientModalProps> = ({
  isOpen,
  onClose,
  defaultValues,
  isLoading,
  modalType,
}) => {
   const {
      data: allArea,
      isLoading: isAllAreaLoading,
      isFetching,
    } = useGetAllAreaQuery({});

     const [areaData, setAreaData] = useState<any[]>([]);
  const areas = allArea?.data?.map((area: any) => area.area);
  
  const [addClient, { isLoading: isAdding }] = useAddClientMutation();
  const [updateClient, { isLoading: isUpdating }] = useUpdateClientMutation();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormValues>();
  
  // Watch area field for changes
  const selectedArea = watch("area");
  
  // Extract area data from API response
  useEffect(() => {
    if (allArea?.data) {
      setAreaData(allArea.data);
    }
  }, [allArea]);
  
  // Handle area selection change
  useEffect(() => {
    if (selectedArea) {
      const areaInfo = areaData.find(area => area.area === selectedArea);
      if (areaInfo) {
        setValue("city", areaInfo.city || "");
        setValue("district", areaInfo.district || "");
        setValue("state", areaInfo.state || "");
        if (areaInfo.pinCode) {
          setValue("pinCode", areaInfo.pinCode);
        }
      }
    }
  }, [selectedArea, areaData, setValue]);

  const onSubmit = async (data: FormValues) => {
    try {
      const payload = {
        ...data,
      };

      if (modalType === "add") {
        const response = await addClient(payload).unwrap();
        if (response?.success) {
          reset();
          onClose();
        }
      } else {
        const response = await updateClient({
          id: defaultValues?._id,
          data: payload,
        }).unwrap();
        if (response?.success) {
          reset();
          onClose();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div>
      <Modal title="Add New Client" isOpen={isOpen} onClose={handleClose}>
        {isLoading || isAllAreaLoading || isFetching ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2">
              Personal Information
            </h2>
            {/* Area */}
            <SelectDropdown
              label="Area"
              {...register("area", { required: "Area is required" })}
              error={errors?.area}
              options={areas}
            />

             <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2">
                Address Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                {/* Address Line 1 */}
                <TextInput
                  label="Address Line 1"
                  placeholder="Enter Door Number or building number"
                  {...register("addressLine1", {
                    required: "Address Line 1 is required",
                  })}
                  error={errors.addressLine1}
                />

                {/* Address Line 2 */}
                <TextInput
                  label="Address Line 2"
                  placeholder="Enter apartment name or building name"
                  {...register("addressLine2")}
                  error={errors.addressLine2}
                  isRequired={false}
                />

                {/* Address Line 3 */}
                <TextInput
                  label="Address Line 3"
                  placeholder="Enter locality or street"
                  {...register("addressLine3")}
                  error={errors.addressLine3}
                  isRequired={false}
                />

                {/* City */}
                <TextInput
                  label="City"
                  placeholder="Enter city or district"
                  {...register("city", { required: "City is required" })}
                  error={errors.city}
                />

                {/* District */}
                <TextInput
                  label="District"
                  placeholder="Enter district"
                  {...register("district", {
                    required: "District is required",
                  })}
                  error={errors.district}
                />

                {/* Pincode */}
                <TextInput
                  label="Pincode"
                  placeholder="Enter pincode"
                  {...register("pinCode", {
                    required: "Pincode is required",
                    pattern: {
                      value: /^[0-9]{6}$/,
                      message: "Pincode must be 6 digits",
                    },
                  })}
                  error={errors.pinCode}
                />

                {/* State */}
                <TextInput
                  label="State"
                  placeholder="Enter state"
                  {...register("state", { required: "State is required" })}
                  error={errors.state}
                />
              </div>
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                label="Client Name"
                placeholder="Enter client name"
                {...register("name", {
                  required: "Client name is required",
                })}
                error={errors.name}
              />

              <TextInput
                label="Email (Optional)"
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
                isRequired={false}
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
            </div>
            <TextInput
              label="GST Number (Optional)"
              placeholder="Enter GST number"
              {...register("gstNumber")}
              error={errors.gstNumber}
              isRequired={false}
            />

           

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Cancel
              </button>
              <Button label="Add Client" isLoading={isAdding || isUpdating} />
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default AddClientModal;
