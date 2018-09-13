using Microsoft.EntityFrameworkCore;
using SPA.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace SPA.Data.Context
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        //public DbSet<Value> Values { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
