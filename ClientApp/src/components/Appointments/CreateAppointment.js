import React, { useEffect, useState} from 'react';
import { AppointmentForm } from '../Utilities/Forms/AppointmentForm';
import axios from 'axios';


const initialAppointmentData = { name: '', description: '', duration: '', appointmentDate: new Date(), isConfimed: '', customerID: '' };

export const CreateAppointment = (props) => {  
    const [customers, setCustomers] = useState([])

    const appointmentApiUrl = `https://localhost:5001/api/appointments`;
    const customerApiUrl = `https://localhost:5001/api/customers`;


    useEffect(() => {
        const GetData = async () => {
            const result = await axios(customerApiUrl);
            setCustomers(result.data);           
        };
        GetData();
    }, [customerApiUrl]);  


    const appointmentCreateHandler = (appointment) => {
        axios.post(appointmentApiUrl, appointment)
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
            <AppointmentForm
                backToListHandler={backToListHandler}
                heading={"Customer Create Form"}               
                buttonAction={"Create"}
                onAppointmentChange={appointmentCreateHandler}
                initialAppointmentData={initialAppointmentData}
                customers={customers}
            />
        </>
    );
}