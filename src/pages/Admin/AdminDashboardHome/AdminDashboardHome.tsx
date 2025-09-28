/* eslint-disable @typescript-eslint/no-explicit-any */
import DashboardCard from "../../../components/Dashboard/DashboardCard/DashboardCard";
import {
  FaMoneyBillWave,
  FaCreditCard,
  FaHourglassHalf,
  FaShoppingCart,
  FaCheckCircle,
  FaClock,
  FaClipboardList,
} from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import OrdersTable from "../../Dashboard/Orders/OrdersTable";
import { useGetAllOrdersQuery } from "../../../redux/Features/Order/orderApi";
import { useGetAllClientsQuery } from "../../../redux/Features/Client/clientApi";
import Loader from "../../../components/Reusable/Loader/Loader";

const AdminDashboardHome = () => {
  const { data, isLoading } = useGetAllOrdersQuery({});
  const { data: clients, isLoading: isClientsLoading } = useGetAllClientsQuery(
    {}
  );

  // Today's date string
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0]; // "YYYY-MM-DD"

  // Filter today's orders
  const todaysOrders =
    data?.data?.filter((order: any) =>
      new Date(order.createdAt).toISOString().startsWith(todayStr)
    ) || [];

  // Calculate totals
  const todayCashCollection = todaysOrders
    .filter((order: any) => order.paymentMethod === "cash")
    .reduce(
      (sum: number, order: any) =>
        sum + (order.totalAmount - order.pendingAmount),
      0
    );

  const todayOnlineCollection = todaysOrders
    .filter((order: any) => order.paymentMethod === "online")
    .reduce(
      (sum: number, order: any) =>
        sum + (order.totalAmount - order.pendingAmount),
      0
    );

  const totals = data?.data?.reduce(
    (acc: { totalPaid: number; totalPending: number }, order: any) => {
      acc.totalPaid += order.paidAmount || 0;
      acc.totalPending += order.totalPendingAmount;
      return acc;
    },
    { totalPaid: 0, totalPending: 0 }
  ) || { totalPaid: 0, totalPending: 0 };

  const todaysOrdersCount = todaysOrders.length;

  const deliveredOrdersCount = data?.data?.filter(
    (order: any) => order.status === "supplied"
  ).length;

  const pendingOrdersCount = data?.data?.filter(
    (order: any) => order.status === "pending"
  ).length;

  // Calculate clients with pending amount (unique clients who have pending orders)
  const clientsWithPendingAmount =
    clients?.data?.filter((client: any) => {
      const clientOrders = data?.data?.filter(
        (order: any) => order.shopId === client._id
      );
      console.log(clientOrders);
      return clientOrders?.some((order: any) => order.pendingAmount > 0);
    }).length || 0;

  // Total orders
  const totalOrdersCount = data?.data?.length || 0;

  return isLoading || isClientsLoading ? (
    <Loader />
  ) : (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <DashboardCard
          title="Today Cash Collection"
          value={`₹${todayCashCollection}`}
          Icon={FaMoneyBillWave}
          bgColor="bg-green-400"
        />
        <DashboardCard
          title="Today Online Collection"
          value={`₹${todayOnlineCollection}`}
          Icon={FaCreditCard}
          bgColor="bg-blue-400"
        />
        <DashboardCard
          title="Pending Payment Amount"
          value={`₹${totals.totalPending}`}
          Icon={FaHourglassHalf}
          bgColor="bg-yellow-400"
          link="/admin/dashboard/clients?status=Pending"
        />

        <DashboardCard
          title="Clients with Pending Amount"
          value={clientsWithPendingAmount}
          Icon={FaClock}
          bgColor="bg-pink-400"
        />
        <DashboardCard
          title="Total Orders"
          value={totalOrdersCount}
          Icon={FaClipboardList}
          bgColor="bg-blue-500"
        />
        <DashboardCard
          title="Today's Orders"
          value={todaysOrdersCount}
          Icon={FaShoppingCart}
          bgColor="bg-indigo-400"
        />
        <DashboardCard
          title="Delivered Orders"
          value={deliveredOrdersCount}
          Icon={FaCheckCircle}
          bgColor="bg-green-500"
        />
        <DashboardCard
          title="Pending Orders"
          value={pendingOrdersCount}
          Icon={MdPendingActions}
          bgColor="bg-orange-400"
        />
      </div>

      <OrdersTable />
    </div>
  );
};

export default AdminDashboardHome;
