using Microsoft.EntityFrameworkCore.Migrations;

namespace iSujou.Infra.Migrations
{
    public partial class edit_archievement : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Archievement_UserId",
                table: "Archievement");

            migrationBuilder.AddColumn<int>(
                name: "Archeivement",
                table: "Feedback",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Archievement_UserId",
                table: "Archievement",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Archievement_UserId",
                table: "Archievement");

            migrationBuilder.DropColumn(
                name: "Archeivement",
                table: "Feedback");

            migrationBuilder.CreateIndex(
                name: "IX_Archievement_UserId",
                table: "Archievement",
                column: "UserId",
                unique: true,
                filter: "[UserId] IS NOT NULL");
        }
    }
}
