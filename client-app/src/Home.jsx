import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MapPin, Star, ArrowRight, Search, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function Home() {
  const [hotels, setHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Port එක backend එකට ගැලපෙන්න වෙනස් කරගන්න
    axios.get("https://localhost:7162/api/Hotels")
      .then((res) => setHotels(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredHotels = hotels.filter((hotel) => 
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen flex flex-col font-sans">
      <Navbar />

      {/* --- 1. HERO SECTION (Dark Overlay for Perfect Text Contrast) --- */}
      <div className="relative h-[600px] flex items-center justify-center">
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1596436807738-6151c32cf94e?q=80&w=1470&auto=format&fit=crop" 
                alt="Travel Background" 
                className="w-full h-full object-cover"
            />
            {/* ✨ DARK OVERLAY: මේක නිසා තමයි සුදු අකුරු පැහැදිලිව පේන්නේ */}
            <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 w-full max-w-4xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <span className="text-yellow-400 font-bold tracking-widest uppercase text-sm mb-3 block">
                    Explore Sri Lanka
                </span>
                <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-lg leading-tight">
                    Find Your <br/> <span className="text-blue-300">Perfect Getaway</span>
                </h1>
                <p className="text-gray-200 text-lg mb-8 max-w-2xl mx-auto font-light">
                    Discover luxury hotels, cozy villas, and amazing experiences across the island.
                </p>
            </motion.div>
            
            {/* Search Bar (Glass Effect) */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-full flex items-center max-w-2xl mx-auto shadow-2xl"
            >
                <div className="pl-6 text-white/70">
                    <Search size={24} />
                </div>
                <input 
                    type="text" 
                    placeholder="Search hotels or cities..." 
                    className="w-full px-4 py-3 text-white placeholder-gray-300 text-lg outline-none bg-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-bold transition shadow-lg">
                    Search
                </button>
            </motion.div>
        </div>
      </div>

      {/* --- 2. HOTELS SECTION --- */}
      <div className="bg-gray-50 py-20 flex-grow">
        <div className="max-w-7xl mx-auto px-4">
            
            {/* Section Header */}
            <div className="flex justify-between items-end mb-10 border-b border-gray-200 pb-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Featured Hotels</h2>
                    <p className="text-gray-500 mt-2">Best places to stay in Sri Lanka</p>
                </div>
            </div>
            
            {/* Hotel Grid */}
            {filteredHotels.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-gray-400 text-xl">No hotels found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredHotels.map((hotel, index) => (
                    <motion.div 
                        key={hotel.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 group cursor-pointer"
                        onClick={() => navigate(`/hotel/${hotel.id}`, { state: { hotel } })}
                    >
                        {/* Image */}
                        <div className="relative h-64 overflow-hidden">
                            <img 
                                src={hotel.imageUrl} 
                                alt={hotel.name} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                            />
                            {/* Dark gradient at bottom of image for text readability if needed */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
                            
                            {/* Rating Badge */}
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                                <Star className="text-yellow-500 fill-yellow-500" size={14} />
                                <span className="font-bold text-sm text-gray-900">{hotel.rating}</span>
                            </div>
                        </div>
                        
                        {/* Card Content */}
                        <div className="p-6">
                            <div className="flex items-center text-blue-600 text-xs font-bold uppercase tracking-wide mb-2">
                                <MapPin size={14} className="mr-1" /> {hotel.city}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                {hotel.name}
                            </h3>
                            <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-4">
                                {hotel.description}
                            </p>
                            
                            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-400">Starting from</span>
                                <button className="text-blue-600 font-bold text-sm flex items-center hover:underline">
                                    View Details <ArrowRight size={16} className="ml-1" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
                </div>
            )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;