/*eslint-disable*/

import { useEffect, useState, Fragment } from "react";

import {
  Row,
  Col,
  Label,
  Form,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormFeedback,
} from "reactstrap";
import { toast } from "react-toastify";

import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

import ReactPaginate from "react-paginate";

import DataTable from "react-data-table-component";
import { useForm, Controller } from "react-hook-form";
import { Check, ChevronDown, Edit, Trash, X } from "react-feather";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// import "@styles/react/libs/tables/react-dataTable-component.scss";

import axios from "axios";
import { BallTriangle, Circles } from "react-loader-spinner";

const MySwal = withReactContent(Swal);

const SignupSchema = yup.object().shape({
  firstName: yup.string().required("Please enter first name"),
  lastName: yup.string().required("Please enter last name"),
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Please enter email"),
  phoneNumber: yup.string().required("Please enter phone number"),
});

const CustomHeader = ({ setShow }) => {
  return (
    <Row className="text-nowrap w-100 my-75 g-0 permission-header">
      <Col xs={12} lg={12}>
        <div
          className="mt-lg-0 mt-3 mb-3"
        //   style={{ textAlign: "right", margin: "10px 160px" }}
        >
          <Button
            className="add-permission mt-sm-0 mt-1"
            color="primary"
            onClick={() => setShow(true)}
          >
            Add User
          </Button>
        </div>
      </Col>
    </Row>
  );
};

const Table = () => {
  // ** Store Vars & Hooks
  const history = useHistory();

  const [editId, setEditId] = useState("");
  const [loader, setLoader] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);

  const handlePagination = (page) => {
    console.log("selected page", page.selected);
    setCurrentPage(page.selected);
  };

  const CustomPagination = () => (
    <ReactPaginate
      previousLabel={""}
      nextLabel={""}
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={Math.ceil(totalRecord / 10) || 1}
      breakLabel={"..."}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      nextLinkClassName="page-link"
      pageLinkClassName="page-link"
      breakLinkClassName="page-link"
      previousLinkClassName="page-link"
      nextClassName="page-item next-item"
      previousClassName="page-item prev-item"
      containerClassName={
        "pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
      }
    />
  );
  const deleteData = (id) => {
    return MySwal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this record?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ml-4",
      },
      buttonsStyling: true,
    }).then(function (result) {
      if (result.value) {
        const bodyData = {
          userId: id,
        };

        axios
          .post("http://localhost:8000/api/v1/deleteUser", bodyData)
          .then((res) => {
            console.log("delete res", res);
            if (res.data.success === 1) {
              MySwal.fire({
                icon: "success",
                title: "Deleted!",
                text: "Your record has been deleted.",
                customClass: {
                  confirmButton: "btn btn-success",
                },
              });
              getAllFunction();
            } else {
              toast.error(<ErrorToast message={res.data.message} />, {
                hideProgressBar: true,
              });
            }
          })
          .catch(function (error) {
            if (error.message == "Network Error") {
              console.log("server error");
            }
          });
      }
    });
  };

  const SuccessToast = ({ message }) => {
    return (
      <Fragment>
        <div className="toastify-header">
          <div className="title-wrapper">
            {/* <Avatar size="sm" color="success" icon={<Check size={12} />} /> */}
            <h6 className="toast-title">Success !</h6>
          </div>
        </div>
        <div className="toastify-body">
          <span role="img" aria-label="toast-text">
            {message}
          </span>
        </div>
      </Fragment>
    );
  };

  const ErrorToast = ({ message }) => {
    return (
      <Fragment>
        <div className="toastify-header">
          <div className="title-wrapper">
            {/* <Avatar size="sm" color="danger" icon={<X size={12} />} /> */}
            <h6 className="toast-title">Error!</h6>
          </div>
        </div>
        <div className="toastify-body">
          <span role="img" aria-label="toast-text">
            {message}
          </span>
        </div>
      </Fragment>
    );
  };

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
    mode: "onBlur",
    defaultValues,
    resolver: yupResolver(SignupSchema),
  });

  const [show, setShow] = useState(false);

  const handleEditClick = (data) => {
    const id = data._id;

    const bodyData = {
      userId: id,
    };

    axios
      .post("http://localhost:8000/api/v1/getUserById", bodyData)
      .then((res) => {
        if (res.data.success === 1) {
          let setData = res.data && res.data.data;

          setValue("firstName", setData.firstName);
          setValue("lastName", setData.lastName);
          setValue("email", setData.email);
          setValue("phoneNumber", setData.phoneNumber);

          setEditId(id);
        }
      });

    setShow(true);
  };

  const handleModalClosed = () => {
    setValue("permissionName", "");
    reset();
  };

  const onSubmit = (data) => {
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
          setShow(false);
          reset();
          toast.success(<SuccessToast message={res.data.message} />, {
            hideProgressBar: true,
          });
          getAllFunction();
        } else {
          toast.error(<ErrorToast message={res.data.message} />, {
            hideProgressBar: true,
          });
        }
      });
  };

  const onEdit = (data) => {
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
          setShow(false);
          reset();
          toast.success(<SuccessToast message={res.data.message} />, {
            hideProgressBar: true,
          });
          getAllFunction();
          setEditId("");
        } else {
          toast.error(<ErrorToast message={res.data.message} />, {
            hideProgressBar: true,
          });
        }
      });
  };

  const updatedColumns = [
    {
      name: <h5>First Name</h5>,
      sortable: true,
      minWidth: "350px",
      cell: (row) => <h6>{row.firstName}</h6>,
      selector: (row) => row.firstName,
    },
    {
      name: <h5>Last Name</h5>,
      sortable: true,
      minWidth: "250px",
      cell: (row) => <h6>{row.lastName}</h6>,
      selector: (row) => row.lastName,
    },
    {
      name: <h5>E-Mail</h5>,
      sortable: true,
      minWidth: "250px",
      cell: (row) => <h6>{row.email}</h6>,
      selector: (row) => row.email,
    },
    {
      name: <h5>Phone Number</h5>,
      sortable: true,
      minWidth: "350px",
      cell: (row) => <h6>{row.phoneNumber}</h6>,
      selector: (row) => row.phoneNumber,
    },
    {
      name: <h5>Actions</h5>,
      cell: (row) => {
        return (
          <div className="d-flex align-items-center permissions-actions">
            <Button
              size="sm"
              color="transparent"
              className="btn btn-icon"
              onClick={() => handleEditClick(row)}
            >
              <Edit className="font-medium-2" />
            </Button>
            <Button
              size="sm"
              color="transparent"
              className="btn btn-icon"
              onClick={() => deleteData(row._id)}
            >
              <Trash className="font-medium-2" />
            </Button>
          </div>
        );
      },
    },
  ];

  const handleDiscard = () => {
    setEditId("");
    reset();
    setShow(false);
  };

  const renderForm = () => {
    return (
      <Row
        tag={Form}
        onSubmit={
          editId == "" || editId == undefined || editId == null
            ? handleSubmit(onSubmit)
            : handleSubmit(onEdit)
        }
      >
        <Col xs={12} className="mt-2">
          <Label className="form-label" for="firstName">
            First Name
          </Label>
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
          {errors && errors.firstName && (
            <FormFeedback>{errors.firstName.message}</FormFeedback>
          )}
        </Col>
        <Col xs={12} className="mt-2">
          <Label className="form-label" for="lastName">
            Last Name
          </Label>
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
          {errors && errors.lastName && (
            <FormFeedback>{errors.lastName.message}</FormFeedback>
          )}
        </Col>

        <Col xs={12} className="mt-2">
          <Label className="form-label" for="email">
            E-mail
          </Label>
          <Controller
            control={control}
            id="email"
            name="email"
            render={({ field }) => (
              <Input
                maxLength={50}
                placeholder="john@email.com"
                invalid={errors.email && true}
                {...field}
              />
            )}
          />
          {errors && errors.email && (
            <FormFeedback>{errors.email.message}</FormFeedback>
          )}
        </Col>

        <Col xs={12} className="mt-2">
          <Label className="form-label" for="phoneNumber">
            Phone Number
          </Label>
          <Controller
            control={control}
            id="phoneNumber"
            name="phoneNumber"
            render={({ field }) => (
              <Input
                type="number"
                placeholder="Phone Number"
                invalid={errors.phoneNumber && true}
                {...field}
              />
            )}
          />
          {errors && errors.phoneNumber && (
            <FormFeedback>{errors.phoneNumber.message}</FormFeedback>
          )}
        </Col>

        <Col xs={12} className="mt-4">
          <Button className="" color="primary">
            {editId == "" || editId == undefined || editId == null
              ? "Add"
              : "Update"}
          </Button>
          <Button
            className="ml-3"
            style={{ marginLeft: "12px" }}
            outline
            type="reset"
            onClick={handleDiscard}
          >
            Discard
          </Button>
        </Col>
      </Row>
    );
  };

  const [bData, setBData] = useState([]);
  const [totalRecord, setTotalRecord] = useState(0);

  const getAllFunction = () => {
    axios.get("http://localhost:8000/api/v1/getAllUser").then((res) => {
      if (res.data.success === 1) {
        setBData(res.data.data);
      }
    });
  };
  useEffect(() => {
    getAllFunction();
  }, [currentPage]);

  return (
    <>
      {loader ? null : ( // </div> // <Spinner /> //   /> //     width={80} //     margin="0 auto" //     display="block" //     height={80} //     color="#00BFFF" //     style={{ display: "block", margin: "0 auto" }} //   <Circles // <div>
        <Fragment>
          <div className="react-dataTable">
            <DataTable
              noHeader
              //   pagination

              //   paginationServer
              columns={updatedColumns}
              paginationPerPage={10}
              className="react-dataTable"
              sortIcon={<ChevronDown />}
              paginationDefaultPage={currentPage}
              //   paginationComponent={CustomPagination}
              subHeader
              responsive
              data={bData}
              subHeaderComponent={
                <CustomHeader setShow={setShow} bData={bData} />
              }
            />
          </div>
          <Modal
            isOpen={show}
            onClosed={handleModalClosed}
            className="modal-dialog-centered"
          >
            <ModalHeader
              className="bg-transparent"
              style={{ textAlign: "center" }}
            >
              {" "}
              {editId == "" || editId == undefined || editId == null
                ? "ADD USER"
                : "EDIT  USER"}
            </ModalHeader>
            <ModalBody className="p-3 pt-0">{renderForm()}</ModalBody>
          </Modal>
        </Fragment>
      )}
    </>
  );
};

export default Table;
