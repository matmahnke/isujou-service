using iSujou.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace iSujou.Infra.Mappings
{
    public abstract class AuditorshipEntityMapping<T> : IEntityTypeConfiguration<T>
        where T : AuditorshipEntity
    {
        public virtual void Configure(EntityTypeBuilder<T> builder)
        {
            //builder.HasOne(x => x.Creator)
            //    .WithMany()
            //    .HasForeignKey(x => x.CreatorId)
            //    .OnDelete(DeleteBehavior.Restrict);

            //builder.HasOne(x => x.Editor)
            //    .WithMany()
            //    .HasForeignKey(x => x.EditorId)
            //    .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
