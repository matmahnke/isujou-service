﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using iSujou.Infra;

namespace iSujou.Infra.Migrations
{
    [DbContext(typeof(iSujouContext))]
    partial class iSujouContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("iSujou.Domain.Entities.Advert", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long>("PropertyId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("PropertyId")
                        .IsUnique();

                    b.ToTable("Advert");
                });

            modelBuilder.Entity("iSujou.Domain.Entities.AdvertTask", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long>("AdvertId")
                        .HasColumnType("bigint");

                    b.Property<DateTime?>("CompletedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("AdvertId");

                    b.ToTable("AdvertTask");
                });

            modelBuilder.Entity("iSujou.Domain.Entities.Contract", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<decimal>("AgreedValue")
                        .HasColumnType("decimal(18,2)");

                    b.Property<DateTime?>("EndTerm")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("HiredSignatureDate")
                        .HasColumnType("datetime2");

                    b.Property<long?>("OwnerId")
                        .HasColumnType("bigint");

                    b.Property<DateTime?>("OwnerSignatureDate")
                        .HasColumnType("datetime2");

                    b.Property<long?>("ProposalId")
                        .HasColumnType("bigint");

                    b.Property<DateTime>("StartTerm")
                        .HasColumnType("datetime2");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("OwnerId");

                    b.HasIndex("ProposalId")
                        .IsUnique()
                        .HasFilter("[ProposalId] IS NOT NULL");

                    b.ToTable("Contract");
                });

            modelBuilder.Entity("iSujou.Domain.Entities.Property", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Cep")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Complement")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Neighborhood")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Number")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("OwnerId")
                        .HasColumnType("bigint");

                    b.Property<int>("State")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("OwnerId")
                        .IsUnique();

                    b.ToTable("Property");
                });

            modelBuilder.Entity("iSujou.Domain.Entities.Proposal", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long?>("AdvertId")
                        .HasColumnType("bigint");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<decimal>("Value")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Id");

                    b.HasIndex("AdvertId");

                    b.ToTable("Proposal");
                });

            modelBuilder.Entity("iSujou.Domain.Entities.User", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("BirthDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Cpf")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Gender")
                        .HasColumnType("int");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("User");
                });

            modelBuilder.Entity("iSujou.Domain.Entities.Advert", b =>
                {
                    b.HasOne("iSujou.Domain.Entities.Property", "Property")
                        .WithOne()
                        .HasForeignKey("iSujou.Domain.Entities.Advert", "PropertyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("iSujou.Domain.Entities.AdvertTask", b =>
                {
                    b.HasOne("iSujou.Domain.Entities.Advert", "Advert")
                        .WithMany()
                        .HasForeignKey("AdvertId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("iSujou.Domain.Entities.Contract", b =>
                {
                    b.HasOne("iSujou.Domain.Entities.User", "Owner")
                        .WithMany()
                        .HasForeignKey("OwnerId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("iSujou.Domain.Entities.Proposal", "Proposal")
                        .WithOne()
                        .HasForeignKey("iSujou.Domain.Entities.Contract", "ProposalId")
                        .OnDelete(DeleteBehavior.SetNull);
                });

            modelBuilder.Entity("iSujou.Domain.Entities.Property", b =>
                {
                    b.HasOne("iSujou.Domain.Entities.User", "Owner")
                        .WithOne()
                        .HasForeignKey("iSujou.Domain.Entities.Property", "OwnerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("iSujou.Domain.Entities.Proposal", b =>
                {
                    b.HasOne("iSujou.Domain.Entities.Advert", "Advert")
                        .WithMany()
                        .HasForeignKey("AdvertId")
                        .OnDelete(DeleteBehavior.SetNull);
                });
#pragma warning restore 612, 618
        }
    }
}
