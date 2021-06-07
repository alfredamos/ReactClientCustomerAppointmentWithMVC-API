import React, { useState } from 'react';
//import DatePicker from "react-datepicker";


export const CustomerSupportForm = (props) => {
    const { backToListHandler, heading, buttonAction, onCustomerSupportChange, initialCustomerSupportData } = props

    const [customerSupport, setCustomerSupport] = useState(initialCustomerSupportData);
   

    const handleSubmit = (event) => {
        event.preventDefault();
        onCustomerSupportChange(customerSupport);
    }


    const handleChange = (event) => {
        event.persist();
        setCustomerSupport({ ...customerSupport, [event.target.name]: event.target.value })
    }
    



    return (
        <div className="border" style={{ width: '50%' }}>
            <div className="card-header text-center">
                <h4>{heading}</h4>
            </div>
            <div className="card-body">

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstName" className="form-label">
                            First Name:
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            required
                            placeholder="firstName"
                            value={customerSupport.firstName}
                            onChange={handleChange}
                            className="form-control"
                        />

                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName" className="form-label">
                            Last Name:
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            required
                            placeholder="lastName"
                            value={customerSupport.lastName}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="role" className="form-label">
                            Role:
                        </label>
                        <input
                            type="text"
                            name="role"
                            id="role"
                            required
                            placeholder="Support Role"
                            value={customerSupport.email}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>                   
                    <hr />
                    <div className="form-group">
                        <button type="submit" className="btn btn-secondary btn-block"><strong>{buttonAction}</strong></button>
                    </div>
                    <hr />
                </form>
            </div>
            <div className="card-footer">
                <button onClick={backToListHandler} className="btn btn-primary btn-block"><strong>Back To Customer Support Employees List</strong></button>
            </div>
        </div>
    );
}