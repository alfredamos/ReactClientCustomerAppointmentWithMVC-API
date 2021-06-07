import React, { useState, useEffect } from 'react';
import { ConfirmDelete } from '../Utilities/Helpers/ConfirmDelete';
import { Link } from 'react-router-dom';
import axios from 'axios';


const initAppointmentData = {appointmentID: '', name: '', description: '', duration: '', appointmentDate: new Date(), isConfimed: '', customerID: '' };

export const DeleteAppointment = (props) => {
    const [appointment, setAppointment] = useState(initAppointmentData);
    const [readyForRender, setReadyForRender] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const apiUrl = `https://localhost:5001/api/appointments/${props.match.params.id}`;


    useEffect(() => {
        const GetData = async () => {
            const result = await axios(apiUrl);
            setAppointment(result.data);
            setReadyForRender(true);
            setIsDelete(false);
        };
        GetData();
    }, [apiUrl, readyForRender]);


    const deleteClick = (event) => {
        event.preventDefault();
        setIsDelete(true);
    }


    const deleteHandler = (deleteConfirmed) => {
        if (deleteConfirmed) {
            axios.delete(apiUrl)
        }
        props.history.replace({
            pathname: '/'
        });

    }


    return (
        <>
            <br />
            <br />
            {
                readyForRender &&
                <div className="content-section mt-5" style={{ width: '50%' }}>
                    <form onSubmit={deleteClick}>
                        <div className="border">
                            <div className="card-body">
                                <fieldset className="form-group">

                                    <legend className="border-bottom m-2">Delete Appointment</legend>
                                    <h2>Are you sure you want to delete : "{appointment.name}"?</h2>


                                </fieldset>
                            </div>
                            <div className="form-group card-footer">
                                <button className="btn btn-outline-danger m-2" type="submit"><strong>Yes, Delete</strong></button>
                                <Link
                                    className="btn btn-outline-secondary"
                                    to="/"
                                >
                                    <strong>Cancel</strong>
                                </Link>
                            </div>
                        </div>

                        {
                            isDelete && < ConfirmDelete
                                ConfirmationMessage={`Are you sure you want to delete ${appointment.name}?`}
                                ConfirmationTitle={"Delete Confirmation"}
                                deleteHandler={deleteHandler}
                            />
                        }
                    </form>
                </div>
            }
        </>
    );


}

