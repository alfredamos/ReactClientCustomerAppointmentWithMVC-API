import React, { useState, useEffect } from 'react'
import { CustomerSupportAppointmentForm } from '../Utilities/Forms/CustomerSupportAppointmentForm'
import axios from 'axios'

const initialValue = { appointmentID: '', customerSupportID: '' }

export const AddCustomerSupportToAppointment = (props) => {
    const [customerSupports, setCustomerSupports] = useState([])
    const [appointmentId, setAppointmentId] = useState('')

    const customerSupportApiUrl = "https://localhost:5001/api/supportemployees"
    const customerSupportAppointmentApiUrl = "https://localhost:5001/api/customerSupportAppointments"
    const idOfAppointment = props.match.params.id

    useEffect(() => {
        const GetCustomerSupportsData = async () => {
            const result = await axios(customerSupportApiUrl);
            setCustomerSupports(result.data);
            setAppointmentId(idOfAppointment)
        };
        GetCustomerSupportsData();
    }, [idOfAppointment]);


    const customerSupportAppointmentCreateHandler = (customerSupportAppointmentInput) => {
        axios.post(customerSupportAppointmentApiUrl, customerSupportAppointmentInput)
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
        <CustomerSupportAppointmentForm
            heading={"Customer Support Appointment Create Form"}
            buttonText={"Create"}
            backToListHandler={backToListHandler}
            onCustomerSupportAppointmentChange={customerSupportAppointmentCreateHandler}
            initialValue={initialValue}
            customerSuports={customerSupports}
            appointmentId={appointmentId}
        />
    )
}