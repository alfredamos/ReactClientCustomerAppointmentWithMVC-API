import React, { useState, useEffect } from 'react';
import { CustomerForm } from '../Utilities/Forms/CustomerForm';
import axios from 'axios';


const initCustomerData = {customerID: '', firstName: '', lastName: '', email: '', phoneNumber: '', photoPath: '', dateOfBirth: new Date() };

export const EditCustomer = (props) => {
    const [customer, setCustomer] = useState(initCustomerData)
    const [isLoading, setIsLoading] = useState(false)
    const [imageSRC, setImageSRC] = useState('');


    const apiUrl = `https://localhost:5001/api/customers/${props.match.params.id}`;


    useEffect(() => {
        const GetData = async () => {
            const result = await axios(apiUrl);
            setCustomer(result.data);
            setIsLoading(true);
            if (result.data.photoPath !== null) {
                const imageUrl = result.data.photoPath;
                setImageSRC(imageUrl);
            }
        };
        GetData();
    }, [apiUrl, isLoading]);  


    const customerEditHandler = (customer) => {
        axios.put(apiUrl, customer)
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
            {
                isLoading &&
                <CustomerForm
                    backToListHandler={backToListHandler}
                    heading={"Customer Edit Form"}
                    imageSRC={imageSRC}
                    buttonAction={"Save"}
                    onCustomerChange={customerEditHandler}
                    initialCustomerData={customer}
                />
            }
        </>
    );
}