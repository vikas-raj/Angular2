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
        public DbSet<Like> Likes { get; set; }
        public DbSet<Comment> Comments { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Like>()
           .HasOne(pt => pt.JobDetails)
           .WithMany(p => p.Likes)
           .HasForeignKey(pt => pt.JobDetailFk);

            modelBuilder.Entity<Comment>()
           .HasOne(pt => pt.JobDetails)
           .WithMany(p => p.Comments)
           .HasForeignKey(pt => pt.JobDetailFk);
        }
    }
}