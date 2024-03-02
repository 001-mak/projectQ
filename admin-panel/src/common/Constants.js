export const Roles = {
    Admin: 1,
    Customer: 2,
    Driver: 3
};



export const BookingStatus = {
    PendingPayment: 0,
    Pending: 1,
    Confirmed: 2,
    Completed: 2,
    Canceled: 4
};

export const PaymentStatus = {
    Pending: 0,
    Paid: 1,
    DriverPaid: 2,
    RefundPending: 3,
    Refunded: 4
}

export const PaymentMethodEnum = {
    Cash:1,
    Card:2
}


export const BookingStatusDDL = [
    { label: 'Pending Payment', name: 'Pending Payment', value: BookingStatus.PendingPayment },
    { label: 'Pending', name: 'Pending', value: BookingStatus.Pending },
    { label: 'Confirmed', name: 'Confirmed', value: BookingStatus.Confirmed },
    { label: 'Completed', name: 'Completed', value: BookingStatus.Completed },
    { label: 'Canceled', name: 'Canceled', value: BookingStatus.Canceled }
]

export const PaymentStatusDDL = [
    { label: 'Pending', name: 'Pending', value: PaymentStatus.Pending },
    { label: 'Paid', name: 'Paid', value: PaymentStatus.Paid },
    { label: 'Driver Paid', name: 'Driver Paid', value: PaymentStatus.DriverPaid },
    { label: 'Refund Pending', name: 'Refund Pending', value: PaymentStatus.RefundPending },
    { label: 'Refunded', name: 'Refunded', value: PaymentStatus.Refunded }
]

export const ExpiringInDDL = [
    { label: '7 Days', name: '7 Days', value: 7 },
    { label: '15 Days', name: '15 Days', value: 15 },
    { label: '1 month', name: '1 month', value: 30 },
    { label: '2 months', name: '2 months', value: 60 },
]