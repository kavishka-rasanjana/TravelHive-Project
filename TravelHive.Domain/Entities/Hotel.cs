using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TravelHive.Domain.Entities
{
    public class Hotel
    {
        public int Id { get; set; } // Primary Key
        public string Name { get; set; } = string.Empty; // Hotel Name
        public string Description { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty; // Photo URL
        public decimal Rating { get; set; } // 1 to 5 Stars

        // Relationship: One Hotel has Many Rooms
        // (එක හෝටලයකට කාමර ගොඩක් තියෙන්න පුළුවන්)
        public List<Room> Rooms { get; set; } = new List<Room>();
    }
}