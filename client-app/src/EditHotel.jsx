import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Save } from "lucide-react";

const EditHotel = () => {
  const { id } = useParams(); // URL එකෙන් ID එක ගන්නවා
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: 0, name: "", description: "", address: "", city: "", imageUrl: "", rating: 0
  });

  // පරණ ඩේටා ටික ගේනවා
  useEffect(() => {
    axios.get(`https://localhost:7162/api/Hotels`) // Note: හොඳම දේ GetById API එකක් තියෙන එක. දැනට අපි ලිස්ට් එකෙන් ෆිල්ටර් කරමු.
      .then((res) => {
        const hotel = res.data.find(h => h.id == id);
        if(hotel) setFormData(hotel);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      // PUT Request එක යවනවා
      await axios.put(`https://localhost:7162/api/Hotels/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Hotel Updated Successfully!");
      navigate("/admin/hotels"); // ආපහු ලිස්ට් එකට යවනවා
    } catch (error) {
      console.error(error);
      alert("Failed to update hotel.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Hotel</h2>
      <form onSubmit={handleUpdate} className="space-y-6">
        {/* AddHotel Form එකේ Fields ටිකමයි මෙතන තියෙන්නේ */}
        <div className="grid grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hotel Name</label>
                <input name="name" value={formData.name} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input name="city" value={formData.city} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none" required />
            </div>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none" required></textarea>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <input name="address" value={formData.address} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none" required />
        </div>
        <div className="grid grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <input name="rating" type="number" step="0.1" value={formData.rating} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none" required />
            </div>
        </div>
        <button type="submit" className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition flex items-center gap-2">
            <Save size={20} /> Update Hotel
        </button>
      </form>
    </div>
  );
};

export default EditHotel;