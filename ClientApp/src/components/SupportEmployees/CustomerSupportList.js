import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faBook } from '@fortawesome/free-solid-svg-icons';
import { SearchItem } from '../Utilities/Helpers/SearchItem';
import axios from 'axios';

export const CustomerSupportList = (props) => {
    const [customerSupports, setCustomerSupports] = useState([])
    const [filter, setFilter] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const customerSupportUrl = `https://localhost:5001/api/supportemployees`;


    const editHandler = (id) => {
        console.log(id);
        props.history.replace({
            pathname: `/editCustomerSupport/${id}`
        });

    }

    const deleteHandler = (id) => {
        console.log(id);
        props.history.replace({
            pathname: `/deleteCustomerSupport/${id}`
        });
    }


    const createHandler = () => {
        props.history.replace({
            pathname: '/createCustomerSupport'
        });
    }


    const detailHandler = (id) => {
        console.log(id);
        props.history.replace({
            pathname: `/detailCustomerSupport/${id}`
        });
    }


    useEffect(() => {
        let onMount = true;
        axios.get(customerSupportUrl)
            .then(res => {
                if (onMount) {
                    setCustomerSupports(res.data);
                    setIsLoading(true);
                }
            })
        return () => onMount = false;
    }, [customerSupportUrl, customerSupports]);


    const filterHandler = (event) => {
        const { value } = event.target;
        setFilter(value)
    }


    const searchHandler = (event) => {
        event.preventDefault();
        console.log("filter : ", filter);
        if (filter !== "") {
            const searchApiUrl = `${customerSupportUrl}/search/${filter}`;
            axios.get(searchApiUrl)
                .then(res => {
                    setCustomerSupports(res.data)
                });
        } else {
            axios.get(customerSupportUrl)
                .then(res => {
                    setCustomerSupports(res.data)
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
                            <h4>List of Customer Support Employees</h4>
                        </div>
                        <div className="card-body">
                            <SearchItem filterHandler={filterHandler} searchHandler={searchHandler} />
                            <br />
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>                                       
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Role</th>                                        
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        customerSupports.map((customerSupport) => (

                                            <tr key={customerSupport.customerSupportID}>
                                               
                                                <td>{customerSupport.firstName}</td>
                                                <td>{customerSupport.lastName}</td>
                                                <td>{customerSupport.role}</td>                                                
                                                <td>
                                                    <button onClick={() => editHandler(customerSupport.customerSupportID)} className="btn btn-warning mr-2" style={{ fontWeight: "bold" }}><FontAwesomeIcon icon={faEdit} /></button>
                                                    <button onClick={() => deleteHandler(customerSupport.customerSupportID)} className="btn btn-danger mr-2" style={{ fontWeight: "bold" }}><FontAwesomeIcon icon={faTrash} /></button>
                                                    <button onClick={() => detailHandler(customerSupport.customerSupportID)} className="btn btn-primary" style={{ fontWeight: "bold" }}><FontAwesomeIcon icon={faBook} /></button>
                                                </td>
                                            </tr>

                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="card-footer">
                            <button type="button" onClick={createHandler} className="btn btn-primary btn-block" style={{ fontWeight: "bold" }}>Create Customer Support Employee</button>
                        </div>
                    </div>
                </section>
            }
        </>
    );


}

