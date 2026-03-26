import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import DashboardHeader from "../../components/Dashboard/DashboardHeader/DashboardHeader";

const DashboardLayout = () => {
  return (
    <div className="flex w-full h-screen overflow-x-hidden">
      <Sidebar />
      <div className="flex flex-col w-full min-w-0">
        <DashboardHeader />
        <div className="px-5 py-8 bg-gray-50 flex-1 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
