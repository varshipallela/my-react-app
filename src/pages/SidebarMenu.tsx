import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SidebarMenu: React.FC = () => {
  const location = useLocation();

  return (
    <div style={{ width: '350px', background: '#f0f0f0', padding: '1rem', height: '100vh'  }}>
      <h3>Menu</h3>
      <Link to="/inventory" style={{ fontWeight: location.pathname === '/inventory' ? 'bold' : 'normal', display: 'block', margin: '1rem 0' }}>
        + Inventory Dashboard
      </Link>
      <Link to="/inventory/stock-usage" style={{ fontWeight: location.pathname === '/inventory/stock-usage' ? 'bold' : 'normal', display: 'block', margin: '1rem 0' }}>
        + Inventory Stock Usage
      </Link>
    </div>
  );
};

export default SidebarMenu;
