import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AiFillHome,
  AiOutlineUsergroupAdd,
  AiOutlineShoppingCart,
  AiOutlineBoxPlot,
  AiOutlineSetting,
} from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import logo from "../../../assets/logo.png";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BiLocationPlus } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/Features/Auth/authSlice";

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <AiFillHome /> },
    { name: "Users", path: "/admin/dashboard/users", icon: <HiOutlineUserGroup /> },
    { name: "Area", path: "/admin/dashboard/area", icon: <BiLocationPlus /> },
    {
      name: "Clients",
      path: "/admin/dashboard/clients",
      icon: <AiOutlineUsergroupAdd />,
    },
    {
      name: "Orders",
      path: "/admin/dashboard/orders",
      icon: <AiOutlineShoppingCart />,
    },
    {
      name: "Products",
      path: "/admin/dashboard/products",
      icon: <AiOutlineBoxPlot />,
    },
    {
      name: "Settings",
      path: "/admin/dashboard/settings",
      icon: <AiOutlineSetting />,
    },
  ];

   const handleLogout = async () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <aside className="w-72 max-w-[240px] 2xl:max-w-[280px] h-screen sticky top-0 bg-white border-r border-gray-200 flex-shrink-0 py-6 px-4 hidden xl:flex flex-col justify-between gap-10 ">
      <img src={logo} alt="" className="w-48 mx-auto" />
      <div className="flex flex-col h-full">
        <nav className="flex-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link key={link.name} to={link.path}>
                <div
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 cursor-pointer transition-colors ${
                    isActive
                      ? "bg-green-100 text-green-700 font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-xl">{link.icon}</span>
                  <span>{link.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
      <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 border border-red-500 text-red-500 py-3 rounded-lg hover:bg-red-50 font-medium transition-colors duration-200 cursor-pointer">
        <FiLogOut className="w-5 h-5" />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
