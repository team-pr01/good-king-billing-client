import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/Features/Auth/authSlice";

const DashboardHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleLogout = async () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center p-5 bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Welcome back, Admin
        </h1>
        <p className="text-gray-600 mt-1">{finalDate}</p>
      </div>
      <div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
