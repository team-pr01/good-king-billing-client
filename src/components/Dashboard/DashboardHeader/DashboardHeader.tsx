/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import DashboardHamburgerMenu from "../Sidebar/DashboardHamburgerMenu/DashboardHamburgerMenu";
import { useGetAllOrdersQuery } from "../../../redux/Features/Order/orderApi";

const DashboardHeader = () => {
  const { data } = useGetAllOrdersQuery({});
  const totals = data?.data?.reduce(
  (acc: { totalPaid: number; totalPending: number }, order: any) => {
    acc.totalPaid += order.paidAmount || 0;
    acc.totalPending += order.totalPendingAmount || 
                       (order.pendingAmount || 0) + (order.previousDue || 0) || 0;
    return acc;
  },
  { totalPaid: 0, totalPending: 0 }
) || { totalPaid: 0, totalPending: 0 };


  const today = new Date();

  const day = today.getDate();
  const getDaySuffix = (d: number) => {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  // Split formatted parts
  const weekday = today.toLocaleDateString("en-GB", { weekday: "long" });
  const month = today.toLocaleDateString("en-GB", { month: "long" });
  const year = today.getFullYear();

  const finalDate = `${weekday}, ${day}${getDaySuffix(day)} ${month}, ${year}`;

  // State for digital clock with AM/PM
  const [time, setTime] = useState<string>(
    new Date().toLocaleTimeString("en-US", { 
      hour12: true, 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-US", { 
        hour12: true, 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-between items-center p-5 bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10 font-Nunito">
      <DashboardHamburgerMenu />
      <div className="hidden md:block">
        <h1 className="text-2xl font-semibold text-gray-800">
          Welcome back, Admin
        </h1>
        <div className="flex items-center gap-2">
          <p className="text-gray-600">{finalDate}</p>
          |
        <p className="text-gray-800">{time}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="bg-green-50 px-3 py-2 rounded flex flex-col">
          <p className="text-sm text-gray-800">
          Total Sales
        </p>
          <h1 className="text-xl font-semibold text-gray-800">
          {data?.data?.length || 0}
        </h1>
        </div>
        <div className="bg-red-50 px-3 py-2 rounded flex flex-col">
          <p className="text-sm text-gray-800">
          Total Pending Amount
        </p>
          <h1 className="text-xl font-semibold text-gray-800">
          ₹{totals.totalPending || 0}
        </h1>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;