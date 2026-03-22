// DashboardCard.tsx
import React from "react";
import { Link } from "react-router-dom";

type DashboardCardProps = {
  title: string;
  value: number | string;
  Icon: React.ElementType; // React Icon component
  bgColor?: string; // optional background color for icon circle
  link?:string;
};

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  Icon,
  link= "/admin/dashboard",
  bgColor = "bg-primary-10", // default circle bg
}) => {
  return (
    <Link to={link} className="flex flex-col-reverse md:flex-row md:justify-between gap-3 md:gap-0 justify-center items-center text-center md:text-start p-3 md:p-6 bg-white rounded-lg shadow-sm border border-gray-200 font-Nunito">
      {/* Left: Text */}
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800 mt-2">{value}</p>
      </div>

      {/* Right: Icon Circle */}
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-full ${bgColor}`}
      >
        <Icon className="text-white text-xl" />
      </div>
    </Link>
  );
};

export default DashboardCard;
