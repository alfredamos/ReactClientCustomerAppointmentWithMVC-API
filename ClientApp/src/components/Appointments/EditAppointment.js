import React, { useEffect, useState } from 'react';
import { AppointmentForm } from '../Utilities/Forms/AppointmentForm';
import axios from 'axios';


const initAppointmentData = {appointmentID: '', name: '', description: '', duration: '', appointmentDate: new Date(), isConfimed: '', customerID: '' };

export const EditAppointment = (props) => {
    const [appointment, setAppointment] = useState(initAppointmentData)
    const [customers, setCustomers] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const appointmentApiUrl = `https://localhost:5001/api/appointments/${props.match.params.id}`;
    const customerApiUrl = `https://localhost:5001/api/customers`;


    useEffect(() => {
        const GetData = async () => {
            const result = await axios(appointmentApiUrl);
            setAppointment(result.data);
            setIsLoading(true);
        };
        GetData();
    }, [appointmentApiUrl]);


    useEffect(() => {
        const GetData = async () => {
            const result = await axios(customerApiUrl);
            setCustomers(result.data);
        };
        GetData();
    }, [customerApiUrl]);


    const appointmentEditHandler = (appointment) => {
        axios.put(appointmentApiUrl, appointment)
            .then(res => {
                props.history.replace('/')
            });
    }



    const backToListHandler = () => {
        props.history.replace({
            pathname: '/'
        });

    }



    return (
        <>
            {
                isLoading &&
                <AppointmentForm
                    backToListHandler={backToListHandler}
                    heading={"Customer Edit Form"}
                    buttonAction={"Save"}
                    onAppointmentChange={appointmentEditHandler}
                    initialAppointmentData={appointment}
                    customers={customers}
                />
            }
        </>
    );
}