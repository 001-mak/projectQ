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
            selector: row => row.roleName,
            name:"Role",
        },
    ];

    if (!user) {
        navigate('/');
    }
    const apiURL = `${process.env.baseURL}/users`
    return (
        <>
        <h1>users</h1>
        <DashboardLayout title="Users">
            <h3>dashboard</h3>
            <PaginatedTable
                title="Users"
                extraColumns={extraColumns}
                pagedAPIEndpoint=""
                deleteEndpoint={apiURL}
                showAdd={true}
                showDelete={true}
                showEdit={true}
                />
        </DashboardLayout>
        </>
    );
}

export default UsersLV;