using Microsoft.EntityFrameworkCore.Migrations;

namespace iSujou.Infra.Migrations
{
    public partial class achievements_status2code : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Achievement");

            migrationBuilder.AddColumn<int>(
                name: "Code",
                table: "Achievement",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Code",
                table: "Achievement");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Achievement",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
