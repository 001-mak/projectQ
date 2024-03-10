import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import "../../../styles/styledRegister.css";
import axios from "axios";
import TextField from "../../../common/TextField";
import { Toast } from "react-bootstrap";

function AddUser(user) {
  const navigate = useNavigate();
  if (!user) {
    navigate("/");
  }

  const [loading, setLoading] = useState(false);
  const [toastShow, setToastShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectUserType, setUserType] = useState("buyer");

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().max(50).required("First name is required!"),
    lastName: Yup.string().max(50).required("Last name is required!"),
    email: Yup.string()
      .max(250)
      .email("Invalid email format")
      .required("Email is required!"),
    // username: Yup.string().max(250).required("Username is required!"),
    password: Yup.string().min(8).max(15).required("Password is required!"),
  });

  const onSubmit = async (values) => {
    let body = {
      ...values,
      userType: selectUserType,
    };
    console.log(body);
    setLoading(true);

    await axios
      .post("http://localhost:5000/auth/register", body)
      .then((response) => {
        console.log(response);
      });

    setTimeout(() => {
      setLoading(false)
      setToastShow(true)
    }, 2000);
  };

  return (
    <div>
      <h1>Add user</h1>

      {/* TOASTS for user created and verfication email send msg */}
      <Toast bg='light' onClose={() => setToastShow(false)} show={toastShow} delay={3000} autohide>
      <Toast.Body>User created, plz verify your email.</Toast.Body>
    </Toast>

      <div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form className="base-form">
              <div className="row">
                <div className="col-md-12">
                  <label htmlFor="role">Select Role:</label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    required
                    autoFocus
                    name="Register As"
                    value={selectUserType}
                    onChange={(e) => {
                      setUserType(e.target.value);
                      console.log(e.target.value);
                    }}
                  >
                    {/* <option selected>Register As</option> */}
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <TextField
                    type="text"
                    id="firstName"
                    name="firstName"
                    fieldName="First Name"
                    {...props}
                  />
                </div>
                <div className="col-md-6">
                  <TextField
                    type="text"
                    id="lastName"
                    name="lastName"
                    fieldName="Last Name"
                    {...props}
                  />
                </div>

                <div className="col-md-6">
                  <TextField
                    type="email"
                    id="email"
                    name="email"
                    fieldName="Email"
                    {...props}
                  />
                </div>

                <div className="col-md-6">
                  <TextField
                    type="username"
                    id="username"
                    name="username"
                    fieldName="Username"
                    {...props}
                  />
                </div>

                <div className="col-md-6">
                  <TextField
                    type="password"
                    id="password"
                    name="password"
                    fieldName="Password"
                    {...props}
                  />
                </div>
              </div>
              <div className="validate">
                {errorMessage && <> {errorMessage} </>}
              </div>
              <button type="submit">Create</button>
              {loading ? (
                <div class="d-flex justify-content-center">
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : null}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddUser;
