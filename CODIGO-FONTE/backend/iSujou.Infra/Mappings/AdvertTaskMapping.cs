using iSujou.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace iSujou.Infra.Mappings
{
    public class AdvertTaskMapping : IEntityTypeConfiguration<AdvertTask>
    {
        public void Configure(EntityTypeBuilder<AdvertTask> builder)
        {
            builder.Property(x => x.Description)
                .IsRequired();

            builder.HasOne(x => x.Advert)
                .WithMany()
                .HasForeignKey(x => x.AdvertId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Ignore(x => x.Done);
        }
    }
}
