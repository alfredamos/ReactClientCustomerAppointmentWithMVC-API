using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using ReactClientCustomerAppointmentWithMVC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactClientCustomerAppointmentWithMVC_API.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<CustomerSupportAppointment>().HasKey(x => new { x.AppointmentID, x.CustomerSupportID });

            builder.Entity<CustomerSupportAppointment>().HasOne(x => x.Appointment)
                   .WithMany(x => x.CustomerSupportAppointments).HasForeignKey(x => x.AppointmentID);

            builder.Entity<CustomerSupportAppointment>().HasOne(x => x.CustomerSupport)
                   .WithMany(x => x.CustomerSupportAppointments).HasForeignKey(x => x.CustomerSupportID);

            base.OnModelCreating(builder);

        }

        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<CustomerSupport> SupportEmployees { get; set; }
        public DbSet<CustomerSupportAppointment> CustomerSupportAppointments { get; set; }
    }
}
