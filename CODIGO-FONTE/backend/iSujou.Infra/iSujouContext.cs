using iSujou.Infra.Mappings;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace iSujou.Infra
{
    public class iSujouContext : IdentityDbContext
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
            modelBuilder = modelBuilder.ApplyConfiguration(new UserMapping())
            .ApplyConfiguration(new PropertyMapping())
            .ApplyConfiguration(new ProposalMapping())
            .ApplyConfiguration(new ContractMapping())
            .ApplyConfiguration(new AdvertMapping())
            .ApplyConfiguration(new AdvertTaskMapping());
            base.OnModelCreating(modelBuilder);
        }
    }
}
