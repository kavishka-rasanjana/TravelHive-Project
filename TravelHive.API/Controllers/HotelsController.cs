using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TravelHive.Application.DTOs;
using TravelHive.Domain.Entities;
using TravelHive.Infrastructure.Data;

namespace TravelHive.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public HotelsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // 1. හෝටලයක් අලුතින් ඇතුලත් කිරීම (POST)
        [HttpPost]
        public async Task<IActionResult> CreateHotel(CreateHotelDto hotelDto)
        {
            var hotel = new Hotel
            {
                Name = hotelDto.Name,
                Description = hotelDto.Description,
                Address = hotelDto.Address,
                City = hotelDto.City,
                ImageUrl = hotelDto.ImageUrl,
                Rating = hotelDto.Rating
            };

            _context.Hotels.Add(hotel);
            await _context.SaveChangesAsync();

            return Ok(hotel);
        }

        // 2. හෝටල් ඔක්කොම ලබා ගැනීම (GET)
        [HttpGet]
        public async Task<IActionResult> GetAllHotels()
        {
            var hotels = await _context.Hotels.ToListAsync();
            return Ok(hotels);
        }

        // 3. හෝටලයක් යාවත්කාලීන කිරීම (UPDATE)
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateHotel(int id, CreateHotelDto hotelDto)
        {
            var existingHotel = await _context.Hotels.FindAsync(id);
            if (existingHotel == null) return NotFound();

            existingHotel.Name = hotelDto.Name;
            existingHotel.Description = hotelDto.Description;
            existingHotel.Address = hotelDto.Address;
            existingHotel.City = hotelDto.City;
            existingHotel.ImageUrl = hotelDto.ImageUrl;
            existingHotel.Rating = hotelDto.Rating;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // 4. හෝටලයක් මැකීම (DELETE)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHotel(int id)
        {
            var hotel = await _context.Hotels.FindAsync(id);
            if (hotel == null) return NotFound();

            _context.Hotels.Remove(hotel);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}