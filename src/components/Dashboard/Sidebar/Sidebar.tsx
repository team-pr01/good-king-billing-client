import { Link, useLocation } from "react-router-dom";
import {
  AiFillHome,
  AiOutlineUsergroupAdd,
  AiOutlineShoppingCart,
  AiOutlineBoxPlot,
  AiOutlineSetting,
} from "react-icons/ai";

const Sidebar = () => {
  const location = useLocation();

  const navLinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <AiFillHome /> },
    { name: "Clients", path: "/admin/dashboard/clients", icon: <AiOutlineUsergroupAdd /> },
    { name: "Orders", path: "/admin/dashboard/orders", icon: <AiOutlineShoppingCart /> },
    { name: "Products", path: "/admin/dashboard/products", icon: <AiOutlineBoxPlot /> },
    { name: "Settings", path: "/admin/dashboard/settings", icon: <AiOutlineSetting /> },
  ];

  return (
      <aside className="w-72 max-w-[280px] h-screen sticky top-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex-shrink-0">
        <div className="flex flex-col h-full py-6 px-4">
          <nav className="flex-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link key={link.name} to={link.path}>
                  <div
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 cursor-pointer transition-colors ${
                      isActive
                        ? "bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 font-semibold"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
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
      </aside>
  );
};

export default Sidebar;
