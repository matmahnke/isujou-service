using Microsoft.EntityFrameworkCore.Migrations;

namespace iSujou.Infra.Migrations
{
    public partial class edit_property : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "OwnerId",
                table: "Property",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "OwnerId1",
                table: "Property",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Property_OwnerId1",
                table: "Property",
                column: "OwnerId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Property_AspNetUsers_OwnerId1",
                table: "Property",
                column: "OwnerId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Property_AspNetUsers_OwnerId1",
                table: "Property");

            migrationBuilder.DropIndex(
                name: "IX_Property_OwnerId1",
                table: "Property");

            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "Property");

            migrationBuilder.DropColumn(
                name: "OwnerId1",
                table: "Property");
        }
    }
}
