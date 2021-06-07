using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactClientCustomerAppointmentWithMVC_API.Contracts;
using ReactClientCustomerAppointmentWithMVC_API.Helpers;
using ReactClientCustomerAppointmentWithMVC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ReactClientCustomerAppointmentWithMVC_API.Controllers.Customers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerRepository _customerRepository;
        private readonly IMapper _mapper;
        private readonly IFileStorageService _fileStorageService;

        public CustomersController(ICustomerRepository customerRepository, IMapper mapper,
            IFileStorageService fileStorageService)
        {
            _customerRepository = customerRepository;          
            _mapper = mapper;
            _fileStorageService = fileStorageService;
        }

        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            try
            {
                return Ok(await _customerRepository.GetAll());
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }
        }

        // GET: api/Customers/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            try
            {
                var customer = await _customerRepository.GetById(id);

                if (customer == null)
                {
                    return NotFound($"CustomerSupport with Id = {id} not found.");
                }

                return customer;
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }
        }

        // PUT: api/Customers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id:int}")]
        public async Task<ActionResult<Customer>> PutCustomer(int id, Customer customer)
        {
            try
            {
                if (id != customer.CustomerID)
                {
                    return BadRequest("Id mismatch.");
                }

                var customerToUpdate = await _customerRepository.GetById(id);
                if (customerToUpdate == null)
                {
                    return NotFound($"CustomerSupport with Id = {id} not found.");
                }

                if (!string.IsNullOrWhiteSpace(customer.PhotoPath))
                {
                    var customerPhoto = Convert.FromBase64String(customer.PhotoPath);
                    customer.PhotoPath = await _fileStorageService.EditFile(customerPhoto, "jpg", "customer", customer.PhotoPath);
                }


                _mapper.Map(customer, customerToUpdate);

                return await _customerRepository.UpdateEntity(customerToUpdate);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating data.");
            }

        }

        // POST: api/Customers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Customer>> PostCustomer(Customer customer)
        {
            try
            {
                if (customer == null)
                {
                    return BadRequest("Invalid input.");
                }

                if (!string.IsNullOrWhiteSpace(customer.PhotoPath))
                {
                    var CustomerPhoto = Convert.FromBase64String(customer.PhotoPath);
                    customer.PhotoPath = await _fileStorageService.SaveFile(CustomerPhoto, "jpg", "customer");
                }

                var createdAppointment = await _customerRepository.AddEntity(customer);

                return CreatedAtAction(nameof(GetCustomer), new { id = createdAppointment.CustomerID }, createdAppointment);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating data.");
            }

        }

        // DELETE: api/Customers/5
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<Customer>> DeleteCustomer(int id)
        {
            try
            {
                var customerToDelete = await _customerRepository.GetById(id);

                if (customerToDelete == null)
                {
                    return NotFound($"CustomerSupport with Id = {id} not found.");
                }

                return await _customerRepository.DeleteEntity(id);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting data.");
            }

        }

        // GET: api/Customers/search/searchKey
        [HttpGet("search/{searchKey}")]
        public async Task<ActionResult<IEnumerable<Customer>>> Search(string searchKey)
        {
            try
            {
                return Ok(await _customerRepository.Search(searchKey));
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }
        }
    }
}
