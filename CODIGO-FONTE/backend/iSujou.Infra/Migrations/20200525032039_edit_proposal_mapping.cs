using Microsoft.EntityFrameworkCore.Migrations;

namespace iSujou.Infra.Migrations
{
    public partial class edit_proposal_mapping : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CandidateId1",
                table: "Proposal",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<long>(
                name: "HiredId",
                table: "Contract",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "HiredId1",
                table: "Contract",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "OwnerId",
                table: "Contract",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "OwnerId1",
                table: "Contract",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Proposal_CandidateId1",
                table: "Proposal",
                column: "CandidateId1");

            migrationBuilder.CreateIndex(
                name: "IX_Contract_HiredId1",
                table: "Contract",
                column: "HiredId1");

            migrationBuilder.CreateIndex(
                name: "IX_Contract_OwnerId1",
                table: "Contract",
                column: "OwnerId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Contract_AspNetUsers_HiredId1",
                table: "Contract",
                column: "HiredId1",
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
                name: "FK_Proposal_AspNetUsers_CandidateId1",
                table: "Proposal",
                column: "CandidateId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contract_AspNetUsers_HiredId1",
                table: "Contract");

            migrationBuilder.DropForeignKey(
                name: "FK_Contract_AspNetUsers_OwnerId1",
                table: "Contract");

            migrationBuilder.DropForeignKey(
                name: "FK_Proposal_AspNetUsers_CandidateId1",
                table: "Proposal");

            migrationBuilder.DropIndex(
                name: "IX_Proposal_CandidateId1",
                table: "Proposal");

            migrationBuilder.DropIndex(
                name: "IX_Contract_HiredId1",
                table: "Contract");

            migrationBuilder.DropIndex(
                name: "IX_Contract_OwnerId1",
                table: "Contract");

            migrationBuilder.DropColumn(
                name: "CandidateId1",
                table: "Proposal");

            migrationBuilder.DropColumn(
                name: "HiredId",
                table: "Contract");

            migrationBuilder.DropColumn(
                name: "HiredId1",
                table: "Contract");

            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "Contract");

            migrationBuilder.DropColumn(
                name: "OwnerId1",
                table: "Contract");
        }
    }
}
