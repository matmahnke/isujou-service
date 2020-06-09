using iSujou.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace iSujou.Infra.Mappings
{
    public class ContractMapping : AuditorshipEntityMapping<Contract>
    {
        public override void Configure(EntityTypeBuilder<Contract> builder)
        {
            base.Configure(builder);

            builder.HasOne(x => x.Proposal)
                .WithOne()
                .OnDelete(DeleteBehavior.SetNull);

            builder.HasOne(x => x.Owner)
                .WithMany();

            builder.Property(x => x.OwnerSignatureDate)
                .IsRequired(false);

            builder.HasOne(x => x.Hired)
                .WithMany();

            builder.Property(x => x.HiredSignatureDate)
                .IsRequired(false);

            builder.Property(x => x.StartTerm)
                .IsRequired();

            builder.Property(x => x.EndTerm)
                .IsRequired(false);

            builder.Property(x => x.Status)
                .IsRequired();

            builder.Property(x => x.AgreedValue)
                .IsRequired();

            builder.Ignore(x => x.OwnerPersonSigned);
            builder.Ignore(x => x.HiredPersonSigned);
        }
    }
}
