using Microsoft.EntityFrameworkCore.Migrations;

namespace CarManagerServer.Migrations
{
    public partial class removePersonFromCar : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PersonId",
                table: "Cars");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PersonId",
                table: "Cars",
                nullable: true);
        }
    }
}
