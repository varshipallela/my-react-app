// import React from 'react';
// import SidebarMenu from './SidebarMenu';
// import { Outlet } from 'react-router-dom';

// const SidebarLayout: React.FC = () => {
//   return (
//     <div style={{ display: 'flex' }}>
//       <SidebarMenu />
//       <div style={{ flex: 1, padding: '2rem' }}>
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default SidebarLayout;
// SidebarLayout.tsx
import React from 'react';
import Header from './Header';
import SidebarMenu from './SidebarMenu';
import { Outlet } from 'react-router-dom';

const SidebarLayout: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      
      {/* === Fixed Header === */}
      <div style={{
        width: '100%',
        borderBottom: '1px solid #e0e0e0',
        backgroundColor: '#fff',
        zIndex: 1000,
      }}>
        <Header />
      </div>

      {/* === Below Header: Sidebar + Content === */}
      <div style={{ display: 'flex', flex: 1 }}>
        
        {/* Sidebar */}
        <div style={{
          width: '300px',
          backgroundColor: '#f5f5f5',
          borderRight: '1px solid #e0e0e0',
          height: '100%',
        }}>
          <SidebarMenu />
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default SidebarLayout;
