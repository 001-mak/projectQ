// import React, { useEffect, useState } from "react";
// import DashboardLayout from "../../DashboardLayout";
// import axios from "axios";
// import { envirnoment } from "../../../../envirnoment";
// import BootstrapTable from "react-bootstrap-table-next";
// import paginationFactory from "react-bootstrap-table2-paginator";
// import { useNavigate } from "react-router-dom";
// import { FaCheckDouble, FaExclamationTriangle, FaTimesCircle } from "react-icons/fa";
// import authHeader from "../../../../services/auth-header";
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';

// function UsersLV(user) {
//     const navigate = useNavigate();
//     const [selectedUserId, setSelectedUserId] = useState(null);
//     const [show, setShow] = useState(false);
//     const [data, setData] = useState([]);
//     const [searchInput, setSearchInput] = useState("");
//     const [searchedText, setSearchedText] = useState("");

//     const getData = (searchText = "", pageIndex = 1, pageSize = 10) => {
//         apiService.get('/identity/paged', { params: { searchText, pageIndex, pageSize }, headers: authHeader() }).then(response => {
//             setData(response.data);
//             setSearchedText(searchText);
//             setSearchInput("");
//         });
//     }

//     const handleTableChange = (type, { page, sizePerPage }) => {
//         if (type == "pagination")
//             getData(searchedText, page, sizePerPage);
//     }

//     const handleVerifyClick = (row) => {
//         setSelectedUserId(row.id);
//         handleShow();
//     }

//     const verifyUser = () => {

//         apiService.put( `/identity/markverified/${selectedUserId}`, null, { headers: authHeader() }).then(response => {
//             setSelectedUserId(null);
//             handleClose();
//             getData(searchedText);
//         });
//     }


//     const handleClose = () => {
//         setSelectedUserId(null);
//         setShow(false)
//     };
//     const handleShow = () => setShow(true);

//     useEffect(() => {
//         getData();
//     }, []);

//     const columns = [
//         {
//             dataField: "firstName",
//             text: "First Name",
//         },
//         {
//             dataField: "lastName",
//             text: "Last Name",
//         },
//         {
//             dataField: "email",
//             text: "Email",
//         },
//         {
//             dataField: "phoneNumber",
//             text: "Phone Number",
//         },
//         {
//             dataField: "companyName",
//             text: "Company",
//         },
//         {
//             dataField: "roleName",
//             text: "Role",
//         },
//         {
//             dataField: 'id',
//             text: 'Action',
//             formatter: (cell, row, rowIndex, extraData) => (
//                 <div>
//                     {row.role == 1 && (
//                         <>
//                             {row?.verified == false ? (
//                                 <span><button type="button" className="btn icon-btn-mini" onClick={(e) => handleVerifyClick(row)}><FaExclamationTriangle /></button></span>
//                             ) : (
//                                 <span><button type="button" className="btn icon-btn-mini"><FaCheckDouble /></button></span>
//                             )}
//                         </>
//                     )}
//                 </div>
//             ),
//         },
//     ];

//     if (!user) {
//         navigate('/');
//     }
//     return (
//         <DashboardLayout title="Users">
//             <div className="row">
//                 <div className="mb-3">
//                     <div className="row">
//                         <div className="col-md-4">

//                         </div>
//                         <div className="col-md-4 d-flex flex-row-reverse">
//                             {searchedText && (
//                                 <button type="button" className="btn btn-sm btn-outline-success"
//                                     onClick={e => getData()}>{searchedText} {' '} <FaTimesCircle /></button>
//                             )}

//                         </div>
//                         <div className="col-md-4">
//                             <Form className="d-flex" onSubmit={e => { e.preventDefault(); getData(searchInput); }}>
//                                 <Form.Control
//                                     type="search"
//                                     placeholder="Search"
//                                     className="me-2"
//                                     aria-label="Search"
//                                     name="searchInput"
//                                     value={searchInput}
//                                     onChange={(e) => setSearchInput(e.target.value)}
//                                 />
//                                 <Button type="button" variant="outline-success" onClick={e => { e.preventDefault(); getData(searchInput); }}>Search</Button>
//                             </Form>
//                         </div>
//                     </div>

//                 </div>
//                 <BootstrapTable
//                     remote
//                     keyField="id"
//                     data={data?.data ?? []}
//                     columns={columns}
//                     hover
//                     condensed
//                     pagination={paginationFactory({ showTotal: true, page: data.pageIndex, sizePerPage: data.pageSize, totalSize: data.totalCount })}
//                     onTableChange={handleTableChange}
//                 />
//             </div>

//             <>
//                 <Modal
//                     show={show}
//                     onHide={handleClose}
//                     backdrop="static"
//                     keyboard={false}
//                 >
//                     <Modal.Header closeButton>
//                         <Modal.Title>Confirmation Message</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         Buyer user profile will be verified and he will be able to access the dashboard. Confirm to save changes
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={handleClose}>
//                             Close
//                         </Button>
//                         <Button variant="primary" onClick={verifyUser}>Verify</Button>
//                     </Modal.Footer>
//                 </Modal>
//             </>
//         </DashboardLayout>
//     );
// }

// export default UsersLV;