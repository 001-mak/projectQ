import React, { useEffect, useState } from "react";
import DashboardLayout from "../../DashboardLayout";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import TextField from "../../../common/TextField";
import SelectField from "../../../common/SelectField";
import { toast } from "react-toastify";
import apiService from "../../../../services/api.service";


const sectors = [
    { value: 1, label: 'FMCG' },
    { value: 2, label: 'Beverages' },
    { value: 3, label: 'Textile' },
    { value: 4, label: 'Cement' },
    { value: 5, label: 'Pharma' },
    { value: 6, label: 'Packaging' },
    { value: 7, label: 'Chemicals' },
    { value: 8, label: 'Tobacco' },
    { value: 9, label: 'Plastic' },
    { value: 10, label: 'Sugar' },
    { value: 11, label: 'Feeds' },
    { value: 12, label: 'Paint' },
    { value: 13, label: 'Agriculture' },
    { value: 14, label: 'Wood' },
    { value: 15, label: 'Flour Industry' },
    { value: 16, label: 'Telecommunication' },
    { value: 17, label: 'Electronics' },
    { value: 18, label: 'Tiles Industry' },
    { value: 19, label: 'Tyre Industry' },
    { value: 20, label: 'Dairy Industry' },
    { value: 21, label: 'Logistics' },
    { value: 22, label: 'Oil & Gas' },
    { value: 23, label: 'Paper Industry' },
    { value: 24, label: 'Steel Industry' },
    { value: 25, label: 'Glass industry' },
    { value: 26, label: 'Automobile Industry' },
    { value: 27, label: 'Power Sector' },
    { value: 28, label: 'Defence Industry' },
    { value: 29, label: 'Fertilizer' },
    { value: 30, label: 'Detergent' },
    { value: 31, label: 'Personal Care' },
    { value: 32, label: 'leather Industry' },
    { value: 33, label: 'Poultry' },
    { value: 34, label: 'Other' },
  ];

function UserAE() {
    const { user: currentUser } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [brands, setBrands] = useState([]);
    const [successMessage, setSuccessMessage] = useState(null);
    const [initialValues, setInitialValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        companyName: "",
        brandIds: [],
        partnerIds: [],
        sectorEnum: 0
    });


    const validationSchema = Yup.object({
        firstName: Yup.string().max(50).required("First name is required!"),
        lastName: Yup.string().max(50).required("Last name is required!"),
        email: Yup.string().max(250).email("Invalid email format").required("Email is required!"),
        phoneNumber: Yup.string().matches('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$', "Phone number is invalid.").required("Phone number is required!"),
        companyName: Yup.string().max(100).required("Company Name is required !"),
    });

    const onSubmit = (values) => {
        let body = {
            ...values,
            brandIds: values.brandIds?.map(x => x.value) ?? [],
            partnerIds: values.partnerIds?.map(x => x.value) ?? [],
            sectorEnum: values.sectorEnum?.value ?? 0
        }
        apiService.put( `/Identity/${currentUser.id}`, body).then(response => {
            toast.success("Profile updated successfully");
        })
    };

    useEffect(() => {
        if (currentUser?.id)
            apiService.get('/brands').then(response => {
                let dropDonw = [];
                response.data.forEach(element => {
                    dropDonw.push({ value: element.id, label: element.name })
                });
                setBrands(dropDonw);
                apiService.get(`/Identity/${currentUser.id}`).then(response => {
                    if (response.data.brandIds) {
                        let brandList = [];
                        response.data.brandIds.forEach(x => {
                            brandList.push(dropDonw.find(y => y.value == x));
                        });
                        response.data.brandIds = brandList;
                    }
                    if (response.data.partnerIds) {
                        let partnerList = [];
                        response.data.partnerIds.forEach(x => {
                            partnerList.push(dropDonw.find(y => y.value == x));
                        });
                        response.data.partnerIds = partnerList;
                    }
                    if (response.data.sector) {
                        let sector = sectors.find(x=> x.value == response.data.sector);
                        response.data.sector = sector;
                    }
                    setInitialValues(response.data);
                });
            });

    }, [currentUser?.id]);


    if (!currentUser) {
        navigate('/');
    }
    return (
        <DashboardLayout title="User">
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
                                        <TextField type="text" id="firstName" name="firstName" fieldName="First Name" disabled {...props} />
                                    </div>
                                    <div className="col-md-6">
                                        <TextField type="text" id="lastName" name="lastName" fieldName="Last Name" disabled {...props} />
                                    </div>

                                    {/* <div className="col-md-12">
                                        <div><label>Register As</label></div>
                                        <label>
                                            <Field type="radio" name="role" value="1"
                                                onChange={(e) => {
                                                    props.handleChange(e); props.setFieldValue("sector", null); props.setFieldValue("brandIds", []);
                                                    props.setFieldValue("partnerIds", []);
                                                }} />
                                            Buyer
                                        </label>{' '}
                                        <label>
                                            <Field type="radio" name="role" value="2"
                                                onChange={(e) => {
                                                    props.handleChange(e); props.setFieldValue("sector", null); props.setFieldValue("brandIds", []);
                                                    props.setFieldValue("partnerIds", []);
                                                }} />
                                            Supplier
                                        </label>
                                    </div> */}

                                    <div className="col-md-6">
                                        <TextField type="email" id="email" name="email" fieldName="Email" disabled {...props} />
                                    </div>
                                    <div className="col-md-6">
                                        <TextField type="text" id="phoneNumber" name="phoneNumber" fieldName="Phone Number" required  {...props} />
                                    </div>

                                    {/* <div className="col-md-6">
                                        <TextField type="password" id="password" name="password" fieldName="Password"  {...props} />
                                    </div>

                                    <div className="col-md-6">
                                        <TextField type="password" id="confirmPassword" name="confirmPassword" fieldName="Confirm Password"  {...props} />
                                    </div> */}

                                    <div className="col-md-6">
                                        <TextField type="text" id="companyName" name="companyName" fieldName="Company Name" required {...props} />
                                    </div>

                                    {props.values.role == 1 && (
                                        <div className="col-md-6 form-group">
                                            <Field id="sectorEnum" name="sectorEnum" fieldName="Sector" options={sectors} component={SelectField} />
                                        </div>
                                    )}
                                    {props.values.role == 2 && (
                                        <>
                                            <div className="col-md-6"></div>
                                            <div className="col-md-6 form-group">
                                                <Field id="brandIds" name="brandIds" fieldName="Brands" options={brands} isMulti={true} component={SelectField}
                                                    onChangeExtra={(e) => {
                                                        const filteredArray = e.filter(y => props.values.partnerIds.findIndex(x => x.value == y.value) != -1);

                                                        props.setFieldValue("partnerIds", [...filteredArray], false);
                                                    }} />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <Field id="partnerIds" name="partnerIds" fieldName="Authorized Partner" options={props.values.brandIds} isMulti={true} component={SelectField} />
                                            </div>
                                        </>
                                    )}

                                </div>
                                <div className="success">
                                    {successMessage && (<> {successMessage} </>)}
                                </div>
                                <button type="submit">Submit</button>
                            </Form>)}
                    </Formik>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default UserAE;
