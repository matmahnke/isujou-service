using Microsoft.EntityFrameworkCore.Migrations;

namespace iSujou.Infra.Migrations
{
    public partial class edit_profile : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_UserInfoId",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Advert",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_UserInfoId",
                table: "AspNetUsers",
                column: "UserInfoId",
                unique: true,
                filter: "[UserInfoId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Advert_UserId",
                table: "Advert",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Advert_AspNetUsers_UserId",
                table: "Advert",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Advert_AspNetUsers_UserId",
                table: "Advert");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_UserInfoId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_Advert_UserId",
                table: "Advert");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Advert");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_UserInfoId",
                table: "AspNetUsers",
                column: "UserInfoId");
        }
    }
}
