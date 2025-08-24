/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../../../Reusable/TextInput/TextInput";
import Modal from "../../../Reusable/Modal/Modal";
import { useAddProductMutation, useUpdateProductMutation } from "../../../../redux/Features/Product/productApi";
import Button from "../../../Reusable/Button/Button";
import Loader from "../../../Reusable/Loader/Loader";

type FormValues = {
  name: string;
  availableStock: number;
  price: number;
  taxValue: number;
  hsnCode: string;
};

type AddProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultValues?: any;
  modalType: string | null;
  isLoading ?: boolean
};

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  defaultValues,
  modalType,
  isLoading
}) => {
  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<FormValues>();

  useEffect(() => {
    if (defaultValues) {
      setValue("name", defaultValues.name);
      setValue("availableStock", defaultValues.availableStock);
      setValue("price", defaultValues.price);
      setValue("taxValue", defaultValues.taxValue);
      setValue("hsnCode", defaultValues.hsnCode);
    }
  })

  const handleSubmitProduct = async (data: FormValues) => {
    try {
      const payload = {
        ...data,
      };

      if(modalType === "add"){
        const response = await addProduct(payload).unwrap();
      if (response?.success) {
        reset();
        onClose();
      }
      } else {
        const response = await updateProduct({id:defaultValues?._id, data:payload}).unwrap();
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
    <Modal title="Add New Product" isOpen={isOpen} onClose={handleClose}>
      <div className="h-full">
        {
          isLoading ?
          <Loader/>
          :
          <form onSubmit={handleSubmit(handleSubmitProduct)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          {/* Product Name */}
          <TextInput
            label="Product Name"
            placeholder="Enter product name"
            {...register("name", {
              required: "Product name is required",
              minLength: {
                value: 2,
                message: "Product name must be at least 2 characters",
              },
            })}
            error={errors.name}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Available Stock */}
            <TextInput
              label="Available Stock"
              type="number"
              placeholder="Enter available stock"
              {...register("availableStock", {
                required: "Available stock is required",
                min: {
                  value: 0,
                  message: "Stock cannot be negative",
                },
                valueAsNumber: true,
              })}
              error={errors.availableStock}
            />
            {/* HSn Code */}
            <TextInput
              label="HSN Code"
              placeholder="Enter HSN Code"
              {...register("hsnCode", {
                required: "HSN Code is required",
              })}
              error={errors.hsnCode}
            />

            {/* Price */}
            <TextInput
              label="Tax Value(₹)"
              type="number"
              placeholder="Enter tax value"
              {...register("taxValue", {
                required: "Tax value is required",
                valueAsNumber: true,
              })}
              error={errors.taxValue}
            />

            {/* Price */}
            <TextInput
              label="Price(₹)"
              type="number"
              placeholder="Enter price"
              {...register("price", {
                required: "Price is required",
                min: {
                  value: 0.01,
                  message: "Price must be greater than 0",
                },
                valueAsNumber: true,
              })}
              error={errors.price}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <Button label="Add Product" isLoading={isAdding || isUpdating} />
        </div>
      </form>
        }
      </div>
    </Modal>
  );
};

export default AddProductModal;
