import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Wifi, Users, ArrowLeft, Star, MapPin, CheckCircle, X, Calendar, Coffee, Car } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";

function HotelDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Home Page එකෙන් එවපු හෝටලේ විස්තර අල්ලගන්නවා
  // (කෙලින්ම ලින්ක් එකෙන් ආවොත් මේක null වෙන්න පුළුවන්)
  const hotel = location.state?.hotel;

  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null); // Modal එක පාලනය කරන්න

  // කාමර ටික Backend එකෙන් ගේනවා
  useEffect(() => {
    // Port එක ඔයාගේ Backend එකේ Port එකට වෙනස් කරගන්න (7162 හෝ 5064)
    axios.get(`https://localhost:7162/api/Rooms/hotel/${id}`)
      .then((res) => setRooms(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  // හෝටලේ විස්තර නැතුව ආවොත් (Safety Check)
  if (!hotel) {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-800">Hotel Not Found</h2>
            <button onClick={() => navigate("/")} className="mt-4 px-6 py-2 bg-primary text-white rounded-lg">Go Home</button>
        </div>
    );
  }

  // Booking Confirm කරන Function එක
  const handleBooking = () => {
    const token = localStorage.getItem("token");
    if(!token) {
        alert("Please Login to Book a Room!");
        navigate("/login");
        return;
    }
    // මෙතනට පස්සේ Booking API call එක ලියන්න පුළුවන්
    alert(`Booking Confirmed for ${selectedRoom.roomType}! (This is a demo)`);
    setSelectedRoom(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <Navbar />

      {/* --- 1. TOP BANNER IMAGE --- */}
      <div className="relative h-[450px]">
        <img src={hotel.imageUrl} alt={hotel.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white max-w-7xl mx-auto">
            <button 
                onClick={() => navigate(-1)} 
                className="flex items-center gap-2 text-sm mb-6 hover:text-primary transition bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm w-fit"
            >
                <ArrowLeft size={16} /> Back to Hotels
            </button>
            
            <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-4xl md:text-6xl font-bold mb-3"
            >
                {hotel.name}
            </motion.h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-200 text-lg">
                <div className="flex items-center gap-2"><MapPin size={20} className="text-primary"/> {hotel.city}, {hotel.address}</div>
                <div className="flex items-center gap-2"><Star size={20} className="text-yellow-400 fill-yellow-400"/> {hotel.rating} / 5.0</div>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* --- 2. LEFT SIDE (DESCRIPTION & ROOMS) --- */}
        <div className="lg:col-span-2 space-y-10">
            
            {/* Description Card */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">About this stay</h2>
                <p className="text-gray-600 leading-relaxed text-lg">{hotel.description}</p>
                
                {/* Amenities (Dummy Data for UI) */}
                <h3 className="text-lg font-bold mt-8 mb-4 text-gray-800">Popular Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl text-gray-600"><Wifi size={20}/> Free Wifi</div>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl text-gray-600"><Car size={20}/> Parking</div>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl text-gray-600"><Coffee size={20}/> Breakfast</div>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl text-gray-600"><CheckCircle size={20}/> AC</div>
                </div>
            </div>

            {/* Google Map Section */}
            <div className="bg-white p-2 rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 pb-2">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <MapPin className="text-primary" /> Location
                    </h2>
                </div>
                <div className="w-full h-[350px] bg-gray-200 rounded-2xl overflow-hidden">
                    <iframe 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        loading="lazy" 
                        allowFullScreen
                        title="Hotel Location"
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(hotel.name + " " + hotel.city)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    >
                    </iframe>
                </div>
            </div>

            {/* Room List Section */}
            <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Available Rooms</h3>
                <div className="space-y-4">
                    {rooms.length === 0 ? (
                        <div className="text-center p-10 bg-white rounded-2xl border border-dashed border-gray-300 text-gray-500">
                            Loading rooms or no rooms available...
                        </div>
                    ) : (
                        rooms.map((room) => (
                            <motion.div 
                                key={room.id}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 hover:shadow-md transition duration-300"
                            >
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h4 className="text-xl font-bold text-gray-800">{room.roomType}</h4>
                                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${room.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {room.isAvailable ? "Available" : "Booked"}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-gray-500 mt-3 text-sm">
                                        <span className="flex items-center gap-1"><Users size={16} /> {room.capacity} Guests</span>
                                        <span className="flex items-center gap-1"><CheckCircle size={16} /> Free Cancellation</span>
                                    </div>
                                </div>
                                
                                <div className="text-right w-full md:w-auto border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                                    <p className="text-xs text-gray-400 uppercase tracking-wide">Price per night</p>
                                    <p className="text-2xl font-bold text-primary">LKR {room.pricePerNight.toLocaleString()}</p>
                                    <button 
                                        onClick={() => setSelectedRoom(room)} 
                                        disabled={!room.isAvailable}
                                        className="mt-3 w-full px-6 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-primary transition disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                                    >
                                        {room.isAvailable ? "Book Now" : "Sold Out"}
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>

        {/* --- 3. RIGHT SIDE (STICKY INFO) --- */}
        <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 sticky top-24">
                <h3 className="text-lg font-bold mb-4 border-b pb-2">Good to know</h3>
                <ul className="space-y-4 text-sm text-gray-600">
                    <li className="flex items-start gap-3">
                        <CheckCircle size={18} className="text-green-500 mt-0.5"/> 
                        <span><strong>Check-in:</strong> From 12:00 PM onwards</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle size={18} className="text-green-500 mt-0.5"/> 
                        <span><strong>Check-out:</strong> Until 11:00 AM</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckCircle size={18} className="text-green-500 mt-0.5"/> 
                        <span><strong>Cancellation:</strong> Free cancellation up to 24hrs before arrival.</span>
                    </li>
                </ul>
                
                <div className="mt-8 bg-blue-50 p-4 rounded-xl">
                    <p className="text-blue-800 text-sm font-medium text-center">
                        Need Help? <br/> Call <strong>+94 77 123 4567</strong>
                    </p>
                </div>
            </div>
        </div>

      </div>

      {/* --- 4. BOOKING MODAL (POPUP) --- */}
      <AnimatePresence>
        {selectedRoom && (
            <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
                >
                    <div className="bg-gray-900 p-6 text-white flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-lg">Complete Booking</h3>
                            <p className="text-gray-400 text-xs">Final step to secure your stay</p>
                        </div>
                        <button onClick={() => setSelectedRoom(null)} className="bg-white/10 p-2 rounded-full hover:bg-white/20"><X size={20} /></button>
                    </div>
                    
                    <div className="p-6 space-y-5">
                        <div className="bg-blue-50 p-4 rounded-2xl flex justify-between items-center border border-blue-100">
                            <div>
                                <p className="text-xs text-blue-600 font-bold uppercase">Selected Room</p>
                                <p className="font-bold text-gray-800">{selectedRoom.roomType}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-primary font-bold text-lg">LKR {selectedRoom.pricePerNight.toLocaleString()}</p>
                                <p className="text-xs text-gray-500">/night</p>
                            </div>
                        </div>

                        {/* Date Inputs */}
                        <div className="space-y-4">
                            <div className="relative">
                                <label className="block text-xs font-bold text-gray-700 mb-1 ml-1 uppercase">Check-in Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-3 text-gray-400" size={18}/>
                                    <input type="date" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none text-sm font-medium" />
                                </div>
                            </div>
                            <div className="relative">
                                <label className="block text-xs font-bold text-gray-700 mb-1 ml-1 uppercase">Check-out Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-3 text-gray-400" size={18}/>
                                    <input type="date" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none text-sm font-medium" />
                                </div>
                            </div>
                        </div>

                        <button 
                            className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-blue-600 transition shadow-lg mt-2 flex justify-center gap-2 items-center"
                            onClick={handleBooking}
                        >
                            Confirm Booking <CheckCircle size={18} />
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