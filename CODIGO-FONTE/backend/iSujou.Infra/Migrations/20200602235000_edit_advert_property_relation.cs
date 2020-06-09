using Microsoft.EntityFrameworkCore.Migrations;

namespace iSujou.Infra.Migrations
{
    public partial class edit_advert_property_relation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Advert_PropertyId",
                table: "Advert");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "AdvertItem",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Advert_PropertyId",
                table: "Advert",
                column: "PropertyId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Advert_PropertyId",
                table: "Advert");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "AdvertItem");

            migrationBuilder.CreateIndex(
                name: "IX_Advert_PropertyId",
                table: "Advert",
                column: "PropertyId",
                unique: true);
        }
    }
}
