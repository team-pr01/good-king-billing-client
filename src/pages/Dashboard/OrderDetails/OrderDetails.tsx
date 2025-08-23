import { useState } from 'react';
import { FiEdit2, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import ProceedToPaymentModal from '../../../components/Dashboard/OrderDetailsPage/ProceedToPaymentModal/ProceedToPaymentModal';

const OrderDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
   const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [orderItems, setOrderItems] = useState([
    { id: 1, name: 'Organic Apples', quantity: 5, price: 2.50, total: 12.50 },
    { id: 2, name: 'Whole Wheat Bread', quantity: 2, price: 3.00, total: 6.00 },
    { id: 3, name: 'Almond Milk', quantity: 3, price: 4.00, total: 12.00 }
  ]);

  const orderDetails = {
    id: '12345',
    shop: 'The Corner Store',
    area: 'Downtown',
    date: '2023-11-15',
    status: 'Pending'
  };

  // Calculate totals
  const subtotal = orderItems.reduce((sum, item) => sum + item.total, 0);
  const gstRate = 0.18; // 18% GST
  const gstAmount = subtotal * gstRate;
  const totalAmount = subtotal + gstAmount;

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setOrderItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, quantity: newQuantity, total: newQuantity * item.price }
          : item
      )
    );
  };

  const handleDeleteItem = (id: number) => {
    setOrderItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
    // Here you would typically save changes to your backend
    console.log('Order updated:', orderItems);
  };

//   const handlePrint = () => {
//     window.print();
//   };

//   const handleDownload = () => {
//     console.log('Download invoice');
//   };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button className="flex items-center text-gray-600 hover:text-gray-800 mr-4">
          <FiArrowLeft className="w-5 h-5 mr-1" />
          Back
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Order #{orderDetails.id}</h1>
        <span className={`ml-4 px-3 py-1 rounded-full text-sm font-medium ${
          orderDetails.status === 'Pending' 
            ? 'bg-yellow-100 text-yellow-800' 
            : 'bg-green-100 text-green-800'
        }`}>
          {orderDetails.status}
        </span>
      </div>

      {/* Order Info */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Shop Name</h3>
            <p className="text-lg font-semibold text-gray-800">{orderDetails.shop}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Area</h3>
            <p className="text-lg font-semibold text-gray-800">{orderDetails.area}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Order Date</h3>
            <p className="text-lg font-semibold text-gray-800">{orderDetails.date}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
              {!isEditing && (
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
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="pb-3 text-left text-sm font-medium text-gray-500">Product</th>
                    <th className="pb-3 text-center text-sm font-medium text-gray-500">Quantity</th>
                    <th className="pb-3 text-right text-sm font-medium text-gray-500">Price</th>
                    <th className="pb-3 text-right text-sm font-medium text-gray-500">Total</th>
                    {isEditing && <th className="pb-3 text-center text-sm font-medium text-gray-500">Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100">
                      <td className="py-4 text-sm font-medium text-gray-800">{item.name}</td>
                      <td className="py-4 text-center">
                        {isEditing ? (
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                            className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                          />
                        ) : (
                          <span className="text-sm text-gray-600">{item.quantity}</span>
                        )}
                      </td>
                      <td className="py-4 text-right text-sm text-gray-600">${item.price.toFixed(2)}</td>
                      <td className="py-4 text-right text-sm font-medium text-gray-800">${item.total.toFixed(2)}</td>
                      {isEditing && (
                        <td className="py-4 text-center">
                          <button
                            onClick={() => handleDeleteItem(item.id)}
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
          </div>
        </div>

        {/* Invoice Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Invoice Summary</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">GST (18%):</span>
                <span className="font-medium">${gstAmount.toFixed(2)}</span>
              </div>
              
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-green-600">${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSaveChanges}
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-medium"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => setIsPaymentModalOpen(true)} className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-medium">
                    Proceed to Payment
                  </button>
                 
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method Modal */}
      <ProceedToPaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        totalAmount={totalAmount}
        onPaymentSuccess={() => { setIsPaymentModalOpen(false) }}
      />
    </div>
  );
};

export default OrderDetails;