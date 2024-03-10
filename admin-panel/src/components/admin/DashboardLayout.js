import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import "./styledDashboard.css"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/auth";
import { Navigate } from "react-router-dom";
import apiService from "../../services/api.service";

const DashboardLayout = (props) => {
  let currentUser = useSelector((state) => state.auth);
  currentUser = currentUser.user
  const dispatch = useDispatch();
  

  // if (currentUser?.user.verified == "False") {
  //   apiService.get(`${process.env.baseUrl}/api/user/${currentUser.user.id}`,
  //   {
  //     headers: {
  //       'Authorization': `Bearer ${currentUser.token}`,
  //       // Other headers...
  //     }
  //   }
  //   ).then(response => {
  //     if (response.data.verified) {
  //       dispatch(logout())
  //         .then(() => {
  //           Navigate("/");
  //           window.location.reload();
  //         })
  //         .catch((err) => {

  //         });
  //     }
  //   });
  // }
  return (
    <>
    <div className="dashboard-container">
      {currentUser.user.emailVerified == true ? 
        <>
          <div className="container-left">
            <Sidebar />
          </div>
          <div className="container-right">
            <div className="breadcrum">
              <h3>{props.title} </h3>
            </div>
            <div className="page-content">
              {props.children}
            </div>

          </div>
        </>
      :
       (
        <div className="container mt-2">
          <div className="d-flex flex-column min-vh-50 justify-content-center align-items-center">
            <section id="services" className="services">
              <div className="container" data-aos="fade-up">

                <div className="section-title">
                  <h2>Thanks for registering, Your profile is under review!</h2>
                  <img src="./under-review.jpg" width="500px" height="400px" />
                </div>

              </div>
            </section>
          </div>
        </div>
      )}
    </div>
      </>
  );
}

export default DashboardLayout;
