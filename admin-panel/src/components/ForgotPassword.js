import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import apiService from "../services/api.service";

function ForgotPassword() {
  const [message, setMessage] = useState(null);
  const initialValues = {
    email: "",
  };

  const onSubmit = (values) => {
    apiService.post('/identity/sendresetpasswordlink', values).then(response => {
      setMessage("Reset password link email sent!");
    }).catch(err => {
      setMessage("Invalid user details");
    });

  };

  const validationSchema = Yup.object({
    email: Yup.string().max(250).email("Invalid email format").required("Email is required!"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    // validate,
  });


  return (
    <>
      <div className="auth-container">
        <div className="row" >
          <div className="col-lg-5 d-flex align-items-stretch">

            <form className="base-form" onSubmit={formik.handleSubmit}>

              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input type="email" className="form-control" name="email" id="email" {...formik.getFieldProps("email")} />
                {formik.errors.email && formik.touched.email ? (
                  <div className="validate">
                    <p>{formik.errors.email}</p>
                  </div>
                ) : null}
              </div>

              <div>
                <div>
                  {message}
                </div>
                <button type="submit">
                  Send Recovery Email
                </button>
              </div>
              <div className="auth-form-footer">
                <p>Already have account? <Link to="/" className="forgot-pass-link">
                  Login
                </Link></p>

                <p>Don't have an account? <Link to="/register">Register</Link></p>

              </div>
            </form>



          </div>
          <div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-center">
            <section id="services" className="services">
              <div className="container" data-aos="fade-up">

                <div className="section-title">
                  <h2>Forgot Password?</h2>

                  <p>Forgot your account's password or having trouble logging into your Team? Enter your email address and we'll send you a recovery link.</p>
                </div>

              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
