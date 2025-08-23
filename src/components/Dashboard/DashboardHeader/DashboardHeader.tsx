
const DashboardHeader = () => {
  const handleLogout = () => {
    // Add your logout logic here
    console.log("User logged out");
  };

  return (
    <div className="flex justify-between items-center p-5 bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      {/* Left side with welcome text and page name */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Welcome back, Admin</h1>
        <p className="text-gray-600 mt-1 capitalize">Dashboard</p>
      </div>
      
      {/* Right side with logout button */}
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