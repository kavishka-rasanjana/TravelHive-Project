using Microsoft.AspNetCore.Identity;

namespace TravelHive.Domain.Entities
{
    // IdentityUser එකෙන් තමයි Email, PasswordHash, PhoneNumber වගේ දේවල් එන්නේ.
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
    }
}