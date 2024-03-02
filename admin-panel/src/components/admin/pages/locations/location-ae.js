import React, { useState, useEffect, useRef } from "react";
import { Formik, Form } from 'formik';
import DashboardLayout from "../../DashboardLayout";
import * as Yup from "yup";
import { useParams, useNavigate } from 'react-router-dom';
import TextField from "../../../common/TextField";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import apiService from "../../../../services/api.service";
import CustomMap from "../../../common/CustomMap";

function LocationAE() {
	const ref = useRef({});

    const { user: currentUser } = useSelector((state) => state.auth);
    const [initialValues, setInitialValues] = useState({
        name: "",
        centerLatitude: 51.5149037,
        centerLongitude: -0.1257729,
        kmsFromCenter:5,
    });
    const params = useParams();
    const navigate = useNavigate();

    const [center, setCenter] = useState({
		lat: 0,
		lng: 0,
	});
    const [radius, setRadius] = useState(5);
    const [showMap, setShowMap] = useState(false);

    const [s, setS] = useState({
        center: {},
        markers: [],
        circles: [{ radius: radius * 1000, center: center }]
    })

    const onSubmit = (values) => {
        let body = {
            ...values,
            userId: currentUser.id,
            id: params.id
        }
        if (!params.id) {
            apiService.post('/Locations/', body).then(response => {
                toast.success("Record saved.");
                navigate('/locations');
            }).catch(err => {
                err.response.data.errors.forEach(element => {
                    toast.error(element);
                });
            });
        } else {
            apiService.put( `/Locations/${params.id}`, body).then(response => {
                toast.success("Record saved.");
                navigate('/locations');
            }).catch(err => {
                err.response.data.errors.forEach(element => {
                    toast.error(element);
                });
            });
        }
    };

    const validationSchema = Yup.object({
        name: Yup.string().max(50).required("Required!"),
        centerLatitude: Yup.number().min(-90).max(90),
        centerLongitude: Yup.number().min(-180).max(180),
        kmsFromCenter: Yup.number().min(2).max(120),
    });

    const updateMap =()=>{
        /* eslint-disable */
		let refObj = ref;
        let currentFormValues = refObj.current.values;
        setS({
            center: {
                lat: currentFormValues.centerLatitude,
                lng: currentFormValues.centerLongitude,
            },
            markers: [{
                lat: currentFormValues.centerLatitude,
                lng: currentFormValues.centerLongitude,
            }],
            circles: [{ radius: currentFormValues.kmsFromCenter * 1000, center: {
                lat: currentFormValues.centerLatitude,
                lng: currentFormValues.centerLongitude,
            } }]
        })
        
        setShowMap(true);
    } 

    useEffect(() => {
        if (params.id)
            apiService.get(`/Locations/${params.id}`).then(response => {
                setRadius(response.data.kmsFromCenter);
                setCenter({
                    lat: response.data.centerLatitude,
                    lng: response.data.centerLongitude,
                });
                setInitialValues(response.data);
                setS({
                    center: {
                        lat: response.data.centerLatitude,
                        lng: response.data.centerLongitude,
                    },
                    markers: [{
                        lat: response.data.centerLatitude,
                        lng: response.data.centerLongitude,
                    }],
                    circles: [{ radius: response.data.kmsFromCenter * 1000, center: {
                        lat: response.data.centerLatitude,
                        lng: response.data.centerLongitude,
                    } }]
                })
                setShowMap(true);
            });
    }, [params.id]);

    if (!currentUser) {
        navigate('/');
    }

    return (
        <DashboardLayout title="Location">
            <div className="row">
                <div className="col-lg-8 d-flex align-items-stretch">
                    <Formik
                        enableReinitialize={true}
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                        innerRef={ref}
                    >
                        {(props) => (
                            <Form className="base-form" onChange={updateMap}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <TextField type="text" id="name" name="name" required fieldName="Name" {...props} />
                                    </div>
                                    <div className="col-md-6">
                                        <TextField type="number" id="centerLatitude" name="centerLatitude" required fieldName="Center Latitude"  {...props}/>
                                    </div>
                                    <div className="col-md-6">
                                        <TextField type="number" id="centerLongitude" name="centerLongitude" required fieldName="Center Longitude"  {...props} />
                                    </div>
                                    <div className="col-md-6">
                                        <TextField type="number" id="kmsFromCenter" name="kmsFromCenter" required fieldName="Radius (KMs From Center)"  {...props} />
                                    </div>
                                    
                                </div>

                                <div>
                                    <button type="submit">Save</button>
                                    <button type="button" onClick={() => navigate("/locations")}>Cancel</button>
                                </div>
                            </Form>)}
                    </Formik>
                </div>
                <div className="col-lg-4 d-flex align-items-stretch">
                   {showMap && (
                    <CustomMap
                        zoom={9}
                        libraries={["places"]}
                        loadingElement={<div style={{ height: `450px` }} />}
                        mapContainerStyle={{
                            height: "450px",
                            width: "100%",
                        }}
                        center={s.center}
                        markers={s.markers}
                        circles={s.circles}
                        // center={center}
                        // markers={[center]}
                        // circles={[{ radius: radius * 1000, center: center }]}
                    ></CustomMap>
                   )} 
                </div>
                
            </div>
        </DashboardLayout>
    );
}

export default LocationAE;
