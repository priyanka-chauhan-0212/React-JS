import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";

export default function Datatable() {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [users, setUsers] = useState();
    const [modal, setModal] = useState(false);
    const [userID, setUserId] = useState();
    // const [error, setError] = useState(false);

    const { register, formState: { errors }, handleSubmit, trigger } = useForm();
    console.log(errors.firstName);

    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add("active-modal");
    } else {
        document.body.classList.remove("active-modal");
    }
    const getAllFunction = () => {
        axios.get("http://localhost:8000/api/v1/getAllUser").then((res) => {
            if (res.data.success === 1) {
                setUsers(res.data.data);
            }
        });
    };

    useEffect(() => {
        getAllFunction();
    }, []);
    const handleEditClick = (data) => {
        const id = data._id;
        setUserId(id);

        const bodyData = {
            userId: id,
        };
        axios
            .post("http://localhost:8000/api/v1/getUserById", bodyData)
            .then((res) => {
                if (res.data.success === 1) {
                    let editvalue = res.data && res.data.data;

                    setFirstName(editvalue.firstName);
                    setLastName(editvalue.lastName);
                    setEmail(editvalue.email);
                    setPhone(editvalue.phoneNumber);

                    getAllFunction();
                    setModal(!modal);
                }
            });
    };

    const handleSubmitClick = (data) => {
        // e.preventDefault();
        console.log("ggujgb", data);

        let postData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phone,
            userId: userID,
        };

        if (userID) {
            axios
                .post("http://localhost:8000/api/v1/updateUser", postData)
                .then((res) => {
                    if (res.data.success === 1) {
                        getAllFunction();
                        setModal(!modal);
                        setUserId("");
                        setFirstName("");
                        setLastName("");
                        setEmail("");
                        setPhone("");
                        toast("User Updated Successfully");
                        toast(res.data.message);
                    }
                });
        }
        axios
            .post("http://localhost:8000/api/v1/createUser", postData)
            .then((res) => {
                if (res.data.success === 1) {
                    setUsers(res.data.data);
                    setModal(!modal);
                    toast(res.data.message);
                    // reset();
                    getAllFunction();
                }
            });
    };
    const deleteData = (id) => {
        const bodyData = {
            userId: id,
        };
        axios
            .post("http://localhost:8000/api/v1/deleteUser", bodyData)
            .then((res) => {
                console.log("delete res", res);
                if (res.data.success === 1) {
                    // toast("User Deleted Successfully");
                    toast(res.data.message);
                    getAllFunction();
                }
            });
    };
    const columns = [
        {
            name: "Id",
            selector: (row) => row._id,
            sortable: true,
        },
        {
            name: "First Name",
            selector: (row) => row.firstName,
            sortable: true,
        },
        {
            name: "Last Name",
            selector: (row) => row.lastName,
            sortable: true,
        },
        {
            name: "Last Name",
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: "Last Name",
            selector: (row) => row.phoneNumber,
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row) => {
                return (
                    <div>
                        <button
                            color="transparent"
                            className="btn btn-icon"
                            onClick={() => handleEditClick(row)}
                        >
                            Edit
                        </button>
                        <button
                            color="transparent"
                            className="btn btn-icon"
                            onClick={() => deleteData(row._id)}
                        >
                            Delete
                        </button>
                    </div>
                );
            },
        },
    ];

    return (
        <>
            <div className="button-popup-div">
                <button onClick={toggleModal} className="popup-btn">
                    ADD USER FORM
                </button>
                <DataTable columns={columns} data={users} />
            </div>
            <div className="modal-content">

                <button className="close-modal" onClick={toggleModal}>
                    CLOSE
                </button>
                <h1>Example Form</h1>
                <form onSubmit={handleSubmit(handleSubmitClick)}>
                    <div className="form-group">
                        <div className="mb-3">
                            <label>FirstName</label>
                            <input type="text" name="firstName"
                                value={firstName}
                                maxLength={20}
                                placeholder="First Name"
                                className={`form-control ${errors.firstName && "invalid"
                                    }`}
                                {...register("firstName", {
                                    required: "First Name is Required",
                                })}
                                onChange={(e) => setFirstName(e.target.value)}
                                onKeyUp={() => {
                                    trigger("firstName");
                                }}
                            />

                            {errors.firstName
                                && (
                                    <small className="text-danger">
                                        {errors.firstName.message}
                                    </small>
                                )}
                            <br />
                            <br />
                            <label>LastName</label>
                            <input type="text" name="lastName"
                                value={lastName}
                                maxLength={20}
                                placeholder="Last Name"
                                className={`form-control ${errors.lastName && "invalid"}`}
                                {...register("lastName", {
                                    required: "Last Name is Required",
                                })}
                                onChange={(e) => setLastName(e.target.value)} />
                            {errors.lastName && (
                                <small className="text-danger">
                                    {errors.lastName.message}
                                </small>

                            )}

                            <br />
                            <br />
                            <label>E-mail</label>
                            <input type="text" name="email"
                                value={email}
                                maxLength={20}
                                placeholder="john@gmail.com"

                                className={`form-control ${errors.email && "invalid"
                                    }`}
                                {...register("email", {
                                    required: "email  is Required",
                                })}
                                onChange={(e) => setEmail(e.target.value)}

                                // onKeyUp={() => {
                                //     trigger("email");
                                // }}

                            />
                            {errors.lastName && (
                                <small className="text-danger">
                                    {errors.email.message}
                                </small>)}
                            <br />
                            <br />
                            <label>Mobile Number</label>
                            <input type="number" name="number"
                                value={phone}
                                maxLength={10}
                                placeholder="09876-54321"
                                className={`form-control ${errors.phone && "invalid"
                                    }`}
                                {...register("phone", {
                                    required: "phone  is Required",
                                })}
                                onChange={(e) => setPhone(e.target.value)}

                                // onKeyUp={() => {
                                //     trigger("email");
                                // }}
                                 />
                            {errors.lastName && (
                                <small className="text-danger">
                                    {errors.phone.message}
                                </small>)}
                            <br />
                            <br />

                            <button
                                type="submit"
                                className="btn btn-sm btn-success"
                            // onSubmit={onSubmit}
                            > Save Data
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
