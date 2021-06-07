using Microsoft.EntityFrameworkCore.Migrations;

namespace ReactClientCustomerAppointmentWithMVC_API.Data.Migrations
{
    public partial class DateNowMeetingDate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Appointments",
                newName: "MeetingDate");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MeetingDate",
                table: "Appointments",
                newName: "Date");
        }
    }
}
