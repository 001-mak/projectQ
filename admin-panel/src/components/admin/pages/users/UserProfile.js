import React, { useState } from "react";
import CityCountryDropDown from "../../../common/CityCountryDropDown";
import TextField from "../../../common/TextField";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Toast } from "react-bootstrap";
import axios from "axios";
import UploadFile from "../../../common/UploadFile";
import { useSelector } from "react-redux";
import authHeader from "../../../../services/auth-header";

function UserProfile(user) {
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const {user: currentUser} = useSelector(state => state.auth)


  const [loading, setLoading] = useState(false);
  const [toastShow, setToastShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  

  const initialValues = {
    tagLine: "",
    about: "",
  };

  const validationSchema = Yup.object({
    tagLine: Yup.string().max(150),
    about: Yup.string().max(50),
  });

  const onSubmit = async (values) => {
    let body = {
      ...values,
      country,
      city,
      userId: currentUser.user.id
    };

    console.log(body)
    await axios
      .post("http://localhost:5000/api/user/create-profile", body,{
        headers: authHeader()
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div>

      <div className="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
      <div className="upload-profile-picture">
      <UploadFile user = {user}/>
      </div>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form className="base-form">
              <CityCountryDropDown setCountry={setCountry} setCity={setCity} />

              <div className="row">
                <div className="col-md-6">
                  <TextField
                    type="text"
                    id="tagLine"
                    name="tagLine"
                    fieldName="Tagline"
                    {...props}
                  />
                </div>
                <div className="col-md-6">
                  <TextField
                    type="text"
                    id="about"
                    name="about"
                    fieldName="About"
                    {...props}
                  />
                </div>
              </div>
              <div className="validate">
                {errorMessage && <> {errorMessage} </>}
              </div>
              <button type="submit">Create</button>
              
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default UserProfile;
