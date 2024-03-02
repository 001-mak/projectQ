import React, { } from "react";
import DashboardLayout from "../../DashboardLayout";
import PaginatedTable from "../../../common/PaginatedTable";
import { useNavigate } from "react-router-dom";

function FareSettingLV(user) {
    const navigate = useNavigate();
    
    const extraColumns = [
        {
            selector: row => row.locationName,
            name: "Location",
        },
        {
            selector: row => row.vehicleTypeName,
            name: "Vehicle Type",
        },
        {
            selector: row => row.firstLimit,
            name: "1st limit",
        },
        {
            selector: row => row.firstLimitPrice,
            name: "1st limit price",
        },
        {
            selector: row => row.secondLimit,
            name: "2nd limit",
        },
        {
            selector: row => row.secondLimitPrice,
            name: "2nd limit price/mil",
        },
        {
            selector: row => row.sort,
            name: "Priority",
        }
    ];

    if (!user) {
        navigate('/');
    }
    return (
        <DashboardLayout title="Fare Settings">
            <PaginatedTable
                title="Fare Settings"
                extraColumns={extraColumns}
                pagedAPIEndpoint="/faresettings/paged"
                deleteEndpoint="/faresettings"
                showAdd={true}
                showDelete={true}
                showEdit={true}
                addEditComponentRoute="/faresetting-ae"/>
        </DashboardLayout>
    );
}

export default FareSettingLV;