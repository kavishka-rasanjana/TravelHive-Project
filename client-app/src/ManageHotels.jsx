import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Edit, Trash2, Plus } from "lucide-react";

const ManageHotels = () => {
  const [hotels, setHotels] = useState([]);

  // හෝටල් ටික ගේනවා
  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    const res = await axios.get("https://localhost:7162/api/Hotels");
    setHotels(res.data);
  };

  // Delete කරන Function එක
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this hotel?")) {
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`https://localhost:7162/api/Hotels/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Hotel Deleted!");
            fetchHotels(); // ලිස්ට් එක refresh කරන්න
        } catch (error) {
            console.error(error);
            alert("Failed to delete.");
        }
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Hotels</h2>
        <Link to="/admin/add-hotel" className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700">
            <Plus size={18} /> Add New
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6">ID</th>
                    <th className="py-3 px-6">Image</th>
                    <th className="py-3 px-6">Name</th>
                    <th className="py-3 px-6">City</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
                {hotels.map((hotel) => (
                    <tr key={hotel.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-6">{hotel.id}</td>
                        <td className="py-3 px-6">
                            <img src={hotel.imageUrl} alt="" className="w-10 h-10 rounded-full object-cover"/>
                        </td>
                        <td className="py-3 px-6 font-medium">{hotel.name}</td>
                        <td className="py-3 px-6">{hotel.city}</td>
                        <td className="py-3 px-6 text-center flex justify-center gap-3">
                            <Link to={`/admin/edit-hotel/${hotel.id}`} className="text-blue-500 hover:text-blue-700">
                                <Edit size={18} />
                            </Link>
                            <button onClick={() => handleDelete(hotel.id)} className="text-red-500 hover:text-red-700">
                                <Trash2 size={18} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageHotels;