import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from 'formik';
import DashboardLayout from "../../DashboardLayout";
import * as Yup from "yup";
import axios from "axios";
import { envirnoment } from "../../../../envirnoment";
import { useParams, useNavigate } from 'react-router-dom';
import TextField from "../../../common/TextField";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import SelectField from "../../../common/SelectField";
import apiService from "../../../../services/api.service";

function FareSettingAE() {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [initialValues, setInitialValues] = useState({
        id: 0,
        locationID: 0,
        vehicleTypeID: 0,
        firstLimit: 0,
        firstLimitPrice: 0,
        secondLimit: 0,
        secondLimitPrice: 0,
        sort: 0
    });
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [locations, setLocations] = useState([]);
    const params = useParams();
    const navigate = useNavigate();


    const onSubmit = (values) => {
        let body = {
            ...values,
            vehicleTypeID: values.vehicleTypeID,
            locationID: values.locationID,
            id: params.id,
            rateTimeSettings: []
        }
        if (!params.id) {
            apiService.post('/FareSettings/', body).then(response => {
                toast.success("Record saved.");
                navigate('/faresettings');
            }).catch(err => {
                err.response.data.errors.forEach(element => {
                    toast.error(element);
                });
            });
        } else {
            apiService.put( `/FareSettings/${params.id}`, body).then(response => {
                toast.success("Record saved.");
                navigate('/faresettings');
            }).catch(err => {
                err.response.data.errors.forEach(element => {
                    toast.error(element);
                });
            });
        }
    };

    const validationSchema = Yup.object({
        firstLimit: Yup.number().min(0).max(20),
        firstLimitPrice: Yup.number().min(0).max(500),
        secondLimit: Yup.number().min(0).max(500),
        secondLimitPrice: Yup.number().min(0).max(500),
        sort: Yup.number().min(0).max(500),
    });

    useEffect(() => {
        const fetchDropdownData = async () => {
            try {
                const [vehicleTypesResponse, locationsResponse] = await Promise.all([
                    apiService.get('/VehicleTypes/dropdown'),
                    apiService.get('/Locations/dropdown')
                ]);

                let vehicleTypesDropdown = vehicleTypesResponse.data.map((element) => ({
                    value: element.value,
                    label: element.name
                }));

                let locationsDropdown = locationsResponse.data.map((element) => ({
                    value: element.value,
                    label: element.name
                }));

                setVehicleTypes(vehicleTypesDropdown);
                setLocations(locationsDropdown);
            } catch (error) {
                console.error("Error fetching dropdown data:", error);
            }
        };

        fetchDropdownData();
    }, []);

    useEffect(() => {
        if (params.id && vehicleTypes.length > 0 && locations.length > 0) {
            apiService.get(`/FareSettings/${params.id}`).then(response => {
                
                setInitialValues(response.data);
            });
        }
    }, [params.id, vehicleTypes, locations]);

    if (!currentUser) {
        navigate('/');
    }

    return (
        <DashboardLayout title="Fare Setting">
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
                                   
                                    <div className="col-md-4 form-group">
                                        <Field id="vehicleTypeID" name="vehicleTypeID" fieldName="Vehicle Type" options={vehicleTypes} isMulti={false} component={SelectField} />
                                    </div>
                                    <div className="col-md-4 form-group">
                                        <Field id="locationID" name="locationID" fieldName="Location" options={locations} isMulti={false} component={SelectField} />
                                    </div>
                                    <div className="col-md-4">
                                        <TextField type="number" id="firstLimit" name="firstLimit" required fieldName="1st limit (mil)" {...props} />
                                    </div>
                                    <div className="col-md-4">
                                        <TextField type="number" id="firstLimitPrice" name="firstLimitPrice" required fieldName="1st limit price" {...props} />
                                    </div>
                                    <div className="col-md-4">
                                        <TextField type="number" id="secondLimit" name="secondLimit" required fieldName="2nd limit (mil)" {...props} />
                                    </div>
                                    <div className="col-md-4">
                                        <TextField type="number" id="secondLimitPrice" name="secondLimitPrice" required fieldName="2nd limit Per mil price" {...props} />
                                    </div>
                                    <div className="col-md-4">
                                        <TextField type="number" id="sort" name="sort" required fieldName="Priority" {...props} />
                                    </div>
                                </div>

                                <div>
                                    <button type="submit">Save</button>
                                    <button type="button" onClick={() => navigate("/faresettings")}>Cancel</button>
                                </div>
                            </Form>)}
                    </Formik>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default FareSettingAE;
