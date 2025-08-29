/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaClipboardList, FaHourglassHalf, FaTimesCircle, FaTruck } from "react-icons/fa";
import DashboardCard from "../../../components/Dashboard/DashboardCard/DashboardCard";
import { useGetAllOrdersQuery } from "../../../redux/Features/Order/orderApi";
import Loader from "../../../components/Reusable/Loader/Loader";
import OrdersTable from "./OrdersTable";

const Orders = () => {
  const { data, isLoading } = useGetAllOrdersQuery({});

  const pendingOrders = data?.data?.filter(
    (order: any) => order.status === "pending"
  );
  const suppliedOrders = data?.data?.filter(
    (order: any) => order.status === "supplied"
  );

  const cancelledOrders = data?.data?.filter(
    (order: any) => order.status === "cancelled"
  );

  return (
    <div className="min-h-screen">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="font-Nunito flex flex-col gap-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Orders */}
            <DashboardCard
              title="Total Orders"
              value={data?.data?.length || 0}
              Icon={FaClipboardList}
              bgColor="bg-blue-500"
            />
            <DashboardCard
              title="Pending Orders"
              value={pendingOrders?.length || 0}
              Icon={FaHourglassHalf}
              bgColor="bg-orange-500"
            />
            <DashboardCard
              title="Supplied Orders"
              value={suppliedOrders?.length || 0}
              Icon={FaTruck}
              bgColor="bg-green-500"
            />
            <DashboardCard
              title="Cancelled Orders"
              value={cancelledOrders?.length || 0}
              Icon={FaTimesCircle} // use any suitable icon
              bgColor="bg-red-500"
            />
          </div>

          <OrdersTable />
        </div>
      )}
    </div>
  );
};

export default Orders;
