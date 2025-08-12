// // components/Header.tsx
// import React from 'react';
// import facility from '../assets/facility.png';
// import iotiq from '../assets/iotiq.png';
// import logo from '../assets/logo.png';
// import { Link } from 'react-router-dom';
// import '../App.css';

// const Header: React.FC = () => {
//   return (
//     <div className="top-header">
//       <div className="left-logo">
//                 <img src={logo} alt="IOTIQ" className="right-logo" />

//       </div>

//       <div className="center-branding">
//                         <img src={facility} alt="SmartEdgeFM" />

//       </div>

//       <div className="right-user">
//         <div className="user-info">
//           <span>Jonson Jonson</span> | <Link to="/login">Logout<span>|</span></Link>
//         </div>
//         <img src={iotiq} alt="IOTIQ Edge" className="right-logo"/>

//       </div>
//     </div>
//   );
// };

// export default Header;
// components/Header.tsx
import React from 'react';
import facility from '../assets/facility.png';
import iotiq from '../assets/iotiq.png';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import '../App.css';

const Header: React.FC = () => {
  return (
    <div className="top-header">
      {/* Left Logo */}
      <div className="left-logo">
        <img src={logo} alt="IOTIQ" className="right-logo" />
      </div>

      {/* Center Branding */}
      <div className="center-branding">
        <img src={facility} alt="SmartEdgeFM" />
      </div>

      {/* Right User Section */}
      <div className="right-user">
        <div className="user-info">
          <img
            src="https://www.w3schools.com/howto/img_avatar.png" // free default avatar
            alt="User Avatar"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              marginRight: '8px',
              verticalAlign: 'middle'
            }}
          />
          <span>Jonson Jonson</span> | <Link to="/login">Logout<span>|</span></Link>
        </div>
        <img src={iotiq} alt="IOTIQ Edge" className="right-logo" />
      </div>
    </div>
  );
};

export default Header;
