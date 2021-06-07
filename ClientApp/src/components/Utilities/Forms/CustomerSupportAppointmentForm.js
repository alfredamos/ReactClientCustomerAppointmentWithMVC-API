import React, { useState } from 'react'


export const CustomerSupportAppointmentForm = (props) => {
    const { heading, buttonText, backToListHandler, onCustomerSupportAppointmentChange, initialValue, customerSuports, appointmentId } = props

    const [customerSupportAppointment, setCustomerSupportAppointment] = useState(initialValue)

    const formSubmitHandler = (event) => {
        event.preventDefault()
        console.log("customerSupportAppointment : ", customerSupportAppointment)
        onCustomerSupportAppointmentChange(customerSupportAppointment)
    }


    const inputChangeHandler = (event) => {
        event.persist()
        setCustomerSupportAppointment({ ...customerSupportAppointment, appointmentID: appointmentId, customerSupportID: event.target.value})
    }


    return (
        <div className="border">
            <div className="card-header text-center">
                <h3>{heading}</h3>
            </div>
            <div className="card-body">
                <form onSubmit={formSubmitHandler}>
                    <div className="form-group">
                        <label htmlFor="customerSupportID" className="form-label">
                            Customer Support:
                        </label>
                        <select
                            id="customerSupportID"
                            name="customerSupportID"
                            value={customerSupportAppointment.customerSupportID}
                            className="form-control"
                            onChange={inputChangeHandler}
                        >
                            <option>Select Customer Support Employee</option>
                            {
                                customerSuports.map(customerSupport => (

                                    <option
                                        key={customerSupport.customerSupportID}
                                        value={customerSupport.customerSupportID}

                                    >
                                        {customerSupport.fullName}
                                    </option>

                                ))}
                        </select>

                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">{buttonText}</button>
                    </div>
                </form>
            </div>
            <div className="card-footer">
                <button type="button" className="btn btn-secondary btn-block" onClick={backToListHandler}>Back to Appointment List</button>
            </div>
        </div>
    )
}