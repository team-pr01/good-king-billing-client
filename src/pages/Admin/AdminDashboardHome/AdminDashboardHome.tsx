import DashboardCard from "../../../components/Dashboard/DashboardCard/DashboardCard";
import { FaUsers, FaUserSlash } from "react-icons/fa";

const AdminDashboardHome = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <DashboardCard title="Active Clients" value={12} Icon={FaUsers} />
        <DashboardCard
          title="Inactive Clients"
          value={3}
          Icon={FaUserSlash}
          bgColor="bg-red-400"
        />
      </div>
    </div>
  );
};

export default AdminDashboardHome;
