import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from 'formik';
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import "./styles/styledRegister.css";
import axios from "axios";
import { envirnoment } from "../envirnoment";
import TextField from "./common/TextField";
import SelectField from "./common/SelectField";
import { useDispatch, useSelector } from 'react-redux';
import { register } from "../actions/auth";

function Register(props) {
  const { isLoggedIn } = useSelector(state => state.auth);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userType: "admin",
    isAdmin: true,
    emailVerified: true
  };

  const onSubmit = (values) => {
    console.log(values)
    let body = {
      ...values
    }
    // axios.post("http://localhost:5000/auth/register", body).then((response)=>{console.log(response)})
    dispatch(register(body))
      .then(() => {
        window.location.reload();
        props.history.push("/verify-email");
        setLoading(false);
      })
      .catch((err) => {
        setErrorMessage("Username password combination is incorrect!");
        setLoading(false);
      });
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().max(50).required("First name is required!"),
    lastName: Yup.string().max(50).required("Last name is required!"),
    email: Yup.string().max(250).email("Invalid email format").required("Email is required!"),
    // username: Yup.string().max(250).required("Username is required!"),
    password: Yup.string().min(8).max(15).required("Password is required!"),
    });

  useEffect(() => {
    if (isLoggedIn == true)
      navigate('/verify-email');
  }, [isLoggedIn]);

  if (isLoggedIn) {
    navigate('/verify-email');
  }

  return (
    <div>
      <div className="auth-container">

        <div className="row" >
          <div className="col-lg-5 d-flex align-items-stretch">
            <section id="feature" className="feature">
              <div className="container" data-aos="fade-up">

                <div className="section-title">
                  <h2>Register Now</h2>
                </div>
              </div>
            </section>

          </div>
          <div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">

            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {(props) => (
                <Form className="base-form">
                  <div className="row">
                    <div className="col-md-6">
                      <TextField type="text" id="firstName" name="firstName" fieldName="First Name"  {...props} />
                    </div>
                    <div className="col-md-6">
                      <TextField type="text" id="lastName" name="lastName" fieldName="Last Name"  {...props} />
                    </div>

                    <div className="col-md-6">
                      <TextField type="email" id="email" name="email" fieldName="Email"  {...props} />
                    </div>

                    <div className="col-md-6">
                      <TextField type="username" id="username" name="username" fieldName="Username"  {...props} />
                    </div>
                    
                    <div className="col-md-6">
                      <TextField type="password" id="password" name="password" fieldName="Password"  {...props} />
                    </div>
                  </div>
                  <div className="validate">
                    {errorMessage && (<> {errorMessage} </>)}
                  </div>
                  <button type="submit">Submit</button>
                  <div className="auth-form-footer">
                    <p>Already have account? <Link to="/" className="forgot-pass-link">
                      Login
                    </Link></p>

                  </div>
                </Form>)}
            </Formik>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;