using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TravelHive.Domain.Entities
{
    public class Room
    {
        public int Id { get; set; }
        public string RoomType { get; set; } = string.Empty; // e.g., "Deluxe", "Single"
        public decimal PricePerNight { get; set; }
        public bool IsAvailable { get; set; } = true;
        public int Capacity { get; set; } // කිය දෙනෙක්ට ඉන්න පුලුවන්ද

        // Foreign Key (මේ කාමරේ අයිති මොන හෝටලයටද කියන එක)
        public int HotelId { get; set; }
        public Hotel? Hotel { get; set; }
    }
}