import React, { useEffect, useState } from "react";
import DashboardLayout from "../../DashboardLayout";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { envirnoment } from "../../../../envirnoment";
import { useParams, useNavigate } from 'react-router-dom';
import TextField from "../../../common/TextField";
import authHeader from "../../../../services/auth-header";
import { toast } from 'react-toastify';
import SelectField from "../../../common/SelectField";
import { DatePickerField } from "../../../common/DatePickerField";
import apiService from "../../../../services/api.service";

function DriverProfileAE(user) {
    const params = useParams();
    const navigate = useNavigate();
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [locations, setLocations] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [initialValues, setInitialValues] = useState({
        id: 0,
        userID:"",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        licensingAuthority: "",
        badgeNumber: "",
        badgeExpiry: new Date(),
        dbsDateOfIssue: new Date(),
        dbsDateOfExpiry: new Date(),
        registrationNumber: "",
        make: "",
        model: "",
        colour: "",
        plateNumber: "",
        plateExpiry: new Date(),
        motExpiry: new Date(),
        insuranceNumber: "",
        insuranceExpiry: new Date(),
        
        vehicleTypeID: 0,
        locationID: 0
        // password: "",
        // confirmPassword: "",
    });
    //const [selectedFile, setSelectedFile] = useState(null);
    const [todayDate, setTodayDate] = useState(new Date());

    const onSubmit = (values) => {

        let body = {
            ...values,
            id: params.id
        }
        if (!params.id) {
            apiService.post('/DriverProfiles/', body).then(response => {
                toast.success("Record saved.");
                navigate('/driverprofiles');
            }).catch(err => {
                err.response?.data?.errors?.forEach(element => {
                    toast.error(element);
                });
            });
        } else {
            apiService.put( `/DriverProfiles/${params.id}`, body).then(response => {
                toast.success("Record saved.");
                navigate('/driverprofiles');
            }).catch(err => {
                err.response?.data?.errors?.forEach(element => {
                    toast.error(element);
                });
            });
        }
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().label('First Name').required(),
        lastName: Yup.string().label('Last Name').required(),
        email: Yup.string().label('Email').required(),
        phoneNumber: Yup.string().label('Phone Numer').required(),
        licensingAuthority: Yup.string().label('Licensing Authority').required(),
        badgeNumber: Yup.string().label('Badge Number').required(),
        badgeExpiry: Yup.date().min(todayDate, 'Expiry date should be greater than today date').label('Badge Expiry').required(),
        dbsDateOfIssue: Yup.date().label('DBS Issue Date').required(),
        dbsDateOfExpiry: Yup.date().min(Yup.ref('dbsDateOfIssue'), 'Expiry Date should be after issue date').label('DBS Expiry Date').required(),
        registrationNumber: Yup.string().label('Registration Number').required(),
        make: Yup.string().label('Make').required(),
        model: Yup.string().label('Model').required(),
        colour: Yup.string().label('Color').required(),
        plateNumber: Yup.string().label('Plate Number').required(),
        plateExpiry: Yup.date().min(todayDate, 'Expiry Date should be greater than today').label('Plate Expiry').required(),
        motExpiry: Yup.date().min(todayDate, 'Expiry Date should be greater than today').label('Mot Expiry').required(),
        insuranceNumber: Yup.string().label('Insurance Number').required(),
        insuranceExpiry: Yup.date().min(todayDate, 'Expiry Date should be greater than today').label('Insurance Expiry').required(),
        // vehicleTypeID: 0,
        // locationID: 0
    });

    useEffect(() => {
        if (params.id && params.id > 0){
            setIsEditMode(true);
            apiService.get(`/DriverProfiles/${params.id}`).then(response => {
                setInitialValues(response.data);
            });
        }else{
            setIsEditMode(false);
        }
    }, [params.id]);

    useEffect(() => {
        apiService.get('/VehicleTypes/dropdown').then(response => {
            let dropDonw = [];
            response.data.forEach(element => {
                dropDonw.push({ value: element.value, label: element.name })
            });
            setVehicleTypes(dropDonw);
        });
        apiService.get('/Locations/dropdown').then(response => {
            let dropDonw = [];
            response.data.forEach(element => {
                dropDonw.push({ value: element.value, label: element.name })
            });
            setLocations(dropDonw);
        });

    }, []);

    if (!user) {
        navigate('/');
    }
    return (
        <DashboardLayout title="Driver">
            <div className="row">
                <div className="col-lg-12 d-flex align-items-stretch">
                    <Formik
                        enableReinitialize={true}
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                    >
                        {(props) => (
                            <Form className="base-form">
                                <div className="row">
                                    <div className="col-md-4">
                                        <TextField type="text" id="firstName" name="firstName" required fieldName="First Name" disabled={isEditMode} {...props} />
                                    </div>
                                    <div className="col-md-4">
                                        <TextField type="text" id="lastName" name="lastName" required fieldName="Last Name" disabled={isEditMode} {...props} />
                                    </div>

                                    <div className="col-md-4">
                                        <TextField type="email" id="email" name="email" required fieldName="Email" disabled={isEditMode} {...props} />
                                    </div>
                                    <div className="col-md-4">
                                        <TextField type="text" id="phoneNumber" name="phoneNumber" required fieldName="Phone Number" disabled={isEditMode} {...props} />
                                    </div>
                                    <div className="col-md-4">
                                        <TextField type="text" id="licensingAuthority" name="licensingAuthority" required fieldName="Licensing Authority"  {...props} />
                                    </div>

                                    <div className="col-md-4">
                                        <TextField type="text" id="badgeNumber" name="badgeNumber" required fieldName="Badge Number"  {...props} />
                                    </div>

                                    <div className="col-md-4">
                                        <DatePickerField id="badgeExpiry" name="badgeExpiry" required fieldName="Badge Expiry" {...props} /> 
                                         {/* <TextField type="date" id="badgeExpiry" name="badgeExpiry" required fieldName="Badge Expiry"  {...props} /> */}
                                    </div>
                                    <div className="col-md-4">
                                    <DatePickerField id="dbsDateOfIssue" name="dbsDateOfIssue" required fieldName="DBS Issue Date"  {...props}  /> 

                                        {/* <TextField type="date" id="dbsDateOfIssue" name="dbsDateOfIssue" required fieldName="DBS Issue Date"  {...props} /> */}
                                    </div>
                                    
                                    <div className="col-md-4">
                                    <DatePickerField  id="dbsDateOfExpiry" name="dbsDateOfExpiry" required fieldName="DBS Expiry Date"  {...props} /> 

                                        {/* <TextField type="date" id="dbsDateOfExpiry" name="dbsDateOfExpiry" required fieldName="DBS Expiry Date"  {...props} /> */}
                                    </div>
                                    <div className="col-md-4">
                                        <TextField type="text" id="registrationNumber" name="registrationNumber" required fieldName="Registration Number"  {...props} />
                                    </div>
                                    <div className="col-md-4">
                                        <TextField type="text" id="make" name="make" required fieldName="Make"  {...props} />
                                    </div>

                                    <div className="col-md-4">
                                        <TextField type="text" id="model" name="model" required fieldName="Model"  {...props} />
                                    </div>

                                    <div className="col-md-4">
                                        <TextField type="text" id="colour" name="colour" required fieldName="Colour"  {...props} />
                                    </div>

                                    <div className="col-md-4">
                                        <TextField type="text" id="plateNumber" name="plateNumber" required fieldName="Plate Number"  {...props} />
                                    </div>

                                    <div className="col-md-4">
                                    <DatePickerField id="plateExpiry" name="plateExpiry" required fieldName="Plate Expiry"  {...props}/> 

                                        {/* <TextField type="date" id="plateExpiry" name="plateExpiry" required fieldName="Plate Expiry"  {...props} /> */}
                                    </div>
                                    <div className="col-md-4">
                                    <DatePickerField id="motExpiry" name="motExpiry" required fieldName="MOT Expiry"  {...props}/> 

                                        {/* <TextField type="date" id="motExpiry" name="motExpiry" required fieldName="MOT Expiry"  {...props} /> */}
                                    </div>
                                    <div className="col-md-4">
                                        <TextField type="text" id="insuranceNumber" name="insuranceNumber" required fieldName="Insurance Number"  {...props} />
                                    </div>

                                    <div className="col-md-4">
                                    <DatePickerField id="insuranceExpiry" name="insuranceExpiry" required fieldName="Insurance Expiry"  {...props}/> 

                                        {/* <TextField type="date" id="insuranceExpiry" name="insuranceExpiry" required fieldName="Insurance Expiry"  {...props} /> */}
                                    </div>
                                    <div className="col-md-4 form-group">
                                        <Field id="vehicleTypeID" name="vehicleTypeID" fieldName="Vehicle Type" options={vehicleTypes} isMulti={false} component={SelectField} />
                                    </div>
                                    <div className="col-md-4 form-group">
                                        <Field id="locationID" name="locationID" fieldName="Location" options={locations} isMulti={false} component={SelectField} />
                                    </div>
                                    {/* <div className="col-md-4">
                                        <TextField type="password" id="password" name="password" required fieldName="Password"  {...props} />
                                    </div>

                                    <div className="col-md-4">
                                        <TextField type="password" id="confirmPassword" name="confirmPassword" required fieldName="Confirm Password"  {...props} />
                                    </div> */}

                                    {/* <div className="col-md-4">
                                        <input type="file" name="file" accept="image/png, image/gif, image/jpeg, image/jpg" onChange={e => setSelectedFile(e.target.files[0])} />
                                    </div> */}

                                </div>

                                <div>
                                    <button type="submit">Save</button>
                                    <button type="button" onClick={() => navigate("/driverprofiles")}>Cancel</button>
                                </div>
                            </Form>)}
                    </Formik>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default DriverProfileAE;
