import React, { useRef } from "react";
import DashboardLayout from "../../DashboardLayout";
import PaginatedTable from "../../../common/PaginatedTable";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import SelectField from "../../../common/SelectField";
import { ExpiringInDDL } from "../../../../common/Constants";

function DriverProfileLV(user) {
    const navigate = useNavigate();
    const childRef = useRef();

    const onSubmit = (values) => {
        console.log(values);
        childRef.current.searchWithFilter(values);
    };
    const onClearAndClose = (props) => {
        props.resetForm();
        childRef.current.searchWithFilter(null);
    };
    const onClose = () => {
        childRef.current.closeSearchBox();
    };

    const extraColumns = [
        {
            selector: row => row.firstName,
            name: "First Name",
        },
        {
            selector: row => row.lastName,
            name: "Last Name",
        },
        {
            selector: row => row.email,
            name: "Email",
        },
        {
            selector: row => row.phoneNumber,
            name: "Phone Number",
        },
        {
            selector: row => row.badgeExpiry,
            name: "Badge Expiry",
        },
        {
            selector: row => row.dbsDateOfIssue,
            name: "DBS Issue",
        },
        {
            selector: row => row.dbsDateOfExpiry,
            name: "DBS Expiry",
        },
        {
            selector: row => row.licensingAuthority,
            name: "Licensing Authority",
        },
        {
            selector: row => row.motExpiry,
            name: "Mot Expiry",
        },
        {
            selector: row => row.insuranceNumber,
            name: "Insurance Number",
        },
        {
            selector: row => row.insuranceExpiry,
            name: "Insurance Expiry",
        },
    ];

    if (!user) {
        navigate('/');
    }
    return (
        <DashboardLayout title="Driver Profiles">
            <PaginatedTable
                ref={childRef}
                title="Driver Profiles"
                extraColumns={extraColumns}
                pagedAPIEndpoint="/driverprofiles/paged"
                deleteEndpoint="/driverprofiles"
                showAdd={true}
                showDelete={false}
                showEdit={true}
                addEditComponentRoute="/driverprofile-ae"
                searchForm={<Formik
                    enableReinitialize={true}
                    initialValues={{
                        badgeExpiryIn: -1,
                        dbsDateOfExpiryIn: -1,
                        motExpiryIn: -1,
                        insuranceExpiryIn: -1
                    }}
                    onSubmit={onSubmit}
                >
                    {(props) => (
                        <Form className="base-form">
                            <div className="row">
                                <div className="col-md-4 form-group">
                                    <Field id="badgeExpiryIn" name="badgeExpiryIn" fieldName="Badge Expiry In" options={ExpiringInDDL} isMulti={false} component={SelectField} />
                                </div>
                                <div className="col-md-4 form-group">
                                    <Field id="dbsDateOfExpiryIn" name="dbsDateOfExpiryIn" fieldName="DBS Expiry In" options={ExpiringInDDL} isMulti={false} component={SelectField} />
                                </div>
                                <div className="col-md-4 form-group">
                                    <Field id="motExpiryIn" name="motExpiryIn" fieldName="Mot Expiry In" options={ExpiringInDDL} isMulti={false} component={SelectField} />
                                </div>
                                <div className="col-md-4 form-group">
                                    <Field id="insuranceExpiryIn" name="insuranceExpiryIn" fieldName="Insurance Expiry In" options={ExpiringInDDL} isMulti={false} component={SelectField} />
                                </div>
                            </div>

                            <div>
                                <button type="submit">Search</button>
                                <button type="button success" onClick={()=>{onClearAndClose(props);props.resetForm()}}>Reset</button>
                                <button type="button" onClick={onClose}>Cancel</button>

                            </div>
                        </Form>)}
                </Formik>} />
        </DashboardLayout>
    );
}

export default DriverProfileLV;