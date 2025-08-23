// DashboardCard.tsx
import React from "react";

type DashboardCardProps = {
  title: string;
  value: number | string;
  Icon: React.ElementType; // React Icon component
  bgColor?: string; // optional background color for icon circle
};

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  Icon,
  bgColor = "bg-primary-10", // default circle bg
}) => {
  return (
    <div className="flex justify-between items-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Left: Text */}
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>

      {/* Right: Icon Circle */}
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-full ${bgColor}`}
      >
        <Icon className="text-white text-xl" />
      </div>
    </div>
  );
};

export default DashboardCard;
