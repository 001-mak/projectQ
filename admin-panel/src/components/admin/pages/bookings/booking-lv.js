import React, { useRef } from "react";
import DashboardLayout from "../../DashboardLayout";
import PaginatedTable from "../../../common/PaginatedTable";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { DatePickerField } from "../../../common/DatePickerField";
import SelectField from "../../../common/SelectField";
import { BookingStatusDDL, PaymentStatusDDL } from "../../../../common/Constants";

function BookingLV(user) {
    const navigate = useNavigate();
    const childRef = useRef();

    const onSubmit = (values) => {
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
            selector: row => row.statusName,
            name: "Status",
        },
        {
            selector: row => row.paymentStatusName,
            name: "Payment Status",
        },
        {
            selector: row => row.paymentMethodName,
            name: "Payment Method",
        },
        {
            selector: row => row.pickupAddress,
            name: "Pickup",
        },
        {
            selector: row => row.dropOffAddress,
            name: "DropOff",
        },
        {
            selector: row => row.bookingDateTime,
            name: "Booking On",
        },
        {
            selector: row => row.customerFirstName,
            name: "Customer First Name",
        },
        {
            selector: row => row.customerLastName,
            name: "Customer Last Name",
        },
        {
            selector: row => row.customerEmail,
            name: "Email",
        },
        {
            selector: row => row.phoneNumber,
            name: "Phone No.",
        },
        {
            selector: row => row.driverPhoneNumber,
            name: "Driver Phone No.",
        },
        {
            selector: row => row.driverPhoneNumber,
            name: "Driver Phone No.",
        }
    ];

    if (!user) {
        navigate('/');
    }
    return (
        <DashboardLayout title="Bookings">
            <PaginatedTable
                ref={childRef}
                title="Bookings"
                extraColumns={extraColumns}
                pagedAPIEndpoint="/bookings/paged"
                deleteEndpoint="/bookings"
                showAdd={false}
                showDelete={false}
                showEdit={false}
                addEditComponentRoute="/booking-ae"
                showView={true}
                viewComponentRoute="/booking-view"
                searchForm={<Formik
                    enableReinitialize={true}
                    initialValues={{
                        startDate: null,
                        endDate: null,
                        bookingStatus: -1,
                        paymentStatus: -1
                    }}
                    onSubmit={onSubmit}
                >
                    {(props) => (
                        <Form className="base-form">
                            <div className="row">
                                <div className="col-md-4">
                                    <DatePickerField id="startDate" name="startDate" fieldName="Start Date" {...props} />
                                </div>
                                <div className="col-md-4">
                                    <DatePickerField id="endDate" name="endDate" fieldName="End Date" {...props} />
                                </div>
                                <div className="col-md-4 form-group">
                                    <Field id="bookingStatus" name="bookingStatus" fieldName="Booking Status" options={BookingStatusDDL} isMulti={false} component={SelectField} />
                                </div>
                                <div className="col-md-4 form-group">
                                    <Field id="paymentStatus" name="paymentStatus" fieldName="Payment Status" options={PaymentStatusDDL} isMulti={false} component={SelectField} />
                                </div>
                            </div>

                            <div>
                                <button type="submit">Search</button>
                                <button type="button success" onClick={()=>{onClearAndClose(props);props.resetForm()}}>Reset</button>
                                <button type="button" onClick={onClose}>Cancel</button>

                            </div>
                        </Form>)}
                </Formik>}
            >
            </PaginatedTable>
        </DashboardLayout>
    );
}

export default BookingLV;