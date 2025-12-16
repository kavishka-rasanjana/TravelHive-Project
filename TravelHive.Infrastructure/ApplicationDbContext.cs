using Microsoft.AspNetCore.Identity.EntityFrameworkCore; // මේක අනිවාර්යයි
using Microsoft.EntityFrameworkCore;
using TravelHive.Domain.Entities;

namespace TravelHive.Infrastructure.Data
{
    // DbContext වෙනුවට IdentityDbContext<ApplicationUser> දාන්න
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Hotel> Hotels { get; set; }
        public DbSet<Room> Rooms { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); // මේක අනිවාර්යයෙන් තියෙන්න ඕන Identity Tables හැදෙන්න

            modelBuilder.Entity<Room>()
                .Property(r => r.PricePerNight)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Hotel>()
                .Property(h => h.Rating)
                .HasColumnType("decimal(2,1)");
        }
    }
}