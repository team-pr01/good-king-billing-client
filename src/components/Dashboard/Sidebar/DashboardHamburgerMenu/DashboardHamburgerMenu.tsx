import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  AiFillHome,
  AiOutlineUsergroupAdd,
  AiOutlineShoppingCart,
  AiOutlineBoxPlot,
  AiOutlineSetting,
} from "react-icons/ai";
import { TbLogout2 } from "react-icons/tb";
import { HiMenuAlt2, HiOutlineUserGroup } from "react-icons/hi";
import { BiLocationPlus } from "react-icons/bi";
import logo from "../../../../assets/logo.png";

const DashboardHamburgerMenu = () => {
  const location = useLocation();
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const toggleHamburgerMenu = () => {
    setIsHamburgerOpen(!isHamburgerOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const closestDropdown = target.closest(".hamburgerMenu");
      if (isHamburgerOpen && closestDropdown === null) {
        setIsHamburgerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isHamburgerOpen]);

  const navLinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <AiFillHome /> },
    {
      name: "Users",
      path: "/admin/dashboard/users",
      icon: <HiOutlineUserGroup />,
    },
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
  return (
    <div className="relative hamburgerMenu flex xl:hidden">
      <button
        onClick={toggleHamburgerMenu}
        className="text-primary-10 text-3xl cursor-pointer rounded-lg flex items-center justify-center"
      >
        <HiMenuAlt2 />
      </button>

      {/* Background Overlay */}
      <div
        onClick={toggleHamburgerMenu}
        className={`fixed inset-0 bg-black z-50 transition-opacity duration-300 ${
          isHamburgerOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      {/* Side Menu */}
      <div
        className={`fixed inset-y-0 left-0 z-50 bg-primary-10 py-8 p-6 w-[250px] overflow-y-auto transition-all duration-300 transform flex flex-col items-start justify-between ${
          isHamburgerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-4">
          <img src={logo} alt="" className="w-48 mx-auto" />
          <div className="flex flex-col gap-2 mt-10">
            {navLinks?.map((link) => (
              <Link
                key={link?.name}
                to={link?.path}
                onClick={toggleHamburgerMenu}
                className={`flex items-center gap-2 rounded-lg p-2 transform transition-transform duration-500 hover:-translate-y-1 ${
                  location?.pathname === link?.path
                    ? "bg-white text-primary-10 font-semibold"
                    : "font-medium  text-white  bg-none"
                }`}
              >
                <div className="size-6 rounded-full flex items-center justify-center bg-primary-10 text-white">
                  {link?.icon}
                </div>
                {link?.name}
              </Link>
            ))}
          </div>
        </div>

        <button
          className={`text-lg flex items-center gap-2 rounded-lg p-2 transform transition-transform duration-500 hover:-translate-y-1 text-white font-semibold cursor-pointer`}
        >
          <TbLogout2 className="text-xl" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardHamburgerMenu;
