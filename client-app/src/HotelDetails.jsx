import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Wifi, Users, ArrowLeft, Star, MapPin, CheckCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";

function HotelDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Home එකෙන් එවපු හෝටලේ විස්තර මෙතනින් අල්ලගන්නවා
  const hotel = location.state?.hotel;

  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null); // Booking Modal එක සඳහා

  // කාමර ටික Backend එකෙන් ගේනවා
  useEffect(() => {
    axios.get(`https://localhost:7162/api/Rooms/hotel/${id}`)
      .then((res) => setRooms(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  // හෝටලේ විස්තර නැතුව කෙලින්ම ලින්ක් එකෙන් ආවොත් ආපහු යවන්න (Safety)
  if (!hotel) {
    return <div className="p-10 text-center">Loading or Invalid Access...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <Navbar />

      {/* 1. Top Banner Image Section */}
      <div className="relative h-[400px]">
        <img src={hotel.imageUrl} alt={hotel.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-8 text-white max-w-7xl mx-auto">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm mb-4 hover:text-primary transition">
                <ArrowLeft size={16} /> Back to Hotels
            </button>
            <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-4xl md:text-5xl font-bold mb-2"
            >
                {hotel.name}
            </motion.h1>
            <div className="flex items-center gap-4 text-gray-200">
                <div className="flex items-center gap-1"><MapPin size={18}/> {hotel.city}, {hotel.address}</div>
                <div className="flex items-center gap-1 text-yellow-400"><Star size={18} fill="currentColor"/> {hotel.rating} Ratings</div>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* 2. Left Side: Hotel Description */}
        <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">About this place</h2>
                <p className="text-gray-600 leading-relaxed">{hotel.description}</p>
                
                {/* Dummy Amenities (ලස්සනට පේන්න දැම්මේ) */}
                <div className="flex gap-4 mt-6 border-t pt-6">
                    <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium"><Wifi size={18}/> Free Wifi</div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg text-sm font-medium"><CheckCircle size={18}/> Free Cancellation</div>
                </div>
            </div>

            <h3 className="text-xl font-bold text-gray-800">Available Rooms</h3>
            
            {/* Rooms List */}
            <div className="space-y-4">
                {rooms.length === 0 ? (
                    <p className="text-gray-500">No rooms available at the moment.</p>
                ) : (
                    rooms.map((room) => (
                        <motion.div 
                            key={room.id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 hover:shadow-md transition"
                        >
                            <div>
                                <h4 className="text-xl font-bold text-gray-800">{room.roomType}</h4>
                                <div className="flex items-center gap-2 text-gray-500 mt-2 text-sm">
                                    <Users size={16} /> Max Capacity: {room.capacity} People
                                </div>
                                <div className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-bold ${room.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {room.isAvailable ? "Available" : "Sold Out"}
                                </div>
                            </div>
                            
                            <div className="text-right">
                                <p className="text-sm text-gray-400">Price per night</p>
                                <p className="text-2xl font-bold text-primary">LKR {room.pricePerNight.toLocaleString()}</p>
                                <button 
                                    onClick={() => setSelectedRoom(room)} // Modal එක Open කරනවා
                                    disabled={!room.isAvailable}
                                    className="mt-3 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-primary transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                    Book Now
                                </button>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>

        {/* 3. Right Side: Summary Card (Booking.com Style) */}
        <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-24 border border-gray-100">
                <h3 className="text-lg font-bold mb-4">Good to know</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> Check-in: 12:00 PM</li>
                    <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> Check-out: 11:00 AM</li>
                    <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> No Credit Card Needed</li>
                </ul>
                <div className="mt-6 bg-blue-50 p-4 rounded-xl text-blue-800 text-sm">
                    <strong>Tip:</strong> Prices might go up! Lock your price today.
                </div>
            </div>
        </div>

      </div>

      {/* 4. BOOKING MODAL (Pop-up) */}
      <AnimatePresence>
        {selectedRoom && (
            <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
                >
                    <div className="bg-gray-900 p-4 text-white flex justify-between items-center">
                        <h3 className="font-bold">Complete your booking</h3>
                        <button onClick={() => setSelectedRoom(null)}><X size={20} /></button>
                    </div>
                    
                    <div className="p-6 space-y-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-500">Selected Room</p>
                            <p className="font-bold text-gray-800">{selectedRoom.roomType}</p>
                            <p className="text-primary font-bold">LKR {selectedRoom.pricePerNight.toLocaleString()}</p>
                        </div>

                        {/* Booking Form */}
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
                                <input type="date" className="w-full border-gray-300 rounded-lg p-2 border focus:ring-2 focus:ring-primary outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
                                <input type="date" className="w-full border-gray-300 rounded-lg p-2 border focus:ring-2 focus:ring-primary outline-none" />
                            </div>
                        </div>

                        <button 
                            className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-blue-600 transition mt-4"
                            onClick={() => alert("අපි ඊළඟට මෙතනට Login එක සම්බන්ධ කරමු!")}
                        >
                            Confirm Booking
                        </button>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default HotelDetails;