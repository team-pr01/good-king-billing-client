import { useForm, useFieldArray } from 'react-hook-form';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import TextInput from '../../../components/Reusable/TextInput/TextInput';

type FormValues = {
  area: string;
  shopName: string;
  products: {
    productId: string;
    quantity: number;
    price: number;
  }[];
};

// Sample data
const areas = ['North Area', 'South Area', 'East Area', 'West Area', 'Central Area'];
const shops = ['Tech Gadgets Store', 'Fashion Boutique', 'Home Essentials', 'Green Grocers', 'Book Nook'];

const products = [
  { id: 1, name: 'Laptop', price: 1200 },
  { id: 2, name: 'Smartphone', price: 800 },
  { id: 3, name: 'Headphones', price: 150 },
  { id: 4, name: 'Keyboard', price: 75 },
  { id: 5, name: 'Monitor', price: 300 },
];

const CreateOrder = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    reset
  } = useForm<FormValues>({
    defaultValues: {
      products: [{ productId: '', quantity: 1, price: 0 }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products"
  });

  const watchedProducts = watch("products");
  const totalAmount = watchedProducts?.reduce((total, product) => {
    const productData = products.find(p => p.id.toString() === product.productId);
    const price = productData ? productData.price : 0;
    const quantity = product.quantity || 0;
    return total + (price * quantity);
  }, 0) || 0;

  const onSubmit = (data: FormValues) => {
    console.log('Order data:', data);
    // Handle order creation here
  };

  const handleAddProduct = () => {
    append({ productId: '', quantity: 1, price: 0 });
  };

  const handleRemoveProduct = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const getProductPrice = (productId: string) => {
    const product = products.find(p => p.id.toString() === productId);
    return product ? product.price : 0;
  };

  return (
    <div className="min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Create New Order</h1>
        <p className="text-gray-600">Add a new order for a client</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            {/* Area */}
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700">
                Area <span className="text-red-600"> *</span>
              </label>
              <select
                {...register("area", { required: "Area is required" })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
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

            {/* Shop Name */}
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700">
                Shop Name <span className="text-red-600"> *</span>
              </label>
              <select
                {...register("shopName", { required: "Shop name is required" })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select Shop</option>
                {shops.map((shop, index) => (
                  <option key={index} value={shop}>
                    {shop}
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
              <h3 className="text-lg font-medium text-gray-800">Products</h3>
              <button
                type="button"
                onClick={handleAddProduct}
                className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
              >
                <FiPlus className="w-4 h-4" />
                Add Product
              </button>
            </div>

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end p-4 border border-gray-200 rounded-lg">
                  {/* Product Selection */}
                  <div className="md:col-span-4 flex flex-col gap-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Product <span className="text-red-600"> *</span>
                    </label>
                    <select
                      {...register(`products.${index}.productId` as const, { 
                        required: "Product is required" 
                      })}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Select Product</option>
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name} - ₹{product.price}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price */}
                  <div className="md:col-span-2">
                    <TextInput
                    name='price'
                      label="Price"
                      value={watchedProducts?.[index]?.productId ? `₹${getProductPrice(watchedProducts[index].productId)}` : "₹0.00"}
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
                        valueAsNumber: true
                      })}
                      error={errors.products?.[index]?.quantity}
                    />
                  </div>

                  {/* Total for this product */}
                  <div className="md:col-span-2">
                    <TextInput
                      name='total'
                      label="Total"
                      value={watchedProducts?.[index]?.productId && watchedProducts[index].quantity 
                        ? `₹${(getProductPrice(watchedProducts[index].productId) * watchedProducts[index].quantity).toFixed(2)}`
                        : "$0.00"
                      }
                      isDisabled={true}
                    />
                  </div>

                  {/* Remove Button */}
                  <div className="md:col-span-2 flex justify-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveProduct(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      disabled={fields.length === 1}
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Grand Total */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-800">Total Amount:</span>
                <span className="text-2xl font-bold text-green-600">₹{totalAmount.toFixed(2)}</span>
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
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Create Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOrder;