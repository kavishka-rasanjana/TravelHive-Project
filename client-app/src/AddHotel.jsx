import { useState } from "react";
import axios from "axios";
import { Save } from "lucide-react";

const AddHotel = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    city: "",
    imageUrl: "",
    rating: 0
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Token එක ගන්න (Login වෙලාද බලන්න)
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Please login first!");
        return;
    }

    try {
      await axios.post("https://localhost:7162/api/Hotels", formData, {
        headers: { Authorization: `Bearer ${token}` } // Token එක යවනවා
      });
      alert("Hotel Added Successfully!");
      // Form එක Reset කරන්න
      setFormData({ name: "", description: "", address: "", city: "", imageUrl: "", rating: 0 });
    } catch (error) {
      console.error(error);
      alert("Failed to add hotel.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Hotel</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
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
                <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://..." className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating (1-5)</label>
                <input name="rating" type="number" step="0.1" max="5" value={formData.rating} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none" required />
            </div>
        </div>

        <button type="submit" className="px-8 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition flex items-center gap-2">
            <Save size={20} /> Save Hotel
        </button>
      </form>
    </div>
  );
};

export default AddHotel;