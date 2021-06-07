import React, { useState } from 'react';
//import DatePicker from "react-datepicker";


export const AppointmentForm = (props) => {
    const { backToListHandler, heading, buttonAction, onAppointmentChange, initialAppointmentData, customers } = props

    const [appointment, setAppointment] = useState(initialAppointmentData);
   


    const handleSubmit = (event) => {
        event.preventDefault();
        onAppointmentChange(appointment);
    }


    const handleChange = (event) => {
        event.persist();
        setAppointment({ ...appointment, [event.target.name]: event.target.value })
    }


    const handleChangeDate = event => {
        event.persist();
        const meetingDate = new Date(event.target.value)
        console.log("Meeting Date : ", meetingDate)
        setAppointment({ ...appointment, appointmentDate: meetingDate });
    }


    const handleChangeCheck = event => {
        event.persist();
        setAppointment({ ...appointment, isConfirmed: event.target.checked });
    }



    return (
        <div className="border" style={{ width: '50%' }}>
            <div className="card-header text-center">
                <h4>{heading}</h4>
            </div>
            <div className="card-body">

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">
                            Name:
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            placeholder="name"
                            value={appointment.name}
                            onChange={handleChange}
                            className="form-control"
                        />

                    </div>
                    <div className="form-group">
                        <label htmlFor="description" className="form-label">
                            Description:
                        </label>
                        <textarea
                            type="text"
                            name="description"
                            id="description"
                            required
                            placeholder="description"
                            value={appointment.description}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="duration" className="form-label">
                            Duration:
                        </label>
                        <input
                            type="number"
                            name="duration"
                            id="duration"
                            required
                            max="5"
                            min="1"
                            placeholder="duration"
                            value={appointment.duration}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>                    
                    <div className="form-group">
                        <label htmlFor="appointmentDate" className="form-control-label">
                            Appointment Date:
                        </label>
                        <input
                            type="date"
                            name="appointmentDate"
                            id="appointmentDate"
                            pattern="\d{4}-\d{2}-\d{2}"
                            value={appointment.appointmentDate}
                            onChange={handleChangeDate}
                            className="form-control"
                        />
                    </div>
                    <hr />
                    <div className="form-group">
                        <label html="isConfirmed" className="form-label">
                            Is Confirmed:
                        </label>
                        <input
                            type="checkbox"
                            name="isConfirmed"
                            checked={appointment.isConfirmed}
                            placeholder="Confirm Appointment"
                            onChange={handleChangeCheck}
                            className="form-control"
                        />                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="customerID" className="form-coontrol-label">
                            Customer :
                        </label>
                        <select
                            id="customerID"
                            name="customerID"
                            value={appointment.customerID}
                            className="form-control"
                            onChange={handleChange}
                        >
                            <option>Select Customer</option>
                            {
                                customers.map(customer => (

                                    <option
                                        key={customer.customerID}
                                        value={customer.customerID}

                                    >
                                        {customer.fullName}
                                    </option>

                                ))}
                        </select>
                    </div>
                    <hr />
                    <div className="form-group">
                        <button type="submit" className="btn btn-secondary btn-block"><strong>{buttonAction}</strong></button>
                    </div>
                    <hr />
                </form>
            </div>
            <div className="card-footer">
                <button onClick={backToListHandler} className="btn btn-primary btn-block"><strong>Back To Appointment List</strong></button>
            </div>
        </div>
    );
}