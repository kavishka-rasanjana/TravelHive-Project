import { Link } from "react-router-dom";
import { Plane, User, Menu } from "lucide-react"; // Icons
import { motion } from "framer-motion"; // Animation

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2">
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
                <Plane className="h-8 w-8 text-primary" />
            </motion.div>
            <span className="text-2xl font-bold text-dark">TravelHive</span>
          </Link>

          {/* Menu Items */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary transition">Home</Link>
            <Link to="#" className="text-gray-700 hover:text-primary transition">Destinations</Link>
            <Link to="#" className="text-gray-700 hover:text-primary transition">About</Link>
          </div>

          {/* Login Button */}
          {/* Login Button Section */}
<div className="flex items-center gap-4">
    {/* Link Component එක පාවිච්චි කරන්න */}
    
    <Link to="/admin" className="text-sm font-medium text-gray-600 hover:text-primary mr-4">
    Admin Panel
</Link>
    <Link to="/login"> 
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full hover:bg-blue-600 transition shadow-lg">
            <User size={18} />
            <span>Login</span>
        </button>
    </Link>
</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;