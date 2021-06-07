using AutoMapper;
using ReactClientCustomerAppointmentWithMVC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactClientCustomerAppointmentWithMVC_API.Mappings
{
    public class Mapp : Profile
    {
        public Mapp()
        {
            CreateMap<Appointment, Appointment>();
            CreateMap<Customer, Customer>();
            CreateMap<CustomerSupport, CustomerSupport>();
            CreateMap<CustomerSupportAppointment, CustomerSupportAppointment>();
        }
    }
}
