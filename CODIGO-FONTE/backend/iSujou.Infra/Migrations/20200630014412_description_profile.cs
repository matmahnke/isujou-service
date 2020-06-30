using Microsoft.EntityFrameworkCore.Migrations;

namespace iSujou.Infra.Migrations
{
    public partial class description_profile : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Achievement",
                table: "UserInfo");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "UserInfo",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "UserInfo");

            migrationBuilder.AddColumn<int>(
                name: "Achievement",
                table: "UserInfo",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
