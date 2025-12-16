namespace TravelHive.Application.DTOs
{
    public class CreateRoomDto
    {
        public string RoomType { get; set; } = string.Empty; // e.g. "Luxury", "Double"
        public decimal PricePerNight { get; set; }
        public bool IsAvailable { get; set; } = true;
        public int Capacity { get; set; }

        // මේ කාමරේ අයිති හෝටලේ ID එක අපි අනිවාර්යයෙන් එවන්න ඕන
        public int HotelId { get; set; }
    }
}