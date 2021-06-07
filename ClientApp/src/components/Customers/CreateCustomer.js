import React, { useState } from 'react';
import {CustomerForm } from '../Utilities/Forms/CustomerForm';
import axios from 'axios';


const initialCustomerData = { firstName: '', lastName: '', email: '', phoneNumber: '', photoPath: '', dateOfBirth: new Date() };

export const CreateCustomer = (props) => {
    const [imageSRC] = useState('');

    const apiUrl = `https://localhost:5001/api/customers`;


    const customerCreateHandler = (customer) => {
        axios.post(apiUrl, customer)
            .then(res => {
                props.history.replace('/customerList')
            });
    }



    const backToListHandler = () => {
        props.history.replace({
            pathname: '/customerList'
        });

    }


    return (
        <>
            <CustomerForm
                backToListHandler={backToListHandler}
                heading={"Customer Create Form"}
                imageSRC={imageSRC}
                buttonAction={"Create"}
                onCustomerChange={customerCreateHandler}
                initialCustomerData={initialCustomerData}
            />
        </>
    );
}