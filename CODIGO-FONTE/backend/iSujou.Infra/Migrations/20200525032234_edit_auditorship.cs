using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace iSujou.Infra.Migrations
{
    public partial class edit_auditorship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreationDate",
                table: "Contract",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "CreatorId",
                table: "Contract",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatorId1",
                table: "Contract",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "EditionDate",
                table: "Contract",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "EditorId",
                table: "Contract",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EditorId1",
                table: "Contract",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreationDate",
                table: "Advert",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "CreatorId",
                table: "Advert",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatorId1",
                table: "Advert",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "EditionDate",
                table: "Advert",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "EditorId",
                table: "Advert",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EditorId1",
                table: "Advert",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Contract_CreatorId1",
                table: "Contract",
                column: "CreatorId1");

            migrationBuilder.CreateIndex(
                name: "IX_Contract_EditorId1",
                table: "Contract",
                column: "EditorId1");

            migrationBuilder.CreateIndex(
                name: "IX_Advert_CreatorId1",
                table: "Advert",
                column: "CreatorId1");

            migrationBuilder.CreateIndex(
                name: "IX_Advert_EditorId1",
                table: "Advert",
                column: "EditorId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Advert_AspNetUsers_CreatorId1",
                table: "Advert",
                column: "CreatorId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Advert_AspNetUsers_EditorId1",
                table: "Advert",
                column: "EditorId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Contract_AspNetUsers_CreatorId1",
                table: "Contract",
                column: "CreatorId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Contract_AspNetUsers_EditorId1",
                table: "Contract",
                column: "EditorId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Advert_AspNetUsers_CreatorId1",
                table: "Advert");

            migrationBuilder.DropForeignKey(
                name: "FK_Advert_AspNetUsers_EditorId1",
                table: "Advert");

            migrationBuilder.DropForeignKey(
                name: "FK_Contract_AspNetUsers_CreatorId1",
                table: "Contract");

            migrationBuilder.DropForeignKey(
                name: "FK_Contract_AspNetUsers_EditorId1",
                table: "Contract");

            migrationBuilder.DropIndex(
                name: "IX_Contract_CreatorId1",
                table: "Contract");

            migrationBuilder.DropIndex(
                name: "IX_Contract_EditorId1",
                table: "Contract");

            migrationBuilder.DropIndex(
                name: "IX_Advert_CreatorId1",
                table: "Advert");

            migrationBuilder.DropIndex(
                name: "IX_Advert_EditorId1",
                table: "Advert");

            migrationBuilder.DropColumn(
                name: "CreationDate",
                table: "Contract");

            migrationBuilder.DropColumn(
                name: "CreatorId",
                table: "Contract");

            migrationBuilder.DropColumn(
                name: "CreatorId1",
                table: "Contract");

            migrationBuilder.DropColumn(
                name: "EditionDate",
                table: "Contract");

            migrationBuilder.DropColumn(
                name: "EditorId",
                table: "Contract");

            migrationBuilder.DropColumn(
                name: "EditorId1",
                table: "Contract");

            migrationBuilder.DropColumn(
                name: "CreationDate",
                table: "Advert");

            migrationBuilder.DropColumn(
                name: "CreatorId",
                table: "Advert");

            migrationBuilder.DropColumn(
                name: "CreatorId1",
                table: "Advert");

            migrationBuilder.DropColumn(
                name: "EditionDate",
                table: "Advert");

            migrationBuilder.DropColumn(
                name: "EditorId",
                table: "Advert");

            migrationBuilder.DropColumn(
                name: "EditorId1",
                table: "Advert");
        }
    }
}
