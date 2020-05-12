using iSujou.Domain.Entities;
using iSujou.Infra.Mappings;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace iSujou.Infra
{
    public class iSujouContext : IdentityDbContext<User>
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
            modelBuilder = modelBuilder.ApplyConfiguration(new UserInfoMapping())
                .ApplyConfiguration(new UserMapping())
            .ApplyConfiguration(new PropertyMapping())
            .ApplyConfiguration(new ProposalMapping())
            .ApplyConfiguration(new ContractMapping())
            .ApplyConfiguration(new AdvertMapping())
            .ApplyConfiguration(new AdvertTaskMapping());
            base.OnModelCreating(modelBuilder);
        }
    }
}
