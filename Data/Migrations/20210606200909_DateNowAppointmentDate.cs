using Microsoft.EntityFrameworkCore.Migrations;

namespace ReactClientCustomerAppointmentWithMVC_API.Data.Migrations
{
    public partial class DateNowAppointmentDate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MeetingDate",
                table: "Appointments",
                newName: "AppointmentDate");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AppointmentDate",
                table: "Appointments",
                newName: "MeetingDate");
        }
    }
}
