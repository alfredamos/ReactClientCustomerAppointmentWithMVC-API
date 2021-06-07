using Microsoft.EntityFrameworkCore;
using ReactClientCustomerAppointmentWithMVC_API.Contracts;
using ReactClientCustomerAppointmentWithMVC_API.Data;
using ReactClientCustomerAppointmentWithMVC_API.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactClientCustomerAppointmentWithMVC_API.SQL
{
    public class SQLCustomerSupportRepository : ICustomerSupportRepository
    {
        private readonly ApplicationDbContext _context;

        public SQLCustomerSupportRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<CustomerSupport> AddEntity(CustomerSupport newEntity)
        {
            var supportEmployee = await _context.SupportEmployees.AddAsync(newEntity);
            await _context.SaveChangesAsync();

            return supportEmployee.Entity;
        }

        public async Task<CustomerSupport> DeleteEntity(int id)
        {
            var supportEmployeeToDelete = await _context.SupportEmployees.FindAsync(id);

            if (supportEmployeeToDelete != null)
            {
                _context.SupportEmployees.Remove(supportEmployeeToDelete);
                await _context.SaveChangesAsync();
            }

            return supportEmployeeToDelete;
        }

        public async Task<IEnumerable<CustomerSupport>> GetAll()
        {
            return await _context.SupportEmployees
                         .Include(x => x.CustomerSupportAppointments)
                         .ThenInclude(x => x.Appointment)
                         .ThenInclude(x => x.Customer)
                         .ToListAsync();
        }

        public async Task<CustomerSupport> GetById(int id)
        {
            return await _context.SupportEmployees.Include(x => x.CustomerSupportAppointments)
                         .ThenInclude(x => x.Appointment)
                         .ThenInclude(x => x.Customer)
                         .FirstOrDefaultAsync(x => x.CustomerSupportID == id);
        }

        public async Task<IEnumerable<CustomerSupport>> Search(string searchKey)
        {
            IQueryable<CustomerSupport> Query = _context.SupportEmployees;

            if (string.IsNullOrWhiteSpace(searchKey))
            {
                return await Query.ToListAsync();
            }

            return await Query
                         .Include(x => x.CustomerSupportAppointments)
                         .ThenInclude(x => x.Appointment)
                         .ThenInclude(x => x.Customer)
                         .Where(x => x.FirstName.Contains(searchKey) ||
                         x.LastName.Contains(searchKey) || x.Role.Contains(searchKey))
                         .ToListAsync();
        }

        public async Task<CustomerSupport> UpdateEntity(CustomerSupport updatedEntity)
        {
            var supportEmployee = _context.SupportEmployees.Attach(updatedEntity);
            supportEmployee.State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return supportEmployee.Entity;
        }

    }
}
