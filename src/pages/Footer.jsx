// src/pages/Footer.jsx
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content-wrapper">
        {" "}
        {/* To constrain width like header/main */}
        <div className="footer-section about-department">
          <h4 className="footer-heading">Information Science & Engineering</h4>
          <p className="university-affiliation">
            Maharaja Institute of Technology Mysore
          </p>
          <div className="footer-logo-section">
            <img
              src="/assets/MIT.webp"
              alt="MIT Logo"
              className="footer-logo"
            />
            <img
              src="/assets/ISE.webp"
              alt="ISE Logo"
              className="footer-logo"
            />
          </div>
        </div>
        <div className="footer-section contact-info">
          <div className="contact-card">
            <img
              src="/assets/HoD.webp"
              alt="Dr Sharath Kumar Y H"
              className="footer-profile-img"
            />
            <div>
              <h4 className="footer-heading">Contact</h4>
              <p className="hod-name">Dr Sharath Kumar Y H</p>
              <p className="hod-title">Professor & Head, Dept. of IS&E</p>
              <div className="contact-links">
                <a href="tel:+91 94808 49443" className="footer-link">
                  Mobile
                </a>
                <a href="mailto:hodise@mitmysore.in" className="footer-link">
                  Mail
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-section contact-info">
          <div className="contact-card">
            <img
              src="/assets/Bhavya-Mam.webp"
              alt="Bhavyashree H D"
              className="footer-profile-img"
            />
            <div>
              <h4 className="footer-heading">Contact</h4>
              <p className="hod-name">Bhavyashree H D</p>
              <p className="hod-title">Assistant Professor, Dept. of IS&E</p>
              <div className="contact-links">
                <a href="tel:+91 94482 83452" className="footer-link">
                  Mobile
                </a>
                <a
                  href="mailto:bhavyashreehd_cse@mitmysore.in"
                  className="footer-link"
                >
                  Mail
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Optional: Add another section for Quick Links if needed later */}
        {/* <div className="footer-section quick-links">
          <h4 className="footer-heading">Quick Links</h4>
          <a href="/events" className="footer-link">Events</a>
          <a href="/gallery" className="footer-link">Gallery</a>
        </div> */}
      </div>
      <div className="footer-bottom">
        <p>
          &copy; 2025, Department of Information Science & Engineering, MIT
          Mysore. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
