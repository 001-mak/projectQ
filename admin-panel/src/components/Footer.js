import React from 'react'
import "./styles/styledFooter.css"
import { FaFacebookF, FaInstagram, FaSkype } from "react-icons/fa"
import { FaTwitter } from "react-icons/fa"
import { FaLinkedinIn } from "react-icons/fa"

function Footer() {
  return (

    <div>
      <footer id="footer">


        <div className="footer-top">
          <div className="container">
            <div className="row">

              <div className="col-lg-4 col-md-6 footer-contact">
                <h3>Express Airport Cabs</h3>
                <p>
                  Unit 2. Maple Grove Business Centre. <br />
                  Lawrence Road,<br />
                  Hounslow. TW4 6DR. <br /><br />
                  <strong>Phone:</strong> +44 (0)20339558603<br />
                  <strong>Email:</strong> info@expressairportcabs.com<br />
                </p>
              </div>

              <div className="col-lg-4 col-md-6 footer-links">
                <h4>Useful Links</h4>
                <ul>
                  <li><i className="bx bx-chevron-right"></i> <a target="_blank" href="https://expressairportcabs.com/">Home</a></li>
                </ul>
              </div>

              <div className="col-lg-4 col-md-6 footer-links">
                <h4>Our Social Networks</h4>
                <p>Join our community for latest updates</p>
                <div className="social-links mt-3">
                  <a href="#" className="twitter"><FaTwitter className="fa fa-twitter"></FaTwitter></a>
                  <a href="#" className="facebook"><FaFacebookF className="fa fa-facebook"></FaFacebookF></a>
                  <a href="#" className="instagram"><FaInstagram className="fa fa-instagram"></FaInstagram></a>
                  <a href="#" className="google-plus"><FaSkype className="fa fa-skype"></FaSkype></a>
                  <a href="#" className="linkedin"><FaLinkedinIn className="fa fa-linkedin"></FaLinkedinIn></a>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="container footer-bottom clearfix">
          <div className="copyright">
            &copy; Copyright <strong><span>ExpressAirportCabs</span></strong>. All Rights Reserved
          </div>
          <div className="credits">
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
