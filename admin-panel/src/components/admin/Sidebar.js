import React from "react";
import "./styledSidebar.css";
import { FaCalendarCheck, FaCar, FaCogs, FaMapMarkerAlt, FaMoneyBillAlt, FaUser, FaUserTie } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Roles } from "../../common/Constants";

function Sidebar() {
  const { user: currentUser } = useSelector((state) => state.auth);
  return (
    <>
      <div className="menu-container">
        <div className="menu">
          {currentUser.verified && (
            <>
              {/* <div className="menu-option">
                <Link to="/part-lv" className="side-menu-option"><FaPuzzlePiece className="menu-icon" />
                {currentUser.role == 1? (<>Search Inventory</>) : (<>Inventory Dashboard</>)}
                </Link>

              </div>
              <div className="menu-option">
                <Link to="/part-inquiries-lv" className="side-menu-option">{<FaQuestionCircle className="menu-icon" />}Inquiries Dashboard</Link>
              </div>
              {currentUser.role < 2 && (
                <>
                  <div className="menu-option">
                    <Link to="/equivalent-lv" className="side-menu-option">{<FaDashcube className="menu-icon" />}Equivalent Requests</Link>
                  </div>
                </>
              )}
              {currentUser.role == 1 && (
                <>
                  <div className="menu-option">
                    <Link to="/equivalent-ae?name=Request Quote" className="side-menu-option">{<FaDashcube className="menu-icon" />}Request Quote</Link>
                  </div>
                </>
              )} */}
              {currentUser.role == Roles.Admin && (
                <>
                  <div className="menu-option">
                    <Link to="/bookings" className="side-menu-option">{<FaCalendarCheck className="menu-icon" />}Bookings</Link>
                  </div>
                  <div className="menu-option">
                    <Link to="/driverprofiles" className="side-menu-option">{<FaUserTie className="menu-icon" />}Drivers</Link>
                  </div>
                  <div className="menu-option">
                    <Link to="/vehicletypes" className="side-menu-option">{<FaCar className="menu-icon" />}Vehicle Types</Link>
                  </div>
                  <div className="menu-option">
                    <Link to="/locations" className="side-menu-option">{<FaMapMarkerAlt className="menu-icon" />}Locations</Link>
                  </div>
                  <div className="menu-option">
                    <Link to="/faresettings" className="side-menu-option">{<FaMoneyBillAlt className="menu-icon" />}Fare Settings</Link>
                  </div>
                  <div className="menu-option">
                    <Link to="/user-lv" className="side-menu-option">{<FaUser className="menu-icon" />}Users</Link>
                  </div>
                  <div className="menu-option">
                    <Link to="/systemconfigs" className="side-menu-option">{<FaCogs className="menu-icon" />}System Config</Link>
                  </div>
                  
                  {/* <div className="menu-option">
                    <Link to="/part-search-history-lv" className="side-menu-option">{<FaHistory className="menu-icon" />}Search History</Link>
                  </div> */}
                </>
              )}
            </>
          )}

        </div>
      </div>
    </>
  );
}

export default Sidebar;
