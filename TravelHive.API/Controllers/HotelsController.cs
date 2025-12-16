using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TravelHive.Domain.Entities;
using TravelHive.Infrastructure.Data;
using TravelHive.Application.DTOs;

namespace TravelHive.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        // Constructor Injection: අපි හදපු DbContext එක මෙතනට ඉල්ලගන්නවා
        public HotelsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // 1. හෝටලයක් අලුතින් ඇතුලත් කිරීම (POST)
        [HttpPost]
        // 1. හෝටලයක් අලුතින් ඇතුලත් කිරීම (POST)
        [HttpPost]
        public async Task<IActionResult> CreateHotel(CreateHotelDto hotelDto)
        {
            // DTO එකේ තියෙන දත්ත පාවිච්චි කරලා අලුත් Hotel Entity එකක් හදනවා (Manual Mapping)
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
            // Database එකෙන් හෝටල් ඔක්කොම ලිස්ට් එකක් විදියට ගන්නවා
            var hotels = await _context.Hotels.ToListAsync();

            return Ok(hotels);
        }
    }
}