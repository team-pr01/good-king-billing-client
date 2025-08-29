import DashboardCard from "../../../components/Dashboard/DashboardCard/DashboardCard";
import { 
  FaUsers, 
  FaUserSlash, 
  FaMoneyBillWave, 
  FaCreditCard, 
  FaHourglassHalf, 
  FaShoppingCart, 
  FaCheckCircle, 
  FaClock 
} from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";

const AdminDashboardHome = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Existing */}
        {/* <DashboardCard title="Active Clients" value={12} Icon={FaUsers} />
        <DashboardCard
          title="Inactive Clients"
          value={3}
          Icon={FaUserSlash}
          bgColor="bg-red-400"
        /> */}

        {/* New */}
        <DashboardCard
          title="Today Cash Collection"
          value={2500}
          Icon={FaMoneyBillWave}
          bgColor="bg-green-400"
        />
        <DashboardCard
          title="Today Online Collection"
          value={1800}
          Icon={FaCreditCard}
          bgColor="bg-blue-400"
        />
        <DashboardCard
          title="Pending Payment Amount"
          value={750}
          Icon={FaHourglassHalf}
          bgColor="bg-yellow-400"
        />
        <DashboardCard
          title="Today's Orders"
          value={34}
          Icon={FaShoppingCart}
          bgColor="bg-indigo-400"
        />
        <DashboardCard
          title="Delivered Orders"
          value={20}
          Icon={FaCheckCircle}
          bgColor="bg-green-500"
        />
        <DashboardCard
          title="Pending Orders"
          value={14}
          Icon={MdPendingActions}
          bgColor="bg-orange-400"
        />
        <DashboardCard
          title="Clients with Pending Amount"
          value={6}
          Icon={FaClock}
          bgColor="bg-pink-400"
        />
      </div>
    </div>
  );
};

export default AdminDashboardHome;
