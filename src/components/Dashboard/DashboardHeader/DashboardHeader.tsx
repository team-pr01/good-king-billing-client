import { useEffect, useState } from "react";
import DashboardHamburgerMenu from "../Sidebar/DashboardHamburgerMenu/DashboardHamburgerMenu";

const DashboardHeader = () => {
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

  // State for digital clock
  const [time, setTime] = useState<string>(
    new Date().toLocaleTimeString("en-GB", { hour12: false })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-GB", { hour12: false }));
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
    </div>
  );
};

export default DashboardHeader;
