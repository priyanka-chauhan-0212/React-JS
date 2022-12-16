import React, { useState, useEffect, useRef } from 'react'
import DataTable from "react-data-table-component";
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Form, Button } from 'reactstrap';
import { Edit, Trash } from 'react-feather';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CSVLink } from 'react-csv'


const Datatable = React.forwardRef((props, ref) => {
    // const [fname, setFname] = useState("");
    // const [lname, setLname] = useState("");
    // const [email, setEmail] = useState("");
    // const [number, setNumber] = useState("");
    const [bData, setBData] = useState([]);
    const [editId, setEditId] = useState("");

    const csvLink = useRef()


    const SignupSchema = yup.object().shape({
        firstName: yup.string().required("Please enter first name"),
        lastName: yup.string().required("Please enter last name"),
        email: yup
            .string()
            .email("Please enter valid email")
            .required("Please enter email"),
        phoneNumber: yup.string().required("Please enter phone number"),
    });

    const defaultValues = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
    };

    const {
        reset,
        control,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm({

        defaultValues,
        resolver: yupResolver(SignupSchema),
    });

    const onSubmit = (data) => {
        alert("zcszd");
        let postData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
        };

        axios
            .post("http://localhost:8000/api/v1/createUser", postData)
            .then((res) => {
                if (res.data.success === 1) {
                    reset();

                    getAllFunction();
                    toast(res.data.message);
                }
            });
    };

    const onEdit = (data) => {
        alert('dfgdg 576256');
        let postData = {
            userId: editId,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
        };


        axios
            .post("http://localhost:8000/api/v1/updateUser", postData)
            .then((res) => {
                if (res.data.success === 1) {


                    getAllFunction();
                    setEditId("");
                } else {
                    alert('error update')
                }
            });
    };

    const handleEditClick = (data) => {
        // alert("dddjdj");
        const id = data._id;
        const bodyData = {
            userId: id,
        };
        // alert('ok')
        axios
            .post("http://localhost:8000/api/v1/getUserById", bodyData)
            .then((res) => {
                if (res.data.success === 1) {
                    // alert('ok')
                    // console.log(res.data)
                    let setData = res.data && res.data.data;
                    // console.log(setData)
                    setValue("firstName", setData.firstName);
                    setValue("lastName", setData.lastName);
                    setValue("email", setData.email);
                    setValue("phoneNumber", setData.phoneNumber);
                    setEditId(id);
                }
            });
    };

    const deleteData = (id) => {

        console.log("func called");

        const bodyData = {
            userId: id,
        };

        axios
            .post("http://localhost:8000/api/v1/deleteUser", bodyData)
            .then((res) => {
                console.log("delete res", res);
                if (res.data.success === 1) {
                    getAllFunction();
                    toast(res.data.message);
                }
            })
    }


    // <Form
    //     tag={Form}
    //     onSubmit={
    //         editId == "" || editId == undefined || editId == null
    //             ? handleSubmit(onSubmit)
    //             : handleSubmit(onEdit)
    //     }
    // />
    const getAllFunction = () => {
        axios.get("http://localhost:8000/api/v1/getAllUser").then((res) => {
            if (res.data.success === 1) {
                setBData(res.data.data);

            }
        });
    };

    useEffect(() => {
        getAllFunction();
    }, []);


    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     console.log(bData);
    // }
    const handleDiscard = () => {
        reset();
    };

    const updatedColumns = [
        {
            name: <h1>First Name</h1>,
            sortable: true,
            minWidth: "350px",
            cell: (row) => <h3>{row.firstName}</h3>,
            selector: (row) => row.firstName,
        },
        {
            name: <h1>Last Name</h1>,
            sortable: true,
            minWidth: "350px",
            cell: (row) => <h3>{row.lastName}</h3>,
            selector: (row) => row.lastName,
        }, {
            name: <h1>Email</h1>,
            sortable: true,
            minWidth: "350px",
            cell: (row) => <h3>{row.email}</h3>,
            selector: (row) => row.email,
        }, {
            name: <h1>Number</h1>,
            sortable: true,
            minWidth: "350px",
            cell: (row) => <h3>{row.phoneNumber}</h3>,
            selector: (row) => row.phoneNumber,
        }, {
            name: <h1>Actions</h1>,
            cell: (row) => {
                return (
                    <div className='box'>
                        <Button onClick={() => handleEditClick(row)} >
                            <Edit /></Button>
                        <Button onClick={() => deleteData(row._id)}>
                            <Trash />
                            <ToastContainer />
                        </Button>
                    </div >
                );
            },
        },
    ]

    const getTransactionData = async () => {
        csvLink.current.link.click()
    }


    return (
        <>
            <div className='form'>
                <h2>{editId === "" || editId === undefined || editId === null
                    ? "Add User"
                    : "Update User"}</h2>
                <form
                    onSubmit={
                        editId === "" || editId === undefined || editId === null
                            ? handleSubmit(onSubmit)
                            : handleSubmit(onEdit)
                    }

                >
                    <ToastContainer />
                    <label className='lbl'>First Name</label>
                    {/* <input
                        type="text"
                        value={fname}
                        placeholder="First Name"
                        onChange={(e) => setFname(e.target.value)}
                    /> */}
                    <Controller
                        control={control}
                        id="firstName"
                        name="firstName"
                        render={({ field }) => (
                            <Input
                                maxLength={50}
                                placeholder="First Name"
                                invalid={errors.firstName && true}
                                {...field}
                            />
                        )}
                    />
                    <label className='lbl'>Last Name</label>
                    {/* <input
                        type="text"
                        value={lname}
                        placeholder="Last Name"
                        onChange={(e) => setLname(e.target.value)}
                    /> */}
                    <Controller
                        control={control}
                        id="lastName"
                        name="lastName"
                        render={({ field }) => (
                            <Input
                                maxLength={50}
                                placeholder="Last Name"
                                invalid={errors.lastName && true}
                                {...field}
                            />
                        )}
                    />
                    <label className='lbl'>Email </label>
                    {/* <input
                        type="text"
                        value={email}
                        placeholder="john@gmail.com"
                        onChange={(e) => setEmail(e.target.value)} /> */}
                    <Controller
                        control={control}
                        id="email"
                        name="email"
                        render={({ field }) => (
                            <Input
                                maxLength={50}
                                placeholder="john@gmail.com"
                                invalid={errors.email && true}
                                {...field}
                            />
                        )}
                    />

                    <label className='lbl'>Number</label>
                    {/* <input
                        type="text"
                        value={number}
                        placeholder="Phone Number"
                        onChange={(e) => setNumber(e.target.value)}
                    /> */}
                    <Controller
                        control={control}
                        id="phoneNumber"
                        name="phoneNumber"
                        render={({ field }) => (
                            <Input
                                maxLength={50}
                                placeholder="Phone Number"
                                invalid={errors.phoneNumber && true}
                                {...field}
                            />
                        )}
                    />
                    <br />
                    <button type='submit' className='btnAddUser'>{editId === "" || editId === undefined || editId === null
                        ? "Add User"
                        : "Update User"}</button>
                    <button type="reset"
                        onClick={handleDiscard} className='btn-outline-secondary'>Reset</button>
                    <button className='btnAddUser' onClick={getTransactionData}>Export csv</button>
                    <CSVLink
                        data={bData}
                        filename='transactions.csv'
                        ref={csvLink}
                        target='_blank'
                    />
                    {/* <button onclick={window.print()}>{bData}Export pdf</button> */}
                    {/* <ReactToPrint trigger={() =>
                        <button className='btn-outline-secondary' >Export pdf</button>
                    }  content={componentRef} documentTitle='new document' pageStyle="print"
                    />   */}

                    {/* <PDFDownloadLink   data={bData}    fileName="somename.pdf">
                        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : <a href={url}>Url Link here</a>)}
                    </PDFDownloadLink> */}
                </form>

            </div>
            <div className="react-dataTable " ref={ref} >
                <DataTable columns={updatedColumns} data={bData}></DataTable>
            </div>

        </>
    )
});

export default Datatable;