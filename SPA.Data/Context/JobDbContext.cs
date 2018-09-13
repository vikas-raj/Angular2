namespace SPA.Data
{
    using Microsoft.EntityFrameworkCore;
    using SPA.Model;

    public class JobDbContext : DbContext
    {
        public JobDbContext(DbContextOptions<JobDbContext> options)
            : base(options)
        {
        }

        public DbSet<JobDetails> JobDetails { get; set; }
        public DbSet<User> User { get; set; }
    }
}