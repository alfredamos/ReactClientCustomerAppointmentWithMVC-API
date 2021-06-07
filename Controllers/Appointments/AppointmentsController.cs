using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using ReactClientCustomerAppointmentWithMVC_API.Models;
using ReactClientCustomerAppointmentWithMVC_API.Contracts;

namespace ReactClientCustomerAppointmentWithMVC_API.Controllers.Appointments
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentsController : ControllerBase
    {        
        private readonly IAppointmentRepository _appointmentRepository;
        private readonly IMapper _mapper;

        public AppointmentsController(IAppointmentRepository appointmentRepository, IMapper mapper)
        {            
            _appointmentRepository = appointmentRepository;
            _mapper = mapper;
        }

        // GET: api/Appointments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Appointment>>> GetAppointments()
        {
            try
            {
                return Ok(await _appointmentRepository.GetAll());
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }
        }

        // GET: api/Appointments/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Appointment>> GetAppointment(int id)
        {
            try
            {
                var appointment = await _appointmentRepository.GetById(id);

                if (appointment == null)
                {
                    return NotFound($"Appointment with Id = {id} not found.");
                }

                return appointment;
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }
        }

        // PUT: api/Appointments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id:int}")]
        public async Task<ActionResult<Appointment>> PutAppointment(int id, Appointment appointment)
        {
            try
            {
                if (id != appointment.AppointmentID)
                {
                    return BadRequest("Id mismatch.");
                }

                var appointmentToUpdate = await _appointmentRepository.GetById(id);
                if (appointmentToUpdate == null)
                {
                    return NotFound($"Appointment with Id = {id} not found.");
                }

                _mapper.Map(appointment, appointmentToUpdate);

                return await _appointmentRepository.UpdateEntity(appointmentToUpdate);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating data.");
            }
           
        }

        // POST: api/Appointments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Appointment>> PostAppointment(Appointment appointment)
        {
            try
            {
                if (appointment == null)
                {
                    return BadRequest("Invalid input.");
                }

                var createdAppointment = await _appointmentRepository.AddEntity(appointment);

                return CreatedAtAction(nameof(GetAppointment), new { id = createdAppointment.AppointmentID }, createdAppointment);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating data.");
            }
            
        }

        // DELETE: api/Appointments/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Appointment>> DeleteAppointment(int id)
        {
            try
            {
                var appointmentToDelete = await _appointmentRepository.GetById(id);

                if (appointmentToDelete == null)
                {
                    return NotFound($"Appointment with Id = {id} not found.");
                }

                return await _appointmentRepository.DeleteEntity(id);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting data.");
            }
            
        }

        // GET: api/Appointments/search/searchKey
        [HttpGet("search/{searchKey}")]
        public async Task<ActionResult<IEnumerable<Appointment>>> Search(string searchKey)
        {
            try
            {
                return Ok(await _appointmentRepository.Search(searchKey));
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data.");
            }
        }

    }
}
