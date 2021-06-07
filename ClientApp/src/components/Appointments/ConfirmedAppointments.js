import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faBookOpen, faPeopleArrows } from '@fortawesome/free-solid-svg-icons';
import { SearchItem } from '../Utilities/Helpers/SearchItem';
import axios from 'axios';

export const ConfirmedAppointments = (props) => {
    const [appointments, setAppointments] = useState([])
    const [filter, setFilter] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const appointmentUrl = `https://localhost:5001/api/appointments`;


    const editHandler = (id) => {
        console.log(id);
        props.history.replace({
            pathname: `/editAppointment/${id}`
        });

    }

    const deleteHandler = (id) => {
        console.log(id);
        props.history.replace({
            pathname: `/deleteAppointment/${id}`
        });
    }


    const createHandler = () => {
        props.history.replace({
            pathname: '/createAppointment'
        });
    }


    const detailHandler = (id) => {
        console.log(id);
        props.history.replace({
            pathname: `/detailAppointment/${id}`
        });
    }


    const customerSupportdeleteHandler = (appointmentId, customerSupportId) => {
        props.history.replace({
            pathname: `/deleteCustomerSupportAppointment/${appointmentId}/${customerSupportId}`
        });

    }


    const addCustomerSupportToAppointmentHandler = (appointmentId) => {
        props.history.replace({
            pathname: `/addCustomerSupportToAppointment/${appointmentId}`
        });
    }


    useEffect(() => {
        let onMount = true;
        axios.get(appointmentUrl)
            .then(res => {
                if (onMount) {
                    const allAppointments = res.data
                    const filteredAppointments = allAppointments.filter(x => x.isConfirmed === true);
                    setAppointments(filteredAppointments);
                    setIsLoading(true);
                }
            })
        return () => onMount = false;
    }, [appointmentUrl, appointments]);


    const filterHandler = (event) => {
        const { value } = event.target;
        setFilter(value)
    }


    const searchHandler = (event) => {
        event.preventDefault();
        console.log("filter : ", filter);
        if (filter !== "") {
            const searchApiUrl = `${appointmentUrl}/search/${filter}`;
            axios.get(searchApiUrl)
                .then(res => {
                    setAppointments(res.data)
                });
        } else {
            axios.get(appointmentUrl)
                .then(res => {
                    setAppointments(res.data)
                });
        }
    }


    return (
        <>
            {
                isLoading &&
                <section>
                    <div className="border">
                        <div className="card-header text-center">
                            <h4>List of Confirmed Appointments</h4>
                        </div>
                        <div className="card-body">
                            <SearchItem filterHandler={filterHandler} searchHandler={searchHandler} />
                            <br />
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Duration</th>
                                        <th>Date</th>
                                        <th>Customer</th>
                                        <th>Support Employees</th>
                                        <th>Confirmed?</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        appointments.map((appointment) => (

                                            <tr key={appointment.name}>
                                                <td>{appointment.name}</td>
                                                <td>{appointment.description}</td>
                                                <td>{appointment.duration}</td>
                                                <td>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                                                <td>{appointment.customer.fullName}</td>
                                                <td>
                                                    {
                                                        appointment.customerSupportAppointments.map(customerSupport => (
                                                            <li key={customerSupport.customerSupportID}>
                                                                {customerSupport.customerSupport.fullName}
                                                                <button
                                                                    onClick={() => customerSupportdeleteHandler(customerSupport.appointmentID, customerSupport.customerSupportID)}
                                                                    className="btn btn-danger mr-2"
                                                                    style={{ fontWeight: "bold", float: "right" }}>
                                                                    <span><FontAwesomeIcon icon={faTrash} /></span>
                                                                </button>
                                                            </li>
                                                        ))}
                                                </td>
                                                <td>
                                                    <h6>YES</h6>
                                                </td>
                                                <td>
                                                    <button onClick={() => editHandler(appointment.appointmentID)} className="btn btn-warning m-1" style={{ fontWeight: "bold" }}><FontAwesomeIcon icon={faEdit} /></button>
                                                    <button onClick={() => deleteHandler(appointment.appointmentID)} className="btn btn-danger m-1" style={{ fontWeight: "bold" }}><FontAwesomeIcon icon={faTrash} /></button>
                                                    <button onClick={() => detailHandler(appointment.appointmentID)} className="btn btn-primary m-1" style={{ fontWeight: "bold" }}><FontAwesomeIcon icon={faBookOpen} /></button>
                                                    <button onClick={() => addCustomerSupportToAppointmentHandler(appointment.appointmentID)} className="btn btn-secondary m-1" style={{ fontWeight: "bold" }}><FontAwesomeIcon icon={faPeopleArrows} /></button>
                                                </td>
                                            </tr>

                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="card-footer">
                            <button type="button" onClick={createHandler} className="btn btn-primary btn-block" style={{ fontWeight: "bold" }}>Create Appointment</button>
                        </div>
                    </div>
                </section>
            }
        </>
    );


}

