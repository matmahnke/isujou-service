using iSujou.Infra.Mappings;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace iSujou.Infra
{
    public class iSujouContext : DbContext
    {
        public iSujouContext(DbContextOptions<iSujouContext> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new LoginMapping());
            base.OnModelCreating(modelBuilder);
        }
    }
}
