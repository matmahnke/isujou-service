using iSujou.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace iSujou.Infra.Mappings
{
    public class ArchievementMapping : IEntityTypeConfiguration<Archievement>
    {
        public void Configure(EntityTypeBuilder<Archievement> builder)
        {
            builder.HasOne(x => x.User)
                .WithMany();
        }
    }
}
