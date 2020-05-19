using Microsoft.EntityFrameworkCore.Migrations;

namespace iSujou.Infra.Migrations
{
    public partial class change_proposal : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "CandidateId",
                table: "Proposal",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CandidateId",
                table: "Proposal");
        }
    }
}
