import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/auth";

import { LOGIN_SUCCESS } from "../actions/types";

function Login(props) {
  const { isLoggedIn } = useSelector(state => state.auth);
  const  state  = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values) => {

    // await axios.post("http://localhost:5000/auth/login", values).then((response)=>{
    //   console.log(response.data.user)
    //   localStorage.setItem("user", JSON.stringify(response.data));
    //   const userdata = JSON.parse(localStorage.getItem('user'))
    //   console.log(userdata.user)
    //   dispatch({
    //       type: LOGIN_SUCCESS,
    //       payload: { user: response.data },
    //     });
    //   }).catch((err)=>{console.log(err)})

    setLoading(true);
    dispatch(login(values))
      .then(() => {
        window.location.reload();
        props.history.push("/user-lv");
        setLoading(false);
      })
      .catch((err) => {
        setErrorMessage("Username password combination is incorrect!");
        setLoading(false);
      });
  };

  const validationSchema = Yup.object({
    email: Yup.string().max(250).email("Invalid email format").required("Email is required!"),
    password: Yup.string().required("Required!"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    // validate,
  });

  useEffect(() => {
    if (isLoggedIn == true)
      navigate('/user-lv');
  }, [isLoggedIn]);

  // if (isLoggedIn) {
  //   navigate('/part-lv');
  // }

  return (
    <>
      <div className="auth-container">
        <div className="row" >
          <div className="col-lg-5 d-flex align-items-stretch">
            <form className="base-form" onSubmit={formik.handleSubmit}>
              <div className="row">


                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input type="email" className="form-control" name="email" id="email" {...formik.getFieldProps("email")} />
                  {formik.errors.email && formik.touched.email ? (
                    <div className="validate">
                      <p>{formik.errors.email}</p>
                    </div>
                  ) : null}
                </div>


                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" name="password" id="password" {...formik.getFieldProps("password")} />
                  {formik.errors.password && formik.touched.password ? (
                    <div className="validate">
                      <p>{formik.errors.password}</p>
                    </div>
                  ) : null}
                  <div className="label-bottom-right">
                    <Link to="/forgot-password" >
                      Forgot Password?
                    </Link></div>
                </div>
              </div>

              <div>
                <div className="validate">
                  {errorMessage && (<> {errorMessage} </>)}
                </div>
                <button type="submit">
                  Login
                </button>
              </div>
              <div className="auth-form-footer">
                <p>Don't have an account? <Link to="/register">Register</Link></p>
              </div>
            </form>



          </div>
          <div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-center">
            <section id="services" className="services">
              <div className="container" data-aos="fade-up">

                <div className="section-title">
                  <h2>Login</h2>

                  <p>WE STRIVE TO SERVE YOU.
                    Our focus is on customer service and your comfort.</p>
                </div>


              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
