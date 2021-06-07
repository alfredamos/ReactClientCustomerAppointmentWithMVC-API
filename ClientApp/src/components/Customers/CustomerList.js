import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faBook } from '@fortawesome/free-solid-svg-icons';
import { SearchItem } from '../Utilities/Helpers/SearchItem';
import axios from 'axios';

export const CustomerList = (props) => {
    const [customers, setCustomers] = useState([])
    const [filter, setFilter] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const customerUrl = `https://localhost:5001/api/customers`;


    const editHandler = (id) => {
        console.log(id);
        props.history.replace({
            pathname: `/editCustomer/${id}`
        });

    }

    const deleteHandler = (id) => {
        console.log(id);
        props.history.replace({
            pathname: `/deleteCustomer/${id}`
        });
    }


    const createHandler = () => {
        props.history.replace({
            pathname: '/createCustomer'
        });
    }


    const detailHandler = (id) => {
        console.log(id);
        props.history.replace({
            pathname: `/detailCustomer/${id}`
        });
    }


    useEffect(() => {
        let onMount = true;
        axios.get(customerUrl)
            .then(res => {
                if (onMount) {
                    setCustomers(res.data);
                    setIsLoading(true);
                }
            })
        return () => onMount = false;
    }, [customerUrl, customers]);


    const filterHandler = (event) => {
        const { value } = event.target;
        setFilter(value)
    }


    const searchHandler = (event) => {
        event.preventDefault();
        console.log("filter : ", filter);
        if (filter !== "") {
            const searchApiUrl = `${customerUrl}/search/${filter}`;
            axios.get(searchApiUrl)
                .then(res => {
                    setCustomers(res.data)
                });
        } else {
            axios.get(customerUrl)
                .then(res => {
                    setCustomers(res.data)
                });
        }
    }


    return (
        <>
            {
                isLoading &&
                <section>
                    <div className="border">
                        <div className="card-header text-center">
                            <h4>List of Customers</h4>
                        </div>
                        <div className="card-body">
                            <SearchItem filterHandler={filterHandler} searchHandler={searchHandler} />
                            <br />
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Profile Pic</th>
                                        <th>Full Name</th>
                                        <th>Email</th>
                                        <th>Phone Number</th>
                                        <th>Date of Birth</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        customers.map((customer) => (

                                            <tr key={customer.customerID}>
                                                <td><img src={customer.photoPath} style={{width: '100px', height: '100px'}} alt="customerPics"/></td>
                                                <td>{customer.fullName}</td>
                                                <td>{customer.email}</td>
                                                <td>{customer.phoneNumber}</td>
                                                <td>{new Date(customer.dateOfBirth).toLocaleDateString()}</td>
                                                <td>
                                                    <button onClick={() => editHandler(customer.customerID)} className="btn btn-warning mr-2" style={{ fontWeight: "bold" }}><FontAwesomeIcon icon={faEdit} /></button>
                                                    <button onClick={() => deleteHandler(customer.customerID)} className="btn btn-danger mr-2" style={{ fontWeight: "bold" }}><FontAwesomeIcon icon={faTrash} /></button>
                                                    <button onClick={() => detailHandler(customer.customerID)} className="btn btn-primary" style={{ fontWeight: "bold" }}><FontAwesomeIcon icon={faBook} /></button>
                                                </td>
                                            </tr>

                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="card-footer">
                            <button type="button" onClick={createHandler} className="btn btn-primary btn-block" style={{ fontWeight: "bold" }}>Create Customer</button>
                        </div>
                    </div>
                </section>
            }
        </>
    );


}

