import React from 'react';
import { CustomerSupportForm } from '../Utilities/Forms/CustomerSupportForm';
import axios from 'axios';


const initialCustomerSupportEmployeeData = { firstName: '', lastName: '', role: '' };

export const CreateCustomerSupport = (props) => {
    
    const apiUrl = `https://localhost:5001/api/supportemployees`;


    const customerSupportCreateHandler = (customerSupport) => {
        axios.post(apiUrl, customerSupport)
            .then(res => {
                props.history.replace('/customerSupportList')
            });
    }



    const backToListHandler = () => {
        props.history.replace({
            pathname: '/customerSupportList'
        });

    }


    return (
        <>
            <CustomerSupportForm
                backToListHandler={backToListHandler}
                heading={"Customer Support Employee Create Form"}               
                buttonAction={"Create"}
                onCustomerSupportChange={customerSupportCreateHandler}
                initialCustomerSupportData={initialCustomerSupportEmployeeData}
            />
        </>
    );
}