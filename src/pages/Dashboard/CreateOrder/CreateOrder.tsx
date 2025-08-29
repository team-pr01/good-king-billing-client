/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, useFieldArray } from "react-hook-form";
import {  FiPlus, FiTrash2 } from "react-icons/fi";
import TextInput from "../../../components/Reusable/TextInput/TextInput";
import { useCreateOrderMutation } from "../../../redux/Features/Order/orderApi";
import { useGetAllProductsQuery } from "../../../redux/Features/Product/productApi";
import { useGetAllAreaQuery } from "../../../redux/Features/Area/areaApi";
import { useGetAllClientsQuery } from "../../../redux/Features/Client/clientApi";
import Loader from "../../../components/Reusable/Loader/Loader";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Reusable/Button/Button";
import { useState } from "react";

type FormValues = {
  area: string;
  shopName: string;
  products: {
    productId: string;
    quantity: number;
    price: number;
    taxValue: number;
  }[];
};

const CreateOrder = () => {
  const navigate = useNavigate();

  const [selectedArea, setSelectedArea] = useState<string>("");
  
  
  // Get all products
  const { data: allProducts, isLoading: isAllProductsLoading } =
  useGetAllProductsQuery({});
  // Get all areas
  const { data: allArea, isLoading: isAllAreaLoading } = useGetAllAreaQuery({});
  
  // Get all clients/shops
  const { data: allShops, isLoading: isAllShopsLoading } =
  useGetAllClientsQuery({});
  console.log(allShops?.data);

  // Filtered shops based on selected area
const filteredShops = allShops?.data?.filter(
  (shop: any) => shop?.area === selectedArea
) || [];

console.log(filteredShops);

  const [createOrder, { isLoading: isCreatingOrder }] =
    useCreateOrderMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      products: [{ productId: "", quantity: 1, price: 0, taxValue: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const watchedProducts = watch("products");
  const totalAmount =
    watchedProducts?.reduce((total, product) => {
      const productData = allProducts?.data?.find(
        (p: any) => p?._id.toString() === product.productId
      );
      const price = productData ? productData.price : 0;
      const quantity = product.quantity || 0;
      const tax = productData ? productData.taxValue || 0 : 0; // ✅ get tax from product API

      return total + price * quantity + tax;
    }, 0) || 0;

  const onSubmit = async (data: FormValues) => {
    // Find shop details by shopName
    const shop = allShops?.data?.find((s: any) => s.shopName === data.shopName);

    // Build products array
    const products = data.products.map((p) => {
      const productData = allProducts?.data?.find(
        (prod: any) => prod._id.toString() === p.productId
      );
      return {
        productId: p.productId,
        name: productData?.name || "",
        quantity: p.quantity,
        price: productData?.price || 0,
        taxValue: productData?.taxValue || 0,
      };
    });

    // Calculate total
    const totalAmount = products.reduce(
      (sum, item) => sum + (item.price + item.taxValue) * item.quantity,
      0
    );

    // For now, let's assume user inputs paidAmount manually (can add field later)
    const paidAmount = 0;
    const pendingAmount = totalAmount - paidAmount;

    const orderPayload = {
      shopId: shop?._id,
      shopName: shop?.shopName,
      totalAmount,
      paidAmount,
      pendingAmount,
      products,
    };

    console.log("Final Payload:", orderPayload);

    try {
      const response = await createOrder(orderPayload).unwrap();
      if (response?.success) {
        navigate(`/admin/dashboard/order/${response?.data?._id}`);
      }
      reset();
    } catch (error) {
      console.error("Failed to create order", error);
    }
  };

  const handleAddProduct = () => {
    append({ productId: "", quantity: 1, price: 0, taxValue: 0 });
  };

  const handleRemoveProduct = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const getProductPrice = (productId: string) => {
    const product = allProducts?.data?.find(
      (p: any) => p._id.toString() === productId
    );
    return product ? product.price : 0;
  };

  const getProductTax = (productId: string) => {
    const product = allProducts?.data?.find(
      (p: any) => p._id.toString() === productId
    );
    return product ? product.taxValue : 0;
  };

  return (
    <div className="min-h-screen">
      {isAllAreaLoading || isAllProductsLoading || isAllShopsLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Create New Order
            </h1>
            <p className="text-gray-600">Add a new order for a client</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 md:p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                {/* Area */}
                <div className="flex flex-col gap-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Area <span className="text-red-600"> *</span>
                  </label>
                  <select
                    {...register("area", { required: "Area is required" })}
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select Area</option>
                    {allArea?.data?.map((area: any, index: number) => (
                      <option key={index} value={area?.area}>
                        {area?.area}
                      </option>
                    ))}
                  </select>
                  {errors.area && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.area.message}
                    </p>
                  )}
                </div>

                {/* Shop Name */}
                <div className="flex flex-col gap-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Shop Name <span className="text-red-600"> *</span>
                  </label>
                  <select
                    {...register("shopName", {
                      required: "Shop name is required",
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select Shop</option>
                    {filteredShops?.map((shop: any, index: number) => (
                      <option key={index} value={shop?.shopName}>
                        {shop?.shopName} - (Owner: {shop?.name})
                      </option>
                    ))}
                  </select>
                  {errors.shopName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.shopName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Products Section */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-800">
                    Products
                  </h3>
                </div>

                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 border border-gray-200 rounded-lg"
                    >
                      {/* Product Selection */}
                      <div className="md:col-span-4 flex flex-col gap-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Product <span className="text-red-600"> *</span>
                        </label>
                        <select
                          {...register(`products.${index}.productId` as const, {
                            required: "Product is required",
                          })}
                          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                          <option value="">Select Product</option>
                          {allProducts?.data?.map((product: any) => (
                            <option key={product?._id} value={product?._id}>
                              {product?.name} - ₹{product?.price} ({allProducts?.data?.length})
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Price */}
                      <div className="md:col-span-2">
                        <TextInput
                          name="price"
                          label="Price"
                          value={
                            watchedProducts?.[index]?.productId
                              ? `₹${getProductPrice(
                                  watchedProducts[index].productId
                                )}`
                              : "₹0.00"
                          }
                          isDisabled={true}
                        />
                      </div>

                      {/* Quantity */}
                      <div className="md:col-span-2">
                        <TextInput
                          label="Quantity"
                          type="number"
                          {...register(`products.${index}.quantity` as const, {
                            required: "Quantity is required",
                            min: { value: 1, message: "Minimum quantity is 1" },
                            valueAsNumber: true,
                          })}
                          error={errors.products?.[index]?.quantity}
                        />
                      </div>

                      {/* <div className="md:col-span-2 flex flex-col gap-1">
                        <label className="text-neutral-65">
                          Quantity
                        </label>
                        <div className="flex gap-2">
                          <div className="px-[18px] py-3 rounded-lg border bg-neutral-50 border-neutral-200 w-full">
                          1
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="bg-neutral-200/50 px-[18px] py- rounded-lg font-bold">
                            <FiMinus />
                          </button>
                          <button className="bg-neutral-200/50 px-[18px] py- rounded-lg font-bold">
                            <FiPlus />
                          </button>
                        </div>
                        </div>
                      </div> */}

                      {/* Tax Value */}
                      <TextInput
                        name="taxValue"
                        label="Tax"
                        type="text"
                        value={
                          watchedProducts?.[index]?.productId
                            ? `₹${getProductTax(
                                watchedProducts[index].productId
                              )}`
                            : "₹0.00"
                        }
                        isDisabled={true}
                      />

                      {/* Total for this product */}
                      <div className="md:col-span-2">
                        <TextInput
                          name="total"
                          label="Total"
                          value={
                            watchedProducts?.[index]?.productId &&
                            watchedProducts[index].quantity
                              ? `₹${(
                                  getProductPrice(
                                    watchedProducts[index].productId
                                  ) *
                                    watchedProducts[index].quantity +
                                  getProductTax(
                                    watchedProducts[index].productId
                                  )
                                ).toFixed(2)}`
                              : "₹0.00"
                          }
                          isDisabled={true}
                        />
                      </div>

                      {/* Remove Button */}
                      <div className="">
                        <button
                          type="button"
                          onClick={() => handleRemoveProduct(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          disabled={fields.length === 1}
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleAddProduct}
                  className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm mt-4 cursor-pointer"
                >
                  <FiPlus className="w-4 h-4" />
                  Add Product
                </button>

                {/* Grand Total */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">
                      Total Amount:
                    </span>
                    <span className="text-2xl font-bold text-green-600">
                      ₹{totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => reset()}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Reset
                </button>
                <Button label="Create Order" isLoading={isCreatingOrder} />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateOrder;
