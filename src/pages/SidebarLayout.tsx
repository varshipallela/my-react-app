import React from 'react';
import SidebarMenu from './SidebarMenu';
import { Outlet } from 'react-router-dom';

const SidebarLayout: React.FC = () => {
  return (
    <div style={{ display: 'flex' }}>
      <SidebarMenu />
      <div style={{ flex: 1, padding: '2rem' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default SidebarLayout;
