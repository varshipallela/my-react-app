
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';

const SidebarMenu: React.FC = () => {
  const location = useLocation();
  const [inventoryOpen, setInventoryOpen] = useState(false); 

  const toggleInventory = () => {
    setInventoryOpen(!inventoryOpen);
  };

  const selectedKey = location.pathname;

  return (
    <div style={{
      width: 350,
      minHeight: '100vh',
      backgroundColor: 'lightgray',
      borderRight: '1px solid #e0e0e0',
      paddingTop: '1px'
    }}>

      {/* === Manual Menu Title === */}
      <div
        style={{
          padding: '16px 20px 8px',
          fontWeight: 'bold',
          fontSize: '25px',
          color: '#111'
        }}
      >
        Menu
      </div>

      {/* === Inventory Management Header === */}
      <div
        onClick={toggleInventory}
        style={{
          backgroundColor: '#28c76f',
          color: '#fff',
          fontWeight: 'bold',
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        <UserOutlined style={{ marginRight: 8 }} />
        Inventory Management
        <span style={{ marginLeft: 'auto', fontSize: 18 }}>
          {inventoryOpen ? '–' : '+'}
        </span>
      </div>

      {/* === Sub-items === */}
      {inventoryOpen && (
        <div style={{ padding: '12px 24px', fontWeight: 600 }}>
          <Link
            to="/inventory"
            style={{
              display: 'block',
              padding: '8px 0',
              color: selectedKey === '/inventory' ? '#1e295f' : '#333',
              fontWeight: selectedKey === '/inventory' ? 'bold' : 500,
              textDecoration: 'none'
            }}
          >
            Inventory Management Report
          </Link>

          <Link
            to="/inventory/stock-usage"
            style={{
              display: 'block',
              padding: '8px 0',
              color: selectedKey === '/inventory/stock-usage' ? '#1e295f' : '#333',
              fontWeight: selectedKey === '/inventory/stock-usage' ? 'bold' : 500,
              textDecoration: 'none'
            }}
          >
            Stock Usage and Expiry Patterns
          </Link>
        </div>
      )}
    </div>
  );
};

export default SidebarMenu;
