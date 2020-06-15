using iSujou.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace iSujou.Infra.Mappings
{
    public class AdvertMapping : AuditorshipEntityMapping<Advert>
    {
        public override void Configure(EntityTypeBuilder<Advert> builder)
        {
            base.Configure(builder);

            builder.HasOne(x => x.Property)
                .WithMany()
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(x => x.Items)
                .WithOne(x => x.Advert);

            builder.HasOne(x => x.Creator)
                .WithMany(x => x.Adverts)
                .HasForeignKey(x => x.CreatorId);
        }
    }
}
