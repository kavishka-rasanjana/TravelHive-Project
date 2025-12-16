using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TravelHive.Application.DTOs;
using TravelHive.Domain.Entities;

namespace TravelHive.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;

        
        public AccountController(UserManager<ApplicationUser> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }

        // 1. REGISTER Endpoint
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            // make new user
            var user = new ApplicationUser
            {
                UserName = dto.Email, 
                Email = dto.Email,
                FirstName = dto.FirstName,
                LastName = dto.LastName
            };

            
            var result = await _userManager.CreateAsync(user, dto.Password);

            if (result.Succeeded)
            {
                return Ok(new { message = "User registered successfully!" });
            }

            return BadRequest(result.Errors);
        }

        // 2. LOGIN Endpoint
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null) return Unauthorized("Invalid Email or Password");

           
            var isPasswordValid = await _userManager.CheckPasswordAsync(user, dto.Password);
            if (!isPasswordValid) return Unauthorized("Invalid Email or Password");

            
            var token = GenerateJwtToken(user);
            return Ok(new { token = token, userId = user.Id, email = user.Email });
        }

        
        private string GenerateJwtToken(ApplicationUser user)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var key = Encoding.UTF8.GetBytes(jwtSettings["Key"]!);

            
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id), // User ID
                new Claim(JwtRegisteredClaimNames.Email, user.Email!), // Email
                new Claim(ClaimTypes.Name, user.FirstName) // Name
            };

            
            var creds = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            
            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}