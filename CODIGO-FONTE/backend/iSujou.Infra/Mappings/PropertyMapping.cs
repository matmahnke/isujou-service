using iSujou.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace iSujou.Infra.Mappings
{
    class PropertyMapping : IEntityTypeConfiguration<Property>
    {
        public void Configure(EntityTypeBuilder<Property> builder)
        {
            builder.HasOne(x => x.Owner)
                .WithMany();

            builder.Property(x => x.Title)
                .IsRequired();

            builder.Property(x => x.Description)
                .IsRequired();

            builder.Property(x => x.State)
                .IsRequired();

            builder.Property(x => x.City)
                .IsRequired();

            builder.Property(x => x.Neighborhood)
                .IsRequired();

            builder.Property(x => x.Cep)
                .IsRequired();

            builder.Property(x => x.Number)
                .IsRequired();

            builder.Property(x => x.Complement)
                .IsRequired();
        }
    }
}
