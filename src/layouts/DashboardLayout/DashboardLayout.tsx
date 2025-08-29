import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import DashboardHeader from "../../components/Dashboard/DashboardHeader/DashboardHeader";

const DashboardLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <DashboardHeader />
        <div className="px-5 py-8 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
