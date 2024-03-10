import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import axios from "axios";
import { envirnoment } from "../../envirnoment";
import { useNavigate } from 'react-router-dom';
import { FaAngleDown, FaArchive, FaEdit, FaEye, FaTimesCircle } from "react-icons/fa";
import authHeader from "../../services/auth-header";
import Button from 'react-bootstrap/Button';
import BSForm from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import DataTable from "react-data-table-component";
import apiService from "../../services/api.service";
import { useSelector } from "react-redux";


const PaginatedTable = forwardRef((TableProps, ref) => {
    const {user: currentUser} = useSelector(state => state.auth)
    const { title, pagedAPIEndpoint, deleteEndpoint, showAdd, showDelete, showEdit, addEditComponentRoute, extraColumns, showView, viewComponentRoute, searchForm, children } = TableProps;

    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);

    const [show, setShow] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [searchInput, setSearchInput] = useState("");
    const [searchedText, setSearchedText] = useState("");
    const [filters, setFilters] = useState(null);

    const [orderBy, setOrderBy] = useState(null);
    const [ascending, setAscending] = useState(true);

    const getData = async (searchText = "", page = 1, pageSize = 10, orderByColumn = null, asc = true, searchFilters= null) => {
        setLoading(true);

        //test******
        // await axios.get("http://localhost:5000/api/users",{
        //     headers: {
        //               'authorization': `bearer ${currentUser.token}`,
        //               // Other headers...
        //             }
        // }).then((response)=>{console.log(response.data)})
         

        apiService.get("http://localhost:5000/api/users", { params: { searchText, page, pageSize, orderBy: orderByColumn, ascending: asc, ...searchFilters } }).then(response => {
            console.log(response.data)
            setData(response.data);
            setTotalRows(10);
            setSearchedText(searchText);
            setSearchInput("");
            setLoading(false);
        });
    };

    const handlePageChange = page => {
        getData(searchedText, page, perPage, orderBy, ascending, filters);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        setPerPage(newPerPage);
        getData(searchedText, page, newPerPage, orderBy, ascending, filters);
    };

    const handleSort = async (column, sortDirection) => {
        let sortOrder = sortDirection === "asc";

        setOrderBy(column.sortField);
        setAscending(sortOrder);
        getData(searchedText, 1, 10, column.sortField, sortOrder, filters);
    };

    const handleDeleteClick = (row) => {
        setSelectedId(row.id);
        handleShow();
    }

    const handleClose = () => {
        setSelectedId(null);
        setShow(false)
    };
    const handleShow = () => setShow(true);

    const deleteRecord = async () => {
        apiService.deleteCall(`${deleteEndpoint}/${selectedId}`).then(response => {
            setSelectedId(null);
            handleClose();
            getData(searchedText, 1, perPage, orderBy, ascending, filters);
        });
    }


    // expandable Search Box Start 

    const [isOpen, setIsOpen] = useState(false);
    const [selectedAction, setSelectedAction] = useState(null);

    const handleSelectAction = () => {
        setIsOpen(false);
    };
    // The component instance will be extended
    // with whatever you return from the callback passed
    // as the second argument
    useImperativeHandle(ref, () => ({
        closeSearchBox() {
            setIsOpen(false);
        },
        searchWithFilter(values){
            setIsOpen(false);
            setFilters(values);
            getData(searchedText, 1, perPage, orderBy, ascending, values);
        },
        getAlert() {
            alert("getAlert from Child");
        }

    }));
    //  expandable Search Box End

    useEffect(() => {
        console.log("table")
        console.log(currentUser.token)
        getData();
    }, []);

    let columns = [
        {
            name: "ID",
            selector: row => row.id,
            sortable: true,
            sortField: 'ID',
            width: '80px',
        },
    ];

    if (extraColumns) {
        columns = [...columns, ...extraColumns]
    }

    if (showEdit || showDelete || showView)
        columns.push({
            name: "Actions",
            cell: (row, index, column, id) => (
                <div>
                    {showView && (<button type="button" className="btn icon-btn-mini" onClick={(e) => navigate(`${viewComponentRoute}/${row.id}`, { ...row })}><FaEye title="View" /></button>)}
                    {showEdit && (<button type="button" className="btn icon-btn-mini" onClick={(e) => navigate(`${addEditComponentRoute}/${row.id}`, { ...row })}><FaEdit title="Edit" /></button>)}
                    {showDelete && (<button type="button" className="btn icon-btn-mini" onClick={(e) => handleDeleteClick(row)}><FaArchive title="Delete" /></button>)}
                </div>
            )
        });


    return (
        <>
            <div className="row mb-3">
                <div className="col-md-4">
                    {showAdd && (
                        <button className="btn btn-primary" type="button" onClick={(e) => navigate(addEditComponentRoute)}>
                            Add New
                        </button>
                    )}
                </div>
                <div className="col-md-4 d-flex flex-row-reverse">
                    {searchedText && (
                        <button type="button" className="btn btn-sm btn-outline-success"
                            onClick={e => getData()}>{searchedText} {' '} <FaTimesCircle /></button>
                    )}
                </div>
                <div className="col-md-4">
                    <BSForm className="d-flex" onSubmit={e => { e.preventDefault(); getData(searchInput); }}>
                        <BSForm.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            name="searchInput"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        {searchForm && (<button
                            className="btn sm"
                            type="button"
                            id={`dropdownButton-search`}
                            data-toggle="dropdown"
                            aria-expanded={isOpen ? 'true' : 'false'}
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <FaAngleDown />
                        </button>)}
                        <Button type="button" variant="outline-success" onClick={e => { e.preventDefault(); getData(searchInput); }}>Search</Button>
                    </BSForm>

                    <div
                        className={`dropdown-menu ${isOpen ? 'show' : ''}`}
                        aria-labelledby={`dropdownButton-search`}
                        style={{ minWidth: '480px', right: '20px' }}
                    >
                        <div className="row">
                            <div className="col-lg-12 d-flex align-items-stretch">
                                {searchForm}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <DataTable
                        title={title}
                        columns={columns}
                        data={data}
                        progressPending={loading}
                        pagination
                        paginationServer
                        paginationTotalRows={totalRows}
                        onChangeRowsPerPage={handlePerRowsChange}
                        onChangePage={handlePageChange}

                        onSort={handleSort}
                        sortServer
                    />
                </div>


            </div>

            <>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmation Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this record?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            No
                        </Button>
                        <Button variant="primary" onClick={deleteRecord}>Yes</Button>
                    </Modal.Footer>
                </Modal>
            </>
        </>
    );
});


export default PaginatedTable;