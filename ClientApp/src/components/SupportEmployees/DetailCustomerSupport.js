import React, { useState, useEffect } from 'react';
import axios from 'axios';


export const DetailCustomerSupport = (props) => {
    const [customerSupport, setCustomerSupport] = useState({ customerSupportID: '', firstName: '', lastName: '', role: ''});

    const apiUrl = `https://localhost:5001/api/supportemployees/${props.match.params.id}`;


    useEffect(() => {
        const GetData = async () => {
            const result = await axios(apiUrl);
            setCustomerSupport(result.data);
        };
        GetData();
    }, [apiUrl]);


    const backToListHandler = () => {
        props.history.replace({
            pathname: '/customerSupportList'
        });

    }

    const deleteHandler = async (id) => {
        console.log(id);
        console.log("Click me Delete");
        props.history.replace({
            pathname: `/deleteCustomerSupport/${id}`
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
                            <td><strong>First Name : </strong>{customerSupport.fullName}</td>
                        </tr>
                        <tr>
                            <td><strong>Last Name : </strong>{customerSupport.lastName}</td>
                        </tr>
                        <tr>
                            <td><strong>Role : </strong>{customerSupport.role}</td>
                        </tr>                       
                    </tbody>
                </table>
            </div>
            <div className="card-footer">
                <button type="button" className="btn btn-outline-danger btn-block" onClick={() => deleteHandler(customerSupport.customerSupportID)} style={{ fontWeight: "bold" }}>
                    Delete
                </button>
                <button type="button" className="btn btn-outline-primary btn-block" onClick={backToListHandler} style={{ fontWeight: "bold" }}>
                    Back to Customer Support Employee List
                </button>
            </div >
        </div >

    );

}
