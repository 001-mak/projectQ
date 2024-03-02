import React, { useState, useEffect } from "react";
import DashboardLayout from "../../DashboardLayout";
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import moment from 'moment';
import apiService from "../../../../services/api.service";
import { BookingStatus, PaymentMethodEnum, PaymentStatus } from "../../../../common/Constants";
import Select from 'react-select';

const options = [
    { value: 0, label: 'No Refund' },
    { value: 10, label: '10%' },
    { value: 20, label: '20%' },
    { value: 50, label: '50%' },
    { value: 75, label: '75%' },
    { value: 100, label: '100%' },
]
function BookingView() {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [booking, setBooking] = useState({});
    const params = useParams();
    const navigate = useNavigate();


    // cancel 
    const [showCancelBookingModal, setShowCancelBookingModal] = useState(false);
    const handleCancelBookingModalClose = () => {
        setShowCancelBookingModal(false);
    };
    const handleCancelBookingModalShow = () => {
        setShowCancelBookingModal(true);
    }

    const handleCancelBooking = () => {
        apiService.put('/bookings/cancel/' + params.id,).then(response => {
            handleCancelBookingModalClose()
            toast.success("Booking Canceled!");
            let bookingA = { ...response.data }
            setBooking(bookingA);
        }).catch(err => {
            err.response?.data?.errors?.forEach(element => {
                toast.error(element);
            });
        });
    }
    // cancel end

    // refund 
    const [showRefundBookingModal, setShowRefundBookingModal] = useState(false);
    const handleRefundBookingModalClose = () => {
        setShowRefundBookingModal(false);
    };
    const handleRefundBookingModalShow = () => {
        setShowRefundBookingModal(true);
    }

    const handleRefundBooking = () => {
        apiService.put('/parts/inquiries/uploadfile/' + params.id,).then(response => {
            handleRefundBookingModalClose()
            toast.success("Booking canceled!");
            let bookingA = { ...booking, fileName: response.data.fileName, filePath: response.data.filePath }
            setBooking(bookingA);
        }).catch(err => {
            err.response?.data?.errors?.forEach(element => {
                toast.error(element);
            });
        });
    }
    // refund end

    useEffect(() => {
        if (params.id)
            apiService.get(`/bookings/${params.id}`).then(response => {
                setBooking(response.data);
            });
    }, [params.id]);

    if (!currentUser) {
        navigate('/');
    }

    return (
        <DashboardLayout title="Booking">

            <div className="part-inquiry-section">

                <div className="row">

                    {
                        currentUser.role == 1 && booking?.status <= BookingStatus.Confirmed && (
                            <div className="col-md-12">
                                <button className="btn btn-sm btn-primary m-1" type="button" onClick={handleCancelBookingModalShow}>Cancel Booking</button>
                            </div>
                        )
                    }

                    {
                        currentUser.role == 1 && booking?.paymentStatus == PaymentStatus.RefundPending
                        && booking?.paymentMethod == PaymentMethodEnum.Card && (
                            <div className="col-md-12">
                                <button className="btn btn-sm btn-primary m-1" type="button" onClick={handleRefundBookingModalShow}>Refund Customer</button>
                            </div>
                        )
                    }
                    <div className="col-md-12">
                        <h4 className="part-inquiry-section-heading">Customer Details</h4>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="model">First Name</label>
                        <p>{booking?.customerFirstName}</p>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="partNumber">Last Name</label>
                        <p>{booking?.customerLastName}</p>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="availableQty">Email</label>
                        <p>{booking?.customerEmail}</p>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="availableQty">Phone</label>
                        <p>{booking?.customerPhoneNumber}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <h4 className="part-inquiry-section-heading">Booking Details</h4>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="pickup">Status</label>
                        <p>{booking?.statusName}</p>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="pickup">Payment Method</label>
                        <p>{booking?.paymentMethodName}</p>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="pickup">Payment Status</label>
                        <p>{booking?.paymentStatusName}</p>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="pickup">Pickup</label>
                        <p>{booking?.pickupAddress}</p>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="dropoff">Drop Off</label>
                        <p>{booking?.dropOffAddress}</p>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="date">Pickup Date</label>
                        <p>{moment(booking?.bookingDateTime).format('MMMM Do YYYY, h:mm a')}</p>
                    </div>
                    {booking?.isReturnBooking && (<div className="col-md-4">
                        <label htmlFor="date">Return Pickup Date</label>
                        <p>{moment(booking?.returnBookingDateTime).format('MMMM Do YYYY, h:mm a')}</p>
                    </div>)}
                    <div className="col-md-4">
                        <label htmlFor="date">Vehicle Type</label>
                        <p>{booking?.vehicleTypeName}</p>
                    </div>
                    <div className="col-md-4">
                        <label>Pickup Location (system)</label>
                        <p>{booking?.pickupLocationName}</p>
                    </div>
                    <div className="col-md-4">
                        <label>Dropoff Location (system)</label>
                        <p>{booking?.dropOffLocationName}</p>
                    </div>
                    <div className="col-md-4">
                        <label>Distance (miles)</label>
                        <p>{booking?.distance}</p>
                    </div>
                    <div className="col-md-4">
                        <label>Estimated Time (minute)</label>
                        <p>{booking?.duration}</p>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="price">Price</label>
                        <p>{booking?.price}</p>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="babySeat">Baby Seat Required?</label>
                        <p>{booking?.babySeat == true ? 'Yes' : 'No'}</p>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="greetings">Greetings?</label>
                        <p>{booking?.greetings == true ? 'Yes' : 'No'}</p>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="flightNumber">Flight Number</label>
                        <p>{booking?.flightNumber}</p>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="origin">Origin</label>
                        <p>{booking?.origin}</p>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="createdOn">Created On</label>
                        <p>{moment(booking?.createdOn).format('MMMM Do YYYY, h:mm a')}</p>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="notes">Notes</label>
                        <p>{booking?.notes}</p>
                    </div>
                    <div className="col-md-4">
                        <label>Passengers</label>
                        <p>{booking?.passengers}</p>
                    </div>
                    <div className="col-md-4">
                        <label>Luggage</label>
                        <p>{booking?.luggage}</p>
                    </div>
                </div>
            </div>
            
            <>
                <Modal
                    show={showCancelBookingModal}
                    onHide={handleCancelBookingModalClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Cancel Booking</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <p>{booking?.paymentMethod == PaymentMethodEnum.Cash ? 'Note: Cash booking can be canceled directly.'
                                : 'Note: Card Booking will require a refund action after cancelling.'} </p>
                        </div>
                        <div>
                            <button className="btn btn-primary m-1" type="button" onClick={handleCancelBooking}>Yes, Cancel</button>
                            <button className="btn btn-secondary m-1" type="button" onClick={handleCancelBookingModalClose}>Close</button>
                        </div>

                    </Modal.Body>
                </Modal>
            </>
            <>
                <Modal
                    show={showRefundBookingModal}
                    onHide={handleRefundBookingModalClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Refund Booking</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <p>Please insert refund amount</p>
                        </div>
                        <div>
                            <button className="btn btn-primary m-1" type="button" onClick={handleRefundBooking}>Refund Now</button>
                            <button className="btn btn-secondary m-1" type="button" onClick={handleRefundBookingModalClose}>Close</button>
                        </div>

                    </Modal.Body>
                </Modal>
            </>
        </DashboardLayout>
    );
}

export default BookingView;
