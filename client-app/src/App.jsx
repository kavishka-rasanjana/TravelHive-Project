import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import HotelDetails from "./HotelDetails";
import Login from "./Login";
import Register from "./Register";

function App() {
  return (
    <div>
      {/* Navbar එක අපි හැම පිටුවකම වෙන වෙනම දාලා තියෙන නිසා 
          මෙතන දාන්න අවශ්‍ය නෑ. කෙලින්ම Routes ටික දාමු.
      */}
      
      <Routes>
        {/* මුල් පිටුව (Home Page) */}
        <Route path="/" element={<Home />} />

        {/* හෝටල් විස්තර පිටුව (Dynamic ID එකක් එක්ක) */}
        <Route path="/hotel/:id" element={<HotelDetails />} />

        {/* Login පිටුව */}
        <Route path="/login" element={<Login />} />

        {/* Register පිටුව */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;