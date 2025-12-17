import { Link, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Building2, BedDouble, LogOut, List } from "lucide-react";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Token මකලා Login එකට යවනවා
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* --- Sidebar (වම් පැත්තේ මෙනු එක) --- */}
      <div className="w-64 bg-gray-900 text-white flex flex-col shadow-xl">
        <div className="p-6 text-2xl font-bold border-b border-gray-800 flex items-center gap-2">
          <span>Admin Panel</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          
          {/* Dashboard Link */}
          <Link to="/admin" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition">
            <LayoutDashboard size={20} /> Dashboard
          </Link>

          {/* Manage Hotels Link (New) */}
          <Link to="/admin/hotels" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition">
            <List size={20} /> Manage Hotels
          </Link>

          {/* Add Hotel Link */}
          <Link to="/admin/add-hotel" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition">
            <Building2 size={20} /> Add Hotel
          </Link>

          {/* Add Room Link */}
          <Link to="/admin/add-room" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition">
            <BedDouble size={20} /> Add Room
          </Link>

        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-800">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-gray-800 hover:text-red-300 w-full rounded-lg transition font-medium">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>

      {/* --- Main Content (දකුණු පැත්තේ වැඩ කරන තැන) --- */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
            {/* මෙතනට තමයි අපි තෝරන පිටු ලෝඩ් වෙන්නේ */}
            <Outlet /> 
        </div>
      </div>

    </div>
  );
};

export default AdminLayout;