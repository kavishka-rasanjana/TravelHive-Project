namespace TravelHive.Application.DTOs
{
    public class CreateHotelDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public decimal Rating { get; set; }
    }
}