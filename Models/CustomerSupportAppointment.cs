using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactClientCustomerAppointmentWithMVC_API.Models
{
    public class CustomerSupportAppointment
    {
        public int AppointmentID { get; set; }
        public int CustomerSupportID { get; set; }
        public Appointment Appointment { get; set; }
        public CustomerSupport CustomerSupport { get; set; }
    }
}
