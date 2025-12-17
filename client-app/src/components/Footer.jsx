import { Plane } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
            <div className="flex items-center gap-2 mb-4 text-primary">
                <Plane size={24} />
                <span className="text-2xl font-bold text-white">TravelHive</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
                Experience the beauty of Sri Lanka with our premium hotel booking service. Comfort and luxury guaranteed.
            </p>
        </div>
        
        <div>
            <h4 className="font-bold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link to="/" className="hover:text-primary transition">Home</Link></li>
                <li><Link to="/login" className="hover:text-primary transition">Login</Link></li>
                <li><Link to="/register" className="hover:text-primary transition">Register</Link></li>
            </ul>
        </div>

        <div>
            <h4 className="font-bold mb-4 text-lg">Support</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
                <li className="hover:text-primary cursor-pointer transition">FAQ</li>
                <li className="hover:text-primary cursor-pointer transition">Privacy Policy</li>
                <li className="hover:text-primary cursor-pointer transition">Terms of Service</li>
            </ul>
        </div>

        <div>
            <h4 className="font-bold mb-4 text-lg">Contact Us</h4>
            <p className="text-gray-400 text-sm">123, Galle Road, Colombo 03</p>
            <p className="text-gray-400 text-sm mt-2">hello@travelhive.lk</p>
            <p className="text-primary text-sm mt-2 font-bold">+94 77 123 4567</p>
        </div>
      </div>
      
      <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
        <p>© 2025 TravelHive. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;