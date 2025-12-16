import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MapPin, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar"; // Navbar එක import කරගන්න

function Home() {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://localhost:7162/api/Hotels")
      .then((res) => setHotels(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar /> {/* Navbar එක උඩින්ම */}

      {/* Hero Section (ලොකු පින්තූර කොටස) */}
      <div className="relative h-[500px] flex items-center justify-center">
        {/* Background Image */}
        <div 
            className="absolute inset-0 z-0"
            style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.6)' // පින්තූරය පොඩ්ඩක් අඳුරු කිරීම
            }}
        ></div>
        
        <div className="relative z-10 text-center text-white px-4">
            <motion.h1 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-6xl font-bold mb-4"
            >
                Discover Sri Lanka
            </motion.h1>
            <motion.p 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl mb-8"
            >
                Find the best hotels & places to stay
            </motion.p>
        </div>
      </div>

      {/* Hotel Grid Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured Hotels</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel, index) => (
            <motion.div 
                key={hotel.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }} // කාඩ් එකින් එක එන්න
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <img src={hotel.imageUrl} alt={hotel.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-lg flex items-center gap-1 shadow">
                    <Star className="text-yellow-400 fill-yellow-400" size={16} />
                    <span className="font-bold text-sm">{hotel.rating}</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{hotel.name}</h3>
                <div className="flex items-center text-gray-500 mb-4">
                    <MapPin size={16} className="mr-1" />
                    <span className="text-sm">{hotel.city}</span>
                </div>
                <p className="text-gray-600 text-sm mb-6 line-clamp-2">{hotel.description}</p>
                
                <button 
                   onClick={() => navigate(`/hotel/${hotel.id}`, { state: { hotel } })} // { state: { hotel } } කොටස එකතු කරන්න
                   className="w-full py-3 bg-gray-900 text-white rounded-xl flex items-center justify-center gap-2 hover:bg-primary transition-colors">
                   View Rooms <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;