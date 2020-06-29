using iSujou.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace iSujou.Infra.Mappings
{
    public class FeedbackMapping : IEntityTypeConfiguration<Feedback>
    {
        public void Configure(EntityTypeBuilder<Feedback> builder)
        {
            builder.HasOne(x => x.Creator)
                .WithMany()
                .HasForeignKey(x => x.CreatorId);

            builder.HasOne(x => x.Receiver)
                .WithMany()
                .HasForeignKey(x => x.ReceiverId);
        }
    }
}
