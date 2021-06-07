import React, { useState, useEffect } from 'react';
import axios from 'axios';


const initAppointmentData = { appointmentID: '', name: '', description: '', duration: '', appointmentDate: new Date(), isConfimed: '', customerID: '' };

export const DetailAppointment = (props) => {
    const [appointment, setAppointment] = useState(initAppointmentData);

    const apiUrl = `https://localhost:5001/api/appointments/${props.match.params.id}`;


    useEffect(() => {
        const GetData = async () => {
            const result = await axios(apiUrl);
            setAppointment(result.data);
        };
        GetData();
    }, [apiUrl]);


    const backToListHandler = () => {
        props.history.replace({
            pathname: '/'
        });

    }

    const deleteHandler = async (id) => {
        console.log(id);
        console.log("Click me Delete");
        props.history.replace({
            pathname: `/deleteAppointment/${id}`
        });
    }

    return (

        <div className="border" style={{ width: '50%' }}>
            <div className="card-header text-center">
                <h3>Appointment Detail</h3>
            </div>
            <div className="card-body">
                <table>
                    <tbody>
                        <tr>
                            <td><strong>Name : </strong>{appointment.name}</td>
                        </tr>
                        <tr>
                            <td><strong>Description : </strong>{appointment.description}</td>
                        </tr>
                        <tr>
                            <td><strong>Duration : </strong>{appointment.duration}</td>
                        </tr>
                        <tr>
                            <td><strong>Date : </strong>{appointment.date}</td>
                        </tr>
                        <tr>
                            <td><strong>IsConfirmed : </strong>{appointment.isConfimed}</td>
                        </tr>
                        <tr>
                            <td><strong>Customer : </strong>{appointment.customer.fullName}</td>
                        </tr>
                        <tr>
                            <td><img src={appointment.photoPath} style={{ height: "200px" }} alt="" /> </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="card-footer">
                <button type="button" className="btn btn-outline-danger btn-block" onClick={() => deleteHandler(appointment.customerID)} style={{ fontWeight: "bold" }}>
                    Delete
                </button>
                <button type="button" className="btn btn-outline-primary btn-block" onClick={backToListHandler} style={{ fontWeight: "bold" }}>
                    Back to List
                </button>
            </div >
        </div >

    );

}
