import React, { useState, useEffect } from "react";
import { Formik, Form } from 'formik';
import DashboardLayout from "../../DashboardLayout";
import * as Yup from "yup";
import axios from "axios";
import { envirnoment } from "../../../../envirnoment";
import { useParams, useNavigate } from 'react-router-dom';
import TextField from "../../../common/TextField";
import { useSelector } from "react-redux";
import authHeader from "../../../../services/auth-header";
import { toast } from 'react-toastify';
import apiService from "../../../../services/api.service";

function SystemConfigAE() {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [initialValues, setInitialValues] = useState({
        name: "",
        centerLatitude: 0,
        centerLongitude: 0,
        kmsFromCenter:5,
    });
    let params = useParams();
    params.id = 1;
    const navigate = useNavigate();


    const onSubmit = (values) => {
        let body = {
            ...values,
            id: 1
        }
        if (!params.id) {
            apiService.post('/SystemConfigs/', body).then(response => {
                toast.success("Record saved.");
                navigate('/bookings');
            }).catch(err => {
                err.response.data.errors.forEach(element => {
                    toast.error(element);
                });
            });
        } else {
            apiService.put( `/SystemConfigs/${params.id}`, body).then(response => {
                toast.success("Record saved.");
                navigate('/bookings');
            }).catch(err => {
                err.response.data.errors.forEach(element => {
                    toast.error(element);
                });
            });
        }
    };

    const validationSchema = Yup.object({
        vatPercentage: Yup.number().min(0).max(99),
        driverPercentage: Yup.number().min(0).max(99),
    });

    useEffect(() => {
        if (params.id)
            apiService.get(`/SystemConfigs/${params.id}`).then(response => {
                setInitialValues(response.data);
            });
    }, [params.id]);

    if (!currentUser) {
        navigate('/');
    }

    return (
        <DashboardLayout title="SystemConfig">
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
                                    <div className="col-md-6">
                                        <TextField type="number" id="vatPercentage" name="vatPercentage" required fieldName="VAT Percentage"  {...props} />
                                    </div>
                                    <div className="col-md-6">
                                        <TextField type="number" id="driverPercentage" name="driverPercentage" required fieldName="Driver Percentage"  {...props} />
                                    </div>
                                    <div className="col-md-6">
                                        <TextField type="number" id="babySeatCharges" name="babySeatCharges" required fieldName="Baby Seat Charges"  {...props} />
                                    </div>
                                    <div className="col-md-6">
                                        <TextField type="number" id="greetingCharges" name="greetingCharges" required fieldName="Greeting Charges"  {...props} />
                                    </div>
                                    
                                </div>

                                <div>
                                    <button type="submit">Save</button>
                                    <button type="button" onClick={() => navigate("/bookings")}>Cancel</button>
                                </div>
                            </Form>)}
                    </Formik>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default SystemConfigAE;
