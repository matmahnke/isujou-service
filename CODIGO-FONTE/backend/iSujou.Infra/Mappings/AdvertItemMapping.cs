using iSujou.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace iSujou.Infra.Mappings
{
    public class AdvertItemMapping : IEntityTypeConfiguration<AdvertItem>
    {
        public void Configure(EntityTypeBuilder<AdvertItem> builder)
        {
        }
    }
}
