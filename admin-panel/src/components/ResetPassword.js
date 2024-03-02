import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import apiService from "../services/api.service";

function ResetPassword() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const onSubmit = (values) => {
    let email = searchParams.get("email");
    let token = searchParams.get("token")?.split(' ')?.join('+');
    if (!email || !token) {
      setErrorMessage("Invalid user details");
      return;
    } else {
      setErrorMessage(null);
      let body = { ...values, email, token };
      apiService.post('/identity/setpassword', body).then(response => {
        toast.success("Password reset successfull");
        navigate('/');
      }).catch(err => {
        toast.error("Invalid user details");
      });
    }
  };

  const validationSchema = Yup.object({
    password: Yup.string().min(8).max(15).required("Password is required!"),
    confirmPassword: Yup.string().when("password", {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both password need to be the same"
      )
    }).required("Confirm password is required!"),//Yup.string().min(8).max(15).required("Confirm password is required!"),
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
                <label htmlFor="password">New Password</label>
                <input type="password" className="form-control" name="password" id="password" {...formik.getFieldProps("password")} />
                {formik.errors.password && formik.touched.password ? (
                  <div className="validate">
                    <p>{formik.errors.password}</p>
                  </div>
                ) : null}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input type="password" className="form-control" name="confirmPassword" id="confirmPassword" {...formik.getFieldProps("confirmPassword")} />
                {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
                  <div className="validate">
                    <p>{formik.errors.confirmPassword}</p>
                  </div>
                ) : null}
              </div>


              <div>
                <div className="validate">
                  {errorMessage && (<> {errorMessage} </>)}
                </div>
                <button type="submit">
                  Reset Password
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
                  <h2>Reset Password</h2>

                  <p>Create new password and save it on a secure place.</p>
                </div>

              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
