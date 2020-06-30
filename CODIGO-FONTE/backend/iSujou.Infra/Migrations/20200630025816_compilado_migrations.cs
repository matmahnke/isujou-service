using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace iSujou.Infra.Migrations
{
    public partial class compilado_migrations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Archievement");

            migrationBuilder.DropColumn(
                name: "Archievement",
                table: "UserInfo");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "UserInfo",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhotoUrl",
                table: "UserInfo",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreationDate",
                table: "Feedback",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<long>(
                name: "ProposalId",
                table: "Feedback",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateTable(
                name: "Achievement",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Status = table.Column<int>(nullable: false),
                    Points = table.Column<int>(nullable: false),
                    UserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Achievement", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Achievement_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            //migrationBuilder.CreateIndex(
            //    name: "IX_Feedback_ProposalId",
            //    table: "Feedback",
            //    column: "ProposalId",
            //    unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Achievement_UserId",
                table: "Achievement",
                column: "UserId");

            //migrationBuilder.AddForeignKey(
            //    name: "FK_Feedback_Proposal_ProposalId",
            //    table: "Feedback",
            //    column: "ProposalId",
            //    principalTable: "Proposal",
            //    principalColumn: "Id",
            //    onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropForeignKey(
            //    name: "FK_Feedback_Proposal_ProposalId",
            //    table: "Feedback");

            migrationBuilder.DropTable(
                name: "Achievement");

            //migrationBuilder.DropIndex(
            //    name: "IX_Feedback_ProposalId",
            //    table: "Feedback");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "UserInfo");

            migrationBuilder.DropColumn(
                name: "PhotoUrl",
                table: "UserInfo");

            migrationBuilder.DropColumn(
                name: "CreationDate",
                table: "Feedback");

            migrationBuilder.DropColumn(
                name: "ProposalId",
                table: "Feedback");

            migrationBuilder.AddColumn<int>(
                name: "Archievement",
                table: "UserInfo",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Archievement",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Points = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Archievement", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Archievement_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Archievement_UserId",
                table: "Archievement",
                column: "UserId");
        }
    }
}
