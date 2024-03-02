import React, {  } from "react";
import DashboardLayout from "../../DashboardLayout";
import PaginatedTable from "../../../common/PaginatedTable";
import { useNavigate } from "react-router-dom";

function LocationLV(user) {
    const navigate = useNavigate();
    const extraColumns = [
        {
            name: "Name",
            selector: row => row.name,
        },
    ];
    if (!user) {
        navigate('/');
    }
    return (
        <DashboardLayout title="Locations">
            <PaginatedTable
                title="Locations"
                extraColumns={extraColumns}
                pagedAPIEndpoint="/locations/paged"
                deleteEndpoint="/locations"
                showAdd={true}
                showDelete={true}
                showEdit={true}
                addEditComponentRoute="/location-ae"/>
        </DashboardLayout>
    );
}


export default LocationLV;