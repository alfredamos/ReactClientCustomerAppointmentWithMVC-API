import React, { useState } from 'react';
//import DatePicker from "react-datepicker";


export const CustomerForm = (props) => {
    const { backToListHandler, heading, imageSRC, buttonAction, onCustomerChange, initialCustomerData } = props

    const [customer, setCustomer] = useState(initialCustomerData);
    const [imageSrc, setImageSrc] = useState(imageSRC);



    const handleSubmit = (event) => {
        event.preventDefault();
        onCustomerChange(customer);
    }


    const handleChange = (event) => {
        event.persist();
        setCustomer({ ...customer, [event.target.name]: event.target.value })
    }


    const handleChangeImage = async (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const imageSource = await ConvertBase64(file);
            setImageSrc(imageSource);
            const fileArray = imageSource.split(","); //----> Extract the base64 string ftom the combination of data type and base64 string.
            const fileURL = fileArray[fileArray.length - 1];
            setCustomer({ ...customer, photoPath: fileURL });            
        } else {
            setCustomer({ ...customer, photoPath: "" });
        }
    }


    //const handleChangeDate = date => {
    //    setCustomer({ ...customer, dateOfBirth: date });
    //}

    const handleChangeDate = event => {
        const birthDate = new Date(event.target.value)
        setCustomer({ ...customer, dateOfBirth: birthDate});
    }


    const ConvertBase64 = async (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    }


    return (
        <div className="border" style={{ width: '50%' }}>
            <div className="card-header text-center">
                <h4>{heading}</h4>
            </div>
            <div className="card-body">

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">
                            First Name:
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            required
                            placeholder="firstName"
                            value={customer.firstName}
                            onChange={handleChange}
                            className="form-control"
                        />

                    </div>
                    <div className="form-group">
                        <label className="form-label">
                            Last Name:
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            required
                            placeholder="lastName"
                            value={customer.lastName}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">
                            Email Address:
                        </label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            required
                            placeholder="email"
                            value={customer.email}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">
                            Phone Number:
                        </label>
                        <input
                            type="text"
                            name="phoneNumber"
                            id="phoneNumber"
                            required
                            placeholder="phoneNumber"
                            value={customer.phoneNumber}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateOfBirth" className="form-control-label">
                            Date of Birth:
                        </label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            id="dateOfBirth"                           
                            pattern="\d{4}-\d{2}-\d{2}"
                            value={customer.dateOfBirth === "" && imageSRC}
                            onChange={handleChangeDate}
                            className="form-control"
                        />
                    </div>
                    <hr />
                    <div className="form-group">
                        <label className="form-label">
                            Photo:
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            required
                            placeholder="Choose Photo"
                            onChange={handleChangeImage}
                            className="form-control-file"
                        />
                        <img src={imageSrc === "" ? imageSRC : imageSrc} style={{ height: "200px" }} alt="" />
                    </div>
                    <hr />
                    <div className="form-group">
                        <button type="submit" className="btn btn-secondary btn-block"><strong>{buttonAction}</strong></button>
                    </div>
                    <hr />
                </form>
            </div>
            <div className="card-footer">
                <button onClick={backToListHandler} className="btn btn-primary btn-block"><strong>Back To Customer List</strong></button>
            </div>
        </div>
    );
}