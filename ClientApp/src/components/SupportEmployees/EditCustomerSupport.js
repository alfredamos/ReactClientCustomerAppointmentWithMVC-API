import React, {useState, useEffect} from 'react';
import { CustomerSupportForm } from '../Utilities/Forms/CustomerSupportForm';
import axios from 'axios';


const initCustomerSupportEmployeeData = {customerSupportID: '', firstName: '', lastName: '', role: '' };

export const EditCustomerSupport = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [customerSupport, setCustomerSupport] = useState(initCustomerSupportEmployeeData);
    const apiUrl = `https://localhost:5001/api/supportemployees/${props.match.params.id}`;


    useEffect(() => {
        const GetData = async () => {
            const result = await axios(apiUrl);
            setCustomerSupport(result.data);
            setIsLoading(true);            
        };
        GetData();
    }, [apiUrl, isLoading]);  


    const customerSupportCreateHandler = (customerSupport) => {
        axios.put(apiUrl, customerSupport)
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
            {
                isLoading &&
                <CustomerSupportForm
                    backToListHandler={backToListHandler}
                    heading={"Customer Support Employee Edit Form"}
                    buttonAction={"Save"}
                    onCustomerSupportChange={customerSupportCreateHandler}
                    initialCustomerSupportData={customerSupport}
                />
            }
        </>
    );
}