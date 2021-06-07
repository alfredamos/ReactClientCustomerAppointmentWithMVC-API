using Microsoft.EntityFrameworkCore;
using ReactClientCustomerAppointmentWithMVC_API.Contracts;
using ReactClientCustomerAppointmentWithMVC_API.Data;
using ReactClientCustomerAppointmentWithMVC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactClientCustomerAppointmentWithMVC_API.SQL
{
    public class SQLAppointmentRepository : IAppointmentRepository
    {
        private readonly ApplicationDbContext _context;

        public SQLAppointmentRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Appointment> AddEntity(Appointment newEntity)
        {
            var appointment = await _context.Appointments.AddAsync(newEntity);
            await _context.SaveChangesAsync();

            return appointment.Entity;
        }

        public async Task<Appointment> DeleteEntity(int id)
        {
            var appointmentToDelete = await _context.Appointments.FindAsync(id);

            if (appointmentToDelete != null)
            {
                _context.Appointments.Remove(appointmentToDelete);
                await _context.SaveChangesAsync();
            }

            return appointmentToDelete;
        }

        public async Task<IEnumerable<Appointment>> GetAll()
        {
            return await _context.Appointments.Include(x => x.Customer)
                         .Include(x => x.CustomerSupportAppointments)
                         .ThenInclude(x => x.CustomerSupport).ToListAsync();
        }

        public async Task<Appointment> GetById(int id)
        {
            return await _context.Appointments.Include(x => x.Customer)
                         .Include(x => x.CustomerSupportAppointments)
                         .ThenInclude(x => x.CustomerSupport)
                         .FirstOrDefaultAsync(x => x.AppointmentID == id);
        }

        public async Task<IEnumerable<Appointment>> Search(string searchKey)
        {
            IQueryable<Appointment> Query = _context.Appointments;

            if (string.IsNullOrWhiteSpace(searchKey))
            {
                return await Query.Include(x => x.Customer)
                                  .Include(x => x.CustomerSupportAppointments)
                                  .ThenInclude(x => x.CustomerSupport)
                                  .ToListAsync();
            }

            return await Query.Include(x => x.Customer).Include(x => x.Customer)
                                  .Include(x => x.CustomerSupportAppointments)
                                  .ThenInclude(x => x.CustomerSupport)
                                  .Where(x => x.Customer.FirstName.Contains(searchKey) ||
                                  x.Customer.LastName.Contains(searchKey) ||
                                  x.Customer.PhoneNumber.Contains(searchKey) ||
                                  x.Customer.Email.Contains(searchKey))
                                  .ToListAsync();

        }

        public async Task<Appointment> UpdateEntity(Appointment updatedEntity)
        {            
            var appointment = _context.Appointments.Attach(updatedEntity);
            appointment.State = EntityState.Modified;
            
            await _context.SaveChangesAsync();
           
            return appointment.Entity;
        }
       
    }
}
