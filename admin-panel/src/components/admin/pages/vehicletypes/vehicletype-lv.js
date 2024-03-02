import React, { } from "react";
import DashboardLayout from "../../DashboardLayout";
import PaginatedTable from "../../../common/PaginatedTable";
import { useNavigate } from "react-router-dom";

function VehicleTypeLV(user) {
    const navigate = useNavigate();
    const extraColumns = [
        {
            name: "Name",
            selector: row => row.name,
        },
        {
            name: "Bags Limit",
            selector: row => row.bagsLimit,
        },
        {
            name: "Seating Capacity",
            selector: row => row.seatingCapacity,
        },
        {
            name: "Sort Order",
            selector: row => row.sortOrder,
        },
    ];

    if (!user) {
        navigate('/');
    }
    return (
        <DashboardLayout title="Vehicle Types">
            <PaginatedTable
                title="Vehicle Types"
                extraColumns={extraColumns}
                pagedAPIEndpoint="/vehicletypes/paged"
                deleteEndpoint="/vehicletypes"
                showAdd={true}
                showDelete={true}
                showEdit={true}
                addEditComponentRoute="/vehicletype-ae" />
        </DashboardLayout>
    );
}
export default VehicleTypeLV;