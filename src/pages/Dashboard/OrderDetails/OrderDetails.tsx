/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiPlus, FiDownload } from "react-icons/fi";
import ProceedToPaymentModal from "../../../components/Dashboard/OrderDetailsPage/ProceedToPaymentModal/ProceedToPaymentModal";
import { useParams } from "react-router-dom";
import {
  useGetSingleOrderByIdQuery,
  useUpdateOrderMutation,
} from "../../../redux/Features/Order/orderApi";
import { useGetAllProductsQuery } from "../../../redux/Features/Product/productApi";
import Loader from "../../../components/Reusable/Loader/Loader";
import { pdf } from "@react-pdf/renderer";
import Invoice from "../../../components/Dashboard/Invoice/Invoice";
import TwoInvoice from "../../../components/Dashboard/Invoice/TwoInvoices";

type OrderItem = {
  productId: { _id: string };
  name: string;
  quantity: number;
  price: number;
  taxValue: number;
};

const OrderDetails = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetSingleOrderByIdQuery(id);
  const { data: allProducts } = useGetAllProductsQuery({});
  const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  // Load API order products into local state
  useEffect(() => {
    if (data?.data?.products) {
      setOrderItems(data?.data?.products);
    }
  }, [data]);

  // Calculate totals
  const subtotal = orderItems.reduce(
    (sum, item) => sum + (item.price + item.taxValue) * item.quantity,
    0
  );

  const totalAmount = subtotal;

  // Handle quantity change
  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setOrderItems((prev: any) =>
      prev.map((item: any) =>
        item?.productId?._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Remove product
  const handleDeleteItem = (productId: string) => {
    console.log(productId);
    setOrderItems((prev) =>
      prev.filter((item) => item?.productId?._id !== productId)
    );
  };

  // Add new product
  const handleAddProduct = () => {
    if (!allProducts?.data?.length) return;
    setOrderItems((prev: any) => [
      ...prev,
      {
        productId: {
          _id: "",
        },
        name: "",
        quantity: 1,
        price: "",
        taxValue: 0,
      },
    ]);
  };

  // Save changes → Call updateOrder mutation
  const handleSaveChanges = async () => {
    try {
      const payload = {
        shopId: data?.data?.shopId?._id,
        shopName: data?.data?.shopName,
        totalAmount: subtotal,
        paidAmount: data?.data?.paidAmount || 0,
        pendingAmount: subtotal - (data?.data?.paidAmount || 0),
        products: orderItems,
      };

      await updateOrder({ id: data?.data?._id, data: payload }).unwrap();
      setIsEditing(false);
    } catch (err) {
      console.error("Update order failed", err);
    }
  };

  const invoiceData = {
    invoiceNumber: data?.data?.orderId,
    date: new Date(data?.data?.createdAt).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    customerName: data?.data?.shopId?.name,
    businessEmail: data?.data?.shopId?.email,
    businessPhone: data?.data?.shopId?.phoneNumber,
    businessAddress: `${data?.data?.shopId?.city}, ${data?.data?.shopId?.area}, ${data?.data?.shopId?.district}, ${data?.data?.shopId?.state}, ${data?.data?.shopId?.pinCode}`,
    businessName: data?.data?.shopId?.shopName,
    items: data?.data?.products,
    status: data?.data?.pendingAmount > 0 ? "Due" : "Paid",
    dueAmount: data?.data?.pendingAmount,
    previousOrderId: data?.data?.previousOrderId,
    subtotal: totalAmount,
    coveredDueAmount: data?.data?.coveredDueAmount  === 0 || data?.data?.coveredDueAmount === undefined ? data?.data?.previousDue : data?.data?.coveredDueAmount,
    paidAmount: data?.data?.paidAmount,
  };

  const handleDownload = async () => {
    // Create the PDF instance
    const blob = await pdf(
  invoiceData.paidAmount > 0 && invoiceData.paidAmount != 0 ? (
    <Invoice data={invoiceData} />
  ) : (
    <TwoInvoice data={invoiceData} />
  )
).toBlob();

    // Create a temporary link to trigger download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `invoice_${invoiceData.invoiceNumber}.pdf`;
    link.click();

    // Clean up
    URL.revokeObjectURL(link.href);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex items-center mb-6">
        <h1 className="text-base md:text-2xl font-bold text-gray-800">
          Order #{data?.data?.orderId}
        </h1>
        <span
          className={`ml-4 px-3 py-1 rounded-full text-sm font-medium capitalize ${
            data?.data?.status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {data?.data?.status}
        </span>
      </div>

      {/* Order Info */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Shop Name</h3>
            <p className="text-lg font-semibold text-gray-800">
              {data?.data?.shopName}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Area</h3>
            <p className="text-lg font-semibold text-gray-800">
              {data?.data?.shopId?.area}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Order Date</h3>
            <p className="text-lg font-semibold text-gray-800">
              {new Date(data?.data?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Order Summary
              </h2>
              {!isEditing && data?.data?.pendingAmount > 0 && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                >
                  <FiEdit2 className="w-4 h-4 mr-1" />
                  Edit Order
                </button>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-2 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 whitespace-nowrap">
                      Product
                    </th>
                    <th className="px-2 py-2 text-center text-xs sm:text-sm font-medium text-gray-500 whitespace-nowrap">
                      Quantity
                    </th>
                    <th className="px-2 py-2 text-right text-xs sm:text-sm font-medium text-gray-500 whitespace-nowrap">
                      Price
                    </th>
                    <th className="px-2 py-2 text-right text-xs sm:text-sm font-medium text-gray-500 whitespace-nowrap">
                      Tax Value
                    </th>
                    <th className="px-2 py-2 text-right text-xs sm:text-sm font-medium text-gray-500 whitespace-nowrap">
                      Total
                    </th>
                    {isEditing && (
                      <th className="px-2 py-2 text-center text-xs sm:text-sm font-medium text-gray-500 whitespace-nowrap">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {orderItems?.map((item) => (
                    <tr key={item?.productId?._id}>
                      <td className="px-2 py-2 text-sm sm:text-base font-medium text-gray-800 whitespace-nowrap">
                        {isEditing ? (
                          <select
                            value={item.productId?._id || ""} // 👈 empty if no product
                            onChange={(e) => {
                              const selectedId = e.target.value;
                              const product = allProducts?.data?.find(
                                (p: any) => p._id === selectedId
                              );

                              setOrderItems((prev: any) =>
                                prev.map((p: any) =>
                                  p.productId?._id === item.productId?._id
                                    ? product
                                      ? {
                                          ...p,
                                          productId: { _id: product._id }, // 👈 keep object format
                                          name: product.name,
                                          price: product.price,
                                          taxValue: product.taxValue || 0,
                                        }
                                      : {
                                          ...p,
                                          productId: null, // 👈 reset if no product
                                          name: "",
                                          price: 0,
                                          taxValue: 0,
                                        }
                                    : p
                                )
                              );
                            }}
                            className="border border-gray-300 rounded px-2 py-1 min-w-[150px] w-full sm:w-auto"
                          >
                            {/* Placeholder so first product is NOT auto-selected */}
                            <option value="">-- Select a product --</option>

                            {allProducts?.data?.map((p: any) => (
                              <option key={p._id} value={p._id}>
                                {p.name}
                              </option>
                            ))}
                          </select>
                        ) : (
                          item.name
                        )}
                      </td>
                      <td className="px-2 py-2 text-center whitespace-nowrap">
                        {isEditing ? (
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                typeof item.productId === "string"
                                  ? item.productId
                                  : item.productId._id,
                                parseInt(e.target.value)
                              )
                            }
                            className="w-16 sm:w-20 px-2 py-1 border border-gray-300 rounded text-center"
                          />
                        ) : (
                          <span className="text-sm text-gray-600">
                            {item.quantity}
                          </span>
                        )}
                      </td>
                      <td className="px-2 py-2 text-right text-sm sm:text-base text-gray-600 whitespace-nowrap">
                        ₹{item.price}
                      </td>
                      <td className="px-2 py-2 text-right text-sm sm:text-base text-gray-600 whitespace-nowrap">
                        ₹{item.taxValue}
                      </td>
                      <td className="px-2 py-2 text-right text-sm sm:text-base font-medium text-gray-800 whitespace-nowrap">
                        ₹{(item.price + item.taxValue) * item.quantity}
                      </td>
                      {isEditing && (
                        <td className="px-2 py-2 text-center whitespace-nowrap">
                          <button
                            onClick={() =>
                              handleDeleteItem(
                                typeof item.productId === "string"
                                  ? item.productId
                                  : item.productId._id
                              )
                            }
                            className="text-red-600 hover:text-red-800 p-1"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {isEditing && (
              <button
                onClick={handleAddProduct}
                className="mt-4 flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                <FiPlus className="w-4 h-4 mr-1" />
                Add Product
              </button>
            )}
          </div>
        </div>

        {/* Invoice Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Invoice Summary
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal (Including Tax):</span>
                <span className="font-medium">₹{subtotal.toFixed(2)}</span>
              </div>

              {/* <div className="flex justify-between">
                <span className="text-gray-600">GST (18%):</span>
                <span className="font-medium">₹{gstAmount.toFixed(2)}</span>
              </div> */}

              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-green-600">
                    ₹{totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSaveChanges}
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-medium cursor-pointer"
                  >
                    {isUpdating ? "Please wait..." : "Save Changes"}
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  disabled={data?.data?.pendingAmount === 0}
                  onClick={() => setIsPaymentModalOpen(true)}
                  className={`w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-medium cursor-pointer disabled:bg-green-800 disabled:cursor-not-allowed`}
                >
                  {data?.data?.pendingAmount === 0
                    ? "Paid"
                    : " Proceed to Payment"}
                </button>
              )}

              {data?.data?.pendingAmount === 0 && (
                <button
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-medium cursor-pointer"
                >
                  <FiDownload className="w-5 h-5" />
                  Download Invoice
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <ProceedToPaymentModal
        orderId={id}
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        totalAmount={totalAmount}
        onPaymentSuccess={() => setIsPaymentModalOpen(false)}
        // dueAmount={totalAmount + data?.data?.previousDue}
        dueAmount={data?.data?.totalPendingAmount}
        previousPendingAmount={data?.data?.previousDue}
        previousOrderId={data?.data?.previousOrderId || ""}
      />
    </div>
  );
};

export default OrderDetails;
