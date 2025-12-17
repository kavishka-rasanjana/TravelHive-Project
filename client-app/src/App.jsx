import { Routes, Route } from "react-router-dom";

// Public Pages
import Home from "./Home";
import HotelDetails from "./HotelDetails";
import Login from "./Login";
import Register from "./Register";

// Admin Pages
import AdminLayout from "./components/AdminLayout";
import AddHotel from "./AddHotel";
import ManageHotels from "./ManageHotels"; // අලුත් පිටුව
import EditHotel from "./EditHotel";       // අලුත් පිටුව

function App() {
  return (
    <div>
      <Routes>
        {/* --- Public Routes (ඕනෑම කෙනෙක්ට බලන්න පුළුවන්) --- */}
        <Route path="/" element={<Home />} />
        <Route path="/hotel/:id" element={<HotelDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* --- Admin Routes (Admin Panel එක) --- */}
        <Route path="/admin" element={<AdminLayout />}>
            
            {/* 1. Dashboard Home */}
            <Route index element={<h2 className="text-2xl font-bold text-gray-800">Welcome to Admin Dashboard</h2>} />
            
            {/* 2. හෝටල් කළමනාකරණය කරන ලිස්ට් එක (Table) */}
            <Route path="hotels" element={<ManageHotels />} />

            {/* 3. අලුත් හෝටලයක් දාන පිටුව */}
            <Route path="add-hotel" element={<AddHotel />} />

            {/* 4. හෝටලයක් Edit කරන පිටුව (ID එකත් එක්ක) */}
            <Route path="edit-hotel/:id" element={<EditHotel />} />
            
            {/* 5. කාමර දාන පිටුව (තාම හැදුවේ නෑ) */}
            <Route path="add-room" element={<h2 className="text-2xl">Add Room Page Coming Soon...</h2>} />
        
        </Route>

      </Routes>
    </div>
  );
}

export default App;