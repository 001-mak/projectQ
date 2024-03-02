import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";

import Navbar from "./components/Navbar";

import "./App.css";
import "react-datepicker/dist/react-datepicker.css";

import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

import Register from "./components/Register";
import UserAE from "./components/admin/pages/users/user-ae";
import UsersLV from "./components/admin/pages/users/users-lv";
import { logout } from "./actions/auth";

import { history } from "./helpers/history";
import EventBus from "./common/EventBus";
import ScrollToTop from "./helpers/ScrollToTop";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VehicleTypeAE from "./components/admin/pages/vehicletypes/vehicletype-ae";
import VehicleTypeLV from "./components/admin/pages/vehicletypes/vehicletype-lv";
import DriverProfileAE from "./components/admin/pages/driverprofiles/driverprofile-ae";
import DriverProfileLV from "./components/admin/pages/driverprofiles/driverprofile-lv";
import LocationAE from "./components/admin/pages/locations/location-ae";
import LocationLV from "./components/admin/pages/locations/location-lv";
import FareSettingAE from "./components/admin/pages/faresettings/faresetting-ae";
import FareSettingLV from "./components/admin/pages/faresettings/faresetting-lv";
import BookingLV from "./components/admin/pages/bookings/booking-lv";
import SystemConfigAE from "./components/admin/pages/systemconfigs/systemconfig-ae";
import BookingView from "./components/admin/pages/bookings/booking-view";
import VerifyEmail from "./components/admin/pages/verifyemail/VerifyEmail";

function App() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    history.listen((location) => {

    });
  }, [dispatch]);

  useEffect(() => {
    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  return (
    <>
      <BrowserRouter history={history}>
        <div>
          <div>
            <Navbar className="navbar-div" />
            <ToastContainer />
          </div>
          <div>
            <ScrollToTop>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                <Route element={<ProtectedRoute user={currentUser}/>}>
                  <Route path="/verify-email" element={<VerifyEmail />} />
                  <Route path="/systemconfigs" element={<SystemConfigAE />} />
                  <Route path="/bookings" element={<BookingLV />} />
                  <Route path="/booking-view/:id" element={<BookingView />} />
                  <Route
                    path="/vehicletype-ae/:id"
                    element={<VehicleTypeAE />}
                  />
                  <Route path="/vehicletype-ae" element={<VehicleTypeAE />} />
                  <Route path="/vehicletypes" element={<VehicleTypeLV />} />
                  <Route path="/location-ae/:id" element={<LocationAE />} />
                  <Route path="/location-ae" element={<LocationAE />} />
                  <Route path="/locations" element={<LocationLV />} />

                  <Route
                    path="/faresetting-ae/:id"
                    element={<FareSettingAE />}
                  />
                  <Route path="/faresetting-ae" element={<FareSettingAE />} />
                  <Route path="/faresettings" element={<FareSettingLV />} />
                  <Route
                    path="/driverprofile-ae/:id"
                    element={<DriverProfileAE />}
                  />
                  <Route
                    path="/driverprofile-ae"
                    element={<DriverProfileAE />}
                  />
                  <Route path="/driverprofiles" element={<DriverProfileLV />} />
                  <Route path="/my-profile" element={<UserAE />} />
                  <Route path="/user-lv" element={<UsersLV />} />
                </Route>
              </Routes>
            </ScrollToTop>
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
