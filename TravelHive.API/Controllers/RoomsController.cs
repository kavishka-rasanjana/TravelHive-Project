using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TravelHive.Application.DTOs;
using TravelHive.Domain.Entities;
using TravelHive.Infrastructure.Data;

namespace TravelHive.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RoomsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateRoom(CreateRoomDto roomDto)
        {
            // 1. මුලින්ම බලනවා හෝටලය තියෙනවද කියලා
            var hotelExists = await _context.Hotels.AnyAsync(h => h.Id == roomDto.HotelId);
            if (!hotelExists)
            {
                return BadRequest("Invalid Hotel ID. Hotel not found.");
            }

            // 2. හෝටලය තියෙනවා නම් Room එක හදනවා
            var room = new Room
            {
                RoomType = roomDto.RoomType,
                PricePerNight = roomDto.PricePerNight,
                IsAvailable = roomDto.IsAvailable,
                Capacity = roomDto.Capacity,
                HotelId = roomDto.HotelId
            };

            _context.Rooms.Add(room);
            await _context.SaveChangesAsync();

            return Ok(room);
        }

        // හෝටලයකට අදාළ කාමර ටික ගන්න (Get Rooms by Hotel Id)
        [HttpGet("hotel/{hotelId}")]
        public async Task<IActionResult> GetRoomsByHotel(int hotelId)
        {
            var rooms = await _context.Rooms
                                      .Where(r => r.HotelId == hotelId)
                                      .ToListAsync();
            return Ok(rooms);
        }
    }
}