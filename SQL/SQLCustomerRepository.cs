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
    public class SQLCustomerRepository : ICustomerRepository
    {
        private readonly ApplicationDbContext _context;

        public SQLCustomerRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Customer> AddEntity(Customer newEntity)
        {
            var customer = await _context.Customers.AddAsync(newEntity);
            await _context.SaveChangesAsync();

            return customer.Entity;
        }

        public async Task<Customer> DeleteEntity(int id)
        {
            var customerToDelete = await _context.Customers.FindAsync(id);

            if (customerToDelete != null)
            {
                _context.Customers.Remove(customerToDelete);
                await _context.SaveChangesAsync();
            }

            return customerToDelete;
        }

        public async Task<IEnumerable<Customer>> GetAll()
        {
            return await _context.Customers.ToListAsync();
        }

        public async Task<Customer> GetById(int id)
        {
            return await _context.Customers
                         .FirstOrDefaultAsync(x => x.CustomerID == id);
        }

        public async Task<IEnumerable<Customer>> Search(string searchKey)
        {
            IQueryable<Customer> Query = _context.Customers;

            if (string.IsNullOrWhiteSpace(searchKey))
            {
                return await Query.ToListAsync();
            }

            return await Query.Where(x => x.Email.Contains(searchKey) ||
                         x.FirstName.Contains(searchKey) || x.LastName.Contains(searchKey) ||
                         x.PhoneNumber.Contains(searchKey))
                         .ToListAsync();
        }

        public async Task<Customer> UpdateEntity(Customer updatedEntity)
        {
            var customer = _context.Customers.Attach(updatedEntity);
            customer.State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return customer.Entity;
        }
    }
}
