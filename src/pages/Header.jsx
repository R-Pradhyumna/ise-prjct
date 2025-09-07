// src/pages/Header.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom"; // Import NavLink
import "./Header.css";

// A simple hamburger icon component (or you can use an SVG library)
const HamburgerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  // Close nav when a link is clicked (for mobile)
  const handleLinkClick = () => {
    if (isNavOpen) {
      setIsNavOpen(false);
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* Left logo - always visible */}
        <NavLink to="/" className="logo-link" onClick={handleLinkClick}>
          <img
            src="/assets/MIT.webp"
            alt="MIT Logo"
            className="logo mit-logo"
          />
        </NavLink>

        {/* Navigation */}
        <nav className={`nav ${isNavOpen ? "nav-open" : ""}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                end
                onClick={handleLinkClick}
              >
                Homepage
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/project"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                onClick={handleLinkClick}
              >
                Projects
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/announcements"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                onClick={handleLinkClick}
              >
                Announcements
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/prizes"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                onClick={handleLinkClick}
              >
                Prizes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/formats"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                onClick={handleLinkClick}
              >
                Formats
              </NavLink>
            </li>
          </ul>
          {/* ISE Logo inside mobile nav for better space management */}
          <img
            src="/assets/ISE.webp"
            alt="ISE Logo"
            className="logo ise-logo nav-ise-logo"
          />
        </nav>

        {/* Right logo - visible on desktop, hidden in standard flow on mobile */}
        <img
          src="/assets/ISE.webp"
          alt="ISE Logo"
          className="logo ise-logo desktop-ise-logo"
        />

        {/* Hamburger Menu Button */}
        <button
          className="nav-toggle"
          onClick={toggleNav}
          aria-label="Toggle navigation"
          aria-expanded={isNavOpen}
        >
          {isNavOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>
      </div>
    </header>
  );
}

export default Header;

// // src/pages/Header.jsx
// import { useState } from "react";
// import { NavLink } from "react-router-dom"; // Import NavLink
// import "./Header.css";

// // A simple hamburger icon component (or you can use an SVG library)
// const HamburgerIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="28"
//     height="28"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <line x1="3" y1="12" x2="21" y2="12"></line>
//     <line x1="3" y1="6" x2="21" y2="6"></line>
//     <line x1="3" y1="18" x2="21" y2="18"></line>
//   </svg>
// );

// const CloseIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="28"
//     height="28"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <line x1="18" y1="6" x2="6" y2="18"></line>
//     <line x1="6" y1="6" x2="18" y2="18"></line>
//   </svg>
// );

// function Header() {
//   const [isNavOpen, setIsNavOpen] = useState(false);

//   const toggleNav = () => {
//     setIsNavOpen(!isNavOpen);
//   };

//   // Close nav when a link is clicked (for mobile)
//   const handleLinkClick = () => {
//     if (isNavOpen) {
//       setIsNavOpen(false);
//     }
//   };

//   return (
//     <header className="header">
//       <div className="header-content">
//         {" "}
//         {/* Wrapper for content alignment */}
//         {/* Left logo - always visible */}
//         <NavLink to="/" className="logo-link" onClick={handleLinkClick}>
//           <img
//             src="/assets/MIT.webp"
//             alt="MIT Logo"
//             className="logo mit-logo"
//           />
//         </NavLink>
//         {/* Navigation */}
//         <nav className={`nav ${isNavOpen ? "nav-open" : ""}`}>
//           <ul className="nav-list">
//             <li className="nav-item">
//               <NavLink
//                 to="/"
//                 className="nav-link"
//                 activeClassName="active"
//                 exact
//                 onClick={handleLinkClick}
//               >
//                 Homepage
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink
//                 to="/project"
//                 className="nav-link"
//                 activeClassName="active"
//                 onClick={handleLinkClick}
//               >
//                 Projects
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink
//                 to="/announcements"
//                 className="nav-link"
//                 activeClassName="active"
//                 onClick={handleLinkClick}
//               >
//                 Announcements
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink
//                 to="/prizes"
//                 className="nav-link"
//                 activeClassName="active"
//                 onClick={handleLinkClick}
//               >
//                 Prizes
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink
//                 to="/formats"
//                 className="nav-link"
//                 activeClassName="active"
//                 onClick={handleLinkClick}
//               >
//                 Formats
//               </NavLink>
//             </li>
//           </ul>
//           {/* ISE Logo inside mobile nav for better space management */}
//           <img
//             src="/assets/ISE.webp"
//             alt="ISE Logo"
//             className="logo ise-logo nav-ise-logo"
//           />
//         </nav>
//         {/* Right logo - visible on desktop, hidden in standard flow on mobile */}
//         <img
//           src="/assets/ISE.webp"
//           alt="ISE Logo"
//           className="logo ise-logo desktop-ise-logo"
//         />
//         {/* Hamburger Menu Button */}
//         <button
//           className="nav-toggle"
//           onClick={toggleNav}
//           aria-label="Toggle navigation"
//           aria-expanded={isNavOpen}
//         >
//           {isNavOpen ? <CloseIcon /> : <HamburgerIcon />}
//         </button>
//       </div>
//     </header>
//   );
// }

// export default Header;
