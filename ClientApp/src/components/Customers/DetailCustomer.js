import React, { useState, useEffect } from 'react';
import axios from 'axios';


export const DetailCustomer = (props) => {
    const [customer, setCustomer] = useState({customerID: '', firstName: '', lastName: '', email: '', phoneNumber: '', dateOfBirth: '' });

    const apiUrl = `https://localhost:5001/api/customers/${props.match.params.id}`;


    useEffect(() => {
        const GetData = async () => {
            const result = await axios(apiUrl);
            setCustomer(result.data);
        };
        GetData();
    }, [apiUrl]);


    const backToListHandler = () => {
        props.history.replace({
            pathname: '/customerList'
        });

    }

    const deleteHandler = async (id) => {
        console.log(id);
        console.log("Click me Delete");
        props.history.replace({
            pathname: `/deleteCustomer/${id}`
        });
    }

    return (

        <div className="border" style={{ width: '50%' }}>
            <div className="card-header text-center">
                <h3>Customer Detail</h3>
            </div>
            <div className="card-body">
                <table>
                    <tbody>
                        <tr>
                            <td><strong>Full Name : </strong>{customer.fullName}</td>
                        </tr>
                        <tr>
                            <td><strong>Email Address : </strong>{customer.email}</td>
                        </tr>
                        <tr>
                            <td><strong>Phone Number : </strong>{customer.phoneNumber}</td>
                        </tr>
                        <tr>
                            <td><strong>Date of Birth : </strong>{customer.dateOfBirth}</td>
                        </tr>
                        <tr>
                            <td><img src={customer.photoPath} style={{ height: "200px" }} alt="" /> </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="card-footer">
                <button type="button" className="btn btn-outline-danger btn-block" onClick={() => deleteHandler(customer.customerID)} style={{ fontWeight: "bold" }}>
                    Delete
                </button>
                <button type="button" className="btn btn-outline-primary btn-block" onClick={backToListHandler} style={{ fontWeight: "bold" }}>
                    Back to List
                </button>
            </div >
        </div >

    );

}
