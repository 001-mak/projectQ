import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import "./styles/styledNavbar.css"
import { useDispatch, useSelector } from "react-redux";
import { FaBell, FaEnvelope, FaEnvelopeOpen } from 'react-icons/fa';
import Dropdown from 'react-bootstrap/Dropdown';
import { logout } from '../actions/auth';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { envirnoment } from '../envirnoment';
import axios from "axios";
import authHeader from '../services/auth-header';

function Navbar() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [bellColor, setBellColor] = useState('#000');
  const [connection, setConnection] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const latestNotifications = useRef(null);
  latestNotifications.current = notifications;


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signOutClick = () => {
    dispatch(logout())
      .then(() => {
        navigate("/");
        window.location.reload();

      })
      .catch((err) => {

      });
  }
  const handleNotificationItemClick = (notification) => {}
  // const handleNotificationItemClick = (notification) => {
  //   if (notification.isRead == false) {
  //     apiService.put( '/notifications/markread/' + notification.id, notification).then(response => {
  //       loadNotifications();
  //     });
  //   }
  //   if (notification.recordType == 1 && notification.recordID > 0)
  //     navigate('/part-inquiry/' + notification.recordID);
  // }

  // const loadNotifications = () => {
  //   apiService.get('/notifications').then(response => {
  //     setNotifications(response.data);
  //   });
  // }
  // useEffect(() => {

  //   if (currentUser && currentUser?.role == 2) {
  //     const newConnection = new HubConnectionBuilder()
  //       .withUrl(envirnoment.NotificationUserHubURL + "?userId=" + currentUser?.id)
  //       .withAutomaticReconnect()
  //       .build();

  //     setConnection(newConnection);
  //     loadNotifications();

  //   }
  // }, []);

  // useEffect(() => {
  //   if (connection) {
  //     connection.start()
  //       .then(result => {

  //         connection.on('ReceiveMessage', message => {
  //           const updatedNotifications = [message, ...latestNotifications.current];
  //           setNotifications(updatedNotifications);
  //           setBellColor('red');
  //         });

  //         connection.invoke("GetConnectionId")
  //       })
  //       .catch(e => {
  //         // For debug only
  //         //console.log('Connection failed: ', e)
  //       });
  //   }

  // }, [connection]);

  return (
    <div>
      <div className="nav-container">
        <div className="nav-left">
          <div className="logo me-auto me-lg-0">
            <img src="logo.png" className="img-fluid" alt="Express Airport Cabs" />
          </div>
        </div>
        <div className="nav-right">
          <div className="nav-links">
            {
              currentUser && (
                <Link to="/bookings" className='nav-link border-right' smooth="true">Home</Link>
              )
            }


            {
              currentUser ? (
                <>
                  
                  <div className="d-flex align-items-center">
                    {currentUser.role == 2 && (
                      <div className="dropdown">

                        <Dropdown>
                          <Dropdown.Toggle variant="" size="sm" className='border-none-class' id="dropdown-basic">
                            <FaBell fontSize={18} color={notifications.find(x => x.isRead == false) ? '#0d6efd' : '#000'}></FaBell>
                            {notifications.filter(x => x.isRead == false).length > 0 && (
                              <>{notifications.filter(x => x.isRead == false).length}</>
                            )}
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Header>Notifications</Dropdown.Header>
                            {
                              notifications.map((x, index) => (
                                <>
                                  <Dropdown.Item key={index} onClick={e => handleNotificationItemClick(x)}>
                                    <div className="notification-item">
                                      <h4>{x.isRead == true ? (
                                        <FaEnvelopeOpen color='#d1d1d1' title='Read' />
                                      ) :
                                        (<FaEnvelope color='#a1a1a1' title='Mark Read' />)} {' '} {x.title}</h4>
                                      <p>{x.description}</p>
                                      <p className='days-ago'> {Math.floor((new Date().getTime() - new Date(x.createdAt).getTime()) / (1000 * 3600 * 24))} day(s) ago</p>

                                    </div>
                                  </Dropdown.Item>
                                  <Dropdown.Divider />
                                </>
                              ))
                            }
                            <Dropdown.Item>
                              <div className='row'>
                                <div className="notification-item">
                                  <p className='see-all'><Link to="/notifications" smooth="true">See All</Link></p>
                                </div>
                              </div>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    )}

                    <div className='username-email-nav'>
                      <h2>
                        {currentUser.fullName}
                      </h2>
                      <span>
                        {currentUser.email}
                      </span>
                    </div>
                    <div className='avatar'>
                      <span>{currentUser.fullName? currentUser.fullName[0]: ''}</span>
                    </div>
                    <div className="dropdown">
                      <Dropdown>
                        <Dropdown.Toggle variant="" size="sm" className='border-none-class' id="dropdown-basic1">
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item onClick={e => navigate("/my-profile")}>My Profile</Dropdown.Item>
                          <Dropdown.Item onClick={signOutClick}>Sign Out</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>

                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/" className='nav-link login' smooth="true">Login</Link>
                  <Link to="/register" className='nav-link register' smooth="true">Register</Link>
                </>
              )
            }

          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
