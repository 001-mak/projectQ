import React, { } from "react";
import DashboardLayout from "../../DashboardLayout";
import PaginatedTable from "../../../common/PaginatedTable";
import { useNavigate } from "react-router-dom";

function UsersLV(user) {
    const navigate = useNavigate();
    
    const extraColumns = [
        {
            selector: row => row.firstName,
            name:"First Name",
        },
        {
            selector: row => row.lastName,
            name:"Last Name",
        },
        {
            selector: row => row.username,
            name:"Username",
        },
        {
            selector: row => row.email,
            name:"Email",
        },
        {
            selector: row => row.userType,
            name:"Role",
        },
    ];

    if (!user) {
        navigate('/');
    }
    return (
        <>
        <DashboardLayout>
            <PaginatedTable
                title="Users"
                extraColumns={extraColumns}
                pagedAPIEndpoint="http://localhost:5000/api/users"
                deleteEndpoint=""
                showAdd={true}
                showDelete={true}
                showEdit={true}
                />
        </DashboardLayout>
        </>
    );
}

export default UsersLV;