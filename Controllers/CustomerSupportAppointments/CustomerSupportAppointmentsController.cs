using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactClientCustomerAppointmentWithMVC_API.Contracts;
using ReactClientCustomerAppointmentWithMVC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ReactClientCustomerAppointmentWithMVC_API.Controllers.CustomerSupportAppointments
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerSupportAppointmentsController : ControllerBase
    {
        private readonly ICustomerSupportAppointmentRepository _customerSupportAppointmentRepository;
        private readonly IMapper _mapper;

        public CustomerSupportAppointmentsController(ICustomerSupportAppointmentRepository customerSupportAppointmentRepository, IMapper mapper)
        {
            _customerSupportAppointmentRepository = customerSupportAppointmentRepository;
            _mapper = mapper;
        }

        // GET: api/CustomerSupportAppointments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomerSupportAppointment>>> GetCustomerSupportAppointments()
        {
            try
            {
                return Ok(await _customerSupportAppointmentRepository.GetAll());
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }
        }

        // GET: api/CustomerSupportAppointments/5
        [HttpGet("{idAppointment:int}/{idCustomerSupport:int}", Name = "GetCustomerSupportAppointment")]
        public async Task<ActionResult<CustomerSupportAppointment>> GetCustomerSupportAppointment(int idAppointment, int idCustomerSupport)
        {
            try
            {
                var customerSupportAppointment = await _customerSupportAppointmentRepository.GetById(idAppointment, idCustomerSupport);

                if (customerSupportAppointment == null)
                {
                    return NotFound($"CustomerSupportAppointment with Id = {idAppointment}, {idCustomerSupport} not found.");
                }

                return customerSupportAppointment;
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }
        }

        // PUT: api/CustomerSupportAppointments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{idAppointment:int}/{idCustomerSupport:int}")]
        public async Task<ActionResult<CustomerSupportAppointment>> PutCustomerSupportAppointment(int idAppointment, int idCustomerSupport, CustomerSupportAppointment customerSupportAppointment)
        {
            try
            {
                if (idAppointment != customerSupportAppointment.AppointmentID && idCustomerSupport != customerSupportAppointment.CustomerSupportID)
                {
                    return BadRequest("Id mismatch.");
                }

                var customerSupportAppointmentToUpdate = await _customerSupportAppointmentRepository.GetById(idAppointment, idCustomerSupport);
                if (customerSupportAppointmentToUpdate == null)
                {
                    return NotFound($"CustomerSupportAppointment with Id = {idAppointment}, {idCustomerSupport} not found.");
                }

                _mapper.Map(customerSupportAppointment, customerSupportAppointmentToUpdate);

                return await _customerSupportAppointmentRepository.UpdateEntity(customerSupportAppointmentToUpdate);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating data.");
            }

        }

        // POST: api/CustomerSupportAppointments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CustomerSupportAppointment>> PostCustomerSupportAppointment(CustomerSupportAppointment customerSupportAppointment)
        {
            try
            {
                if (customerSupportAppointment == null)
                {
                    return BadRequest("Invalid input.");
                }

                var createdCustomerSupportAppointment = await _customerSupportAppointmentRepository.AddEntity(customerSupportAppointment);

                return CreatedAtAction(nameof(GetCustomerSupportAppointment), new { idAppointment = createdCustomerSupportAppointment.AppointmentID, idCustomerSupport = createdCustomerSupportAppointment.CustomerSupportID }, createdCustomerSupportAppointment);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating data.");
            }

        }

        [HttpPost("addmultiple")]
        public async Task<IActionResult> PostCustomerSupportAppointments(List<CustomerSupportAppointment> customerSupportAppointments)
        {
            try
            {
                if (customerSupportAppointments == null)
                {
                    return BadRequest("Invalid input");
                }

                await _customerSupportAppointmentRepository.AddEntities(customerSupportAppointments);

                return NoContent();
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating data.");
            }

        }

        // DELETE: api/CustomerSupportAppointments/5
        [HttpDelete("{idAppointment:int}/{idCustomerSupport:int}")]
        public async Task<ActionResult<CustomerSupportAppointment>> DeleteCustomerSupportAppointment(int idAppointment, int idCustomerSupport)
        {
            try
            {
                var customerSupportAppointmentToDelete = await _customerSupportAppointmentRepository.GetById(idAppointment, idCustomerSupport);

                if (customerSupportAppointmentToDelete == null)
                {
                    return NotFound($"CustomerSupportAppointment with Id = {idAppointment}, {idCustomerSupport} not found.");
                }

                return await _customerSupportAppointmentRepository.DeleteEntity(idAppointment, idCustomerSupport);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting data.");
            }

        }

        // GET: api/CustomerSupportAppointments/search/searchKey
        [HttpGet("search/{searchKey}")]
        public async Task<ActionResult<IEnumerable<CustomerSupportAppointment>>> Search(string searchKey)
        {
            try
            {
                return Ok(await _customerSupportAppointmentRepository.Search(searchKey));
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }
        }

    }
}
