using Microsoft.EntityFrameworkCore.Migrations;

namespace iSujou.Infra.Migrations
{
    public partial class ajuste : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropForeignKey(
                name: "FK_Contract_AspNetUsers_OwnerId1",
                table: "Contract");

            migrationBuilder.DropForeignKey(
                name: "FK_Property_AspNetUsers_OwnerId1",
                table: "Property");

            migrationBuilder.DropForeignKey(
                name: "FK_Proposal_AspNetUsers_CandidateId1",
                table: "Proposal");

            migrationBuilder.DropIndex(
                name: "IX_Proposal_CandidateId1",
                table: "Proposal");

            migrationBuilder.DropIndex(
                name: "IX_Property_OwnerId1",
                table: "Property");

            migrationBuilder.DropIndex(
                name: "IX_Contract_CreatorId1",
                table: "Contract");

            migrationBuilder.DropIndex(
                name: "IX_Contract_EditorId1",
                table: "Contract");

            migrationBuilder.DropIndex(
                name: "IX_Contract_OwnerId1",
                table: "Contract");

            migrationBuilder.DropIndex(
                name: "IX_Advert_CreatorId1",
                table: "Advert");

            migrationBuilder.DropIndex(
                name: "IX_Advert_EditorId1",
                table: "Advert");

            migrationBuilder.DropColumn(
                name: "CandidateId1",
                table: "Proposal");

            migrationBuilder.DropColumn(
                name: "OwnerId1",
                table: "Property");

            migrationBuilder.DropColumn(
                name: "CreatorId1",
                table: "Contract");

            migrationBuilder.DropColumn(
                name: "EditorId1",
                table: "Contract");

            migrationBuilder.DropColumn(
                name: "OwnerId1",
                table: "Contract");

            migrationBuilder.DropColumn(
                name: "CreatorId1",
                table: "Advert");

            migrationBuilder.DropColumn(
                name: "EditorId1",
                table: "Advert");

            migrationBuilder.AlterColumn<string>(
                name: "CandidateId",
                table: "Proposal",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "OwnerId",
                table: "Property",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<string>(
                name: "OwnerId",
                table: "Contract",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<string>(
                name: "EditorId",
                table: "Contract",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatorId",
                table: "Contract",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "EditorId",
                table: "Advert",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatorId",
                table: "Advert",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Proposal_CandidateId",
                table: "Proposal",
                column: "CandidateId");

            migrationBuilder.CreateIndex(
                name: "IX_Property_OwnerId",
                table: "Property",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_Contract_CreatorId",
                table: "Contract",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Contract_EditorId",
                table: "Contract",
                column: "EditorId");

            migrationBuilder.CreateIndex(
                name: "IX_Contract_OwnerId",
                table: "Contract",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_Advert_CreatorId",
                table: "Advert",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Advert_EditorId",
                table: "Advert",
                column: "EditorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Advert_AspNetUsers_CreatorId",
                table: "Advert",
                column: "CreatorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Advert_AspNetUsers_EditorId",
                table: "Advert",
                column: "EditorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Contract_AspNetUsers_CreatorId",
                table: "Contract",
                column: "CreatorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Contract_AspNetUsers_EditorId",
                table: "Contract",
                column: "EditorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Contract_AspNetUsers_OwnerId",
                table: "Contract",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Property_AspNetUsers_OwnerId",
                table: "Property",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Proposal_AspNetUsers_CandidateId",
                table: "Proposal",
                column: "CandidateId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Advert_AspNetUsers_CreatorId",
                table: "Advert");

            migrationBuilder.DropForeignKey(
                name: "FK_Advert_AspNetUsers_EditorId",
                table: "Advert");

            migrationBuilder.DropForeignKey(
                name: "FK_Contract_AspNetUsers_CreatorId",
                table: "Contract");

            migrationBuilder.DropForeignKey(
                name: "FK_Contract_AspNetUsers_EditorId",
                table: "Contract");

            migrationBuilder.DropForeignKey(
                name: "FK_Contract_AspNetUsers_OwnerId",
                table: "Contract");

            migrationBuilder.DropForeignKey(
                name: "FK_Property_AspNetUsers_OwnerId",
                table: "Property");

            migrationBuilder.DropForeignKey(
                name: "FK_Proposal_AspNetUsers_CandidateId",
                table: "Proposal");

            migrationBuilder.DropIndex(
                name: "IX_Proposal_CandidateId",
                table: "Proposal");

            migrationBuilder.DropIndex(
                name: "IX_Property_OwnerId",
                table: "Property");

            migrationBuilder.DropIndex(
                name: "IX_Contract_CreatorId",
                table: "Contract");

            migrationBuilder.DropIndex(
                name: "IX_Contract_EditorId",
                table: "Contract");

            migrationBuilder.DropIndex(
                name: "IX_Contract_OwnerId",
                table: "Contract");

            migrationBuilder.DropIndex(
                name: "IX_Advert_CreatorId",
                table: "Advert");

            migrationBuilder.DropIndex(
                name: "IX_Advert_EditorId",
                table: "Advert");

            migrationBuilder.AlterColumn<long>(
                name: "CandidateId",
                table: "Proposal",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddColumn<string>(
                name: "CandidateId1",
                table: "Proposal",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<long>(
                name: "OwnerId",
                table: "Property",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OwnerId1",
                table: "Property",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "OwnerId",
                table: "Contract",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "EditorId",
                table: "Contract",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "CreatorId",
                table: "Contract",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatorId1",
                table: "Contract",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EditorId1",
                table: "Contract",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OwnerId1",
                table: "Contract",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "EditorId",
                table: "Advert",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "CreatorId",
                table: "Advert",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatorId1",
                table: "Advert",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EditorId1",
                table: "Advert",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Proposal_CandidateId1",
                table: "Proposal",
                column: "CandidateId1");

            migrationBuilder.CreateIndex(
                name: "IX_Property_OwnerId1",
                table: "Property",
                column: "OwnerId1");

            migrationBuilder.CreateIndex(
                name: "IX_Contract_CreatorId1",
                table: "Contract",
                column: "CreatorId1");

            migrationBuilder.CreateIndex(
                name: "IX_Contract_EditorId1",
                table: "Contract",
                column: "EditorId1");

            migrationBuilder.CreateIndex(
                name: "IX_Contract_OwnerId1",
                table: "Contract",
                column: "OwnerId1");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Contract_AspNetUsers_OwnerId1",
                table: "Contract",
                column: "OwnerId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Property_AspNetUsers_OwnerId1",
                table: "Property",
                column: "OwnerId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Proposal_AspNetUsers_CandidateId1",
                table: "Proposal",
                column: "CandidateId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
