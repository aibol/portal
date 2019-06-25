using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Portal.Models
{
    public class Db : DbContext
    {
        public Db(DbContextOptions<Db> options) : base(options)
        {
            this.Database.SetCommandTimeout(30000);
            //Database.SetInitializer(new MigrateDatabaseToLatestVersion<PointCheckContext, Vote.Migrations.Configuration>());
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Post>().HasOne<Production>().WithOne().HasForeignKey<Post>(o => o.ProductionId);
            modelBuilder.Entity<Post>().HasOne<SolutionItem>().WithMany().HasForeignKey(o => o.SolutionItemId);
        }

        public virtual DbSet<Post> Posts { get; set; }
        public virtual DbSet<Production> Productions { get; set; }
        public virtual DbSet<Solution> Solutions { get; set; }
        public virtual DbSet<SolutionItem> SolutionItems { get; set; }
    }
}
