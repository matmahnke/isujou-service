using iSujou.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace iSujou.Infra.Mappings
{
    public class ProposalMapping : IEntityTypeConfiguration<Proposal>
    {
        public void Configure(EntityTypeBuilder<Proposal> builder)
        {
            builder.HasOne(x => x.Advert)
                .WithMany()
                .HasForeignKey(x => x.AdvertId)
                .OnDelete(DeleteBehavior.SetNull);

            builder.HasOne(x => x.Candidate)
                .WithMany()
                .IsRequired();

            builder.Property(x => x.Value)
                .IsRequired();

            builder.Property(x => x.Status)
                .IsRequired();
        }
    }
}
