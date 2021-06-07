using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactClientCustomerAppointmentWithMVC_API.Contracts;
using ReactClientCustomerAppointmentWithMVC_API.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ReactClientCustomerAppointmentWithMVC_API.Controllers.SupportEmployees
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupportEmployeesController : ControllerBase
    {
        private readonly ICustomerSupportRepository _customerSupportRepository;
        private readonly IMapper _mapper;

        public SupportEmployeesController(ICustomerSupportRepository customerSupportRepository, IMapper mapper)
        {
            _customerSupportRepository = customerSupportRepository;
            _mapper = mapper;
        }

        // GET: api/CustomerSupports
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomerSupport>>> GetCustomerSupports()
        {
            try
            {
                return Ok(await _customerSupportRepository.GetAll());
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }
        }

        // GET: api/CustomerSupports/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<CustomerSupport>> GetCustomerSupport(int id)
        {
            try
            {
                var customerSupport = await _customerSupportRepository.GetById(id);

                if (customerSupport == null)
                {
                    return NotFound($"CustomerSupport with Id = {id} not found.");
                }

                return customerSupport;
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }
        }

        // PUT: api/CustomerSupports/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id:int}")]
        public async Task<ActionResult<CustomerSupport>> PutCustomerSupport(int id, CustomerSupport customerSupport)
        {
            try
            {
                if (id != customerSupport.CustomerSupportID)
                {
                    return BadRequest("Id mismatch.");
                }

                var customerSupportToUpdate = await _customerSupportRepository.GetById(id);
                if (customerSupportToUpdate == null)
                {
                    return NotFound($"CustomerSupport with Id = {id} not found.");
                }

                _mapper.Map(customerSupport, customerSupportToUpdate);

                return await _customerSupportRepository.UpdateEntity(customerSupportToUpdate);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating data.");
            }

        }

        // POST: api/CustomerSupports
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CustomerSupport>> PostCustomerSupport(CustomerSupport customerSupport)
        {
            try
            {
                if (customerSupport == null)
                {
                    return BadRequest("Invalid input.");
                }

                var createdCustomerSupport = await _customerSupportRepository.AddEntity(customerSupport);

                return CreatedAtAction(nameof(GetCustomerSupport), new { id = createdCustomerSupport.CustomerSupportID}, createdCustomerSupport);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating data.");
            }

        }

        // DELETE: api/CustomerSupports/5
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<CustomerSupport>> DeleteCustomerSupport(int id)
        {
            try
            {
                var customerSupportToDelete = await _customerSupportRepository.GetById(id);

                if (customerSupportToDelete == null)
                {
                    return NotFound($"CustomerSupport with Id = {id} not found.");
                }

                return await _customerSupportRepository.DeleteEntity(id);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting data.");
            }

        }

        // GET: api/CustomerSupports/search/searchKey
        [HttpGet("search/{searchKey}")]
        public async Task<ActionResult<IEnumerable<CustomerSupport>>> Search(string searchKey)
        {
            try
            {
                return Ok(await _customerSupportRepository.Search(searchKey));
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }
        }

    }
}
