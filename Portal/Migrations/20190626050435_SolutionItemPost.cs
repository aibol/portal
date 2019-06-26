using Microsoft.EntityFrameworkCore.Migrations;

namespace Portal.Migrations
{
    public partial class SolutionItemPost : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Posts_SolutionItemId",
                table: "Posts");

            migrationBuilder.DropIndex(
                name: "IX_Posts_SolutionItemId1",
                table: "Posts");

            migrationBuilder.CreateIndex(
                name: "IX_Posts_SolutionItemId",
                table: "Posts",
                column: "SolutionItemId",
                unique: true,
                filter: "[SolutionItemId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Posts_SolutionItemId1",
                table: "Posts",
                column: "SolutionItemId1",
                unique: true,
                filter: "[SolutionItemId1] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Posts_SolutionItemId",
                table: "Posts");

            migrationBuilder.DropIndex(
                name: "IX_Posts_SolutionItemId1",
                table: "Posts");

            migrationBuilder.CreateIndex(
                name: "IX_Posts_SolutionItemId",
                table: "Posts",
                column: "SolutionItemId");

            migrationBuilder.CreateIndex(
                name: "IX_Posts_SolutionItemId1",
                table: "Posts",
                column: "SolutionItemId1");
        }
    }
}
