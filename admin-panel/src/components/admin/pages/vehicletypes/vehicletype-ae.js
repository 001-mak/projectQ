import React, { useEffect, useState } from "react";
import DashboardLayout from "../../DashboardLayout";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from 'react-router-dom';
import TextField from "../../../common/TextField";
import { toast } from 'react-toastify';
import apiService from "../../../../services/api.service";

function VehicleTypeAE(user) {
    const params = useParams();
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState({
        name: "",
        description: "",
        bagsLimit:1,
        sortOrder:0,
        seatingCapacity:1
    });
    const [selectedFile, setSelectedFile] = useState(null);

    const onSubmit = (values) => {

       
        if (!params.id) {
            let formData = new FormData();
        
            formData.append("name", values.name);
            formData.append("description", values.description);
            formData.append("sortOrder", values.sortOrder);
            formData.append("bagsLimit", values.bagsLimit);
            formData.append("seatingCapacity", values.seatingCapacity);
            formData.append("id", params?.id ?? 0);
            formData.append("formFile", selectedFile);
            formData.append("fileName", selectedFile.name);
    
            apiService.post('/VehicleTypes/', formData).then(response => {
                toast.success("Record saved.");
                navigate('/vehicletypes');
            }).catch(err => {
                err.response?.data?.errors?.forEach(element => {
                    toast.error(element);
                });
            });
        } else {
            let b = {...values,id:params.id }
            apiService.put( `/VehicleTypes/${params.id}`, b).then(response => {
                toast.success("Record saved.");
                navigate('/vehicletypes');
            }).catch(err => {
                err.response?.data?.errors?.forEach(element => {
                    toast.error(element);
                });
            });
        }
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Required!"),
    });

    useEffect(() => {
        if (params.id)
            apiService.get(`/VehicleTypes/${params.id}`).then(response => {
                setInitialValues(response.data);
            });
    }, [params.id]);

    if (!user) {
        navigate('/');
    }
    return (
        <DashboardLayout title="Vehicle Type">
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
                                        <TextField type="text" id="name" name="name" required fieldName="Name"  {...props} />
                                    </div>
                                    <div className="col-md-6">
                                        <TextField type="text" id="description" name="description" required fieldName="Description"  {...props} />
                                    </div>
                                    <div className="col-md-6">
                                        <TextField type="text" id="seatingCapacity" name="seatingCapacity" required fieldName="Seating Capacity"  {...props} />
                                    </div>
                                    <div className="col-md-6">
                                        <TextField type="text" id="bagsLimit" name="bagsLimit" required fieldName="Bags Limit"  {...props} />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="file" name="file" accept="image/png, image/gif, image/jpeg, image/jpg" onChange={e => setSelectedFile(e.target.files[0])} />
                                    </div>
                                    <div className="col-md-6">
                                        <TextField type="text" id="sortOrder" name="sortOrder" required fieldName="Sort Order"  {...props} />
                                    </div>

                                </div>

                                <div>
                                    <button type="submit">Save</button>
                                    <button type="button" onClick={() => navigate("/vehicletypes")}>Cancel</button>
                                </div>
                            </Form>)}
                    </Formik>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default VehicleTypeAE;
