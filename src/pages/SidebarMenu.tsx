import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  UserOutlined,
  DashboardOutlined,
  AppstoreOutlined,
  BarChartOutlined,
} from '@ant-design/icons';

const SidebarMenu: React.FC = () => {
  const location = useLocation();
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const toggleInventory = () => setInventoryOpen(!inventoryOpen);

  const selectedKey = location.pathname;

  const menuItemStyle = (path: string) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '14px 16px',
    color:
      selectedKey === path
        ? '#28c76f'
        : hoveredItem === path
        ? '#28c76f'
        : '#333',
    fontWeight: selectedKey === path ? 'bold' : 600,
    textDecoration: 'none',
    borderLeft:
      selectedKey === path || hoveredItem === path
        ? '4px solid #28c76f'
        : '4px solid transparent',
    backgroundColor:
      selectedKey === path || hoveredItem === path ? '#f5fff9' : 'transparent',
    transition: 'all 0.2s ease',
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        backgroundColor: 'white',
        borderRight: '1px solid #e0e0e0',
        paddingTop: '1px',
      }}
    >
      <div
        style={{
          padding: '16px 20px 8px',
          fontWeight: 'bold',
          fontSize: '25px',
          color: '#111',
        }}
      >
        Menu
      </div>

      <Link
        to="/dashboard"
        style={menuItemStyle('/dashboard')}
        onMouseEnter={() => setHoveredItem('/dashboard')}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <DashboardOutlined style={{ marginRight: 8 }} />
        Dashboard
      </Link>

      <Link
        to="/reports"
        style={menuItemStyle('/reports')}
        onMouseEnter={() => setHoveredItem('/reports')}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <BarChartOutlined style={{ marginRight: 8 }} />
        Reports
      </Link>

      <Link
        to="/applications"
        style={menuItemStyle('/applications')}
        onMouseEnter={() => setHoveredItem('/applications')}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <AppstoreOutlined style={{ marginRight: 8 }} />
        Applications
      </Link>

      <div
        onClick={toggleInventory}
        style={{
          color: '#000',
          fontWeight: 'bold',
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        <UserOutlined style={{ marginRight: 8 }} />
        Manage Inventory 
        <span style={{ marginLeft: 'auto', fontSize: 18 }}>
          {inventoryOpen ? '–' : '+'}
        </span>
      </div>

      {inventoryOpen && (
        <div style={{ padding: '8px 16px', fontWeight: 600 }}>
          <Link
            to="/inventory/categories"
            style={{
              ...menuItemStyle('/inventory/categories'),
              padding: '8px 12px',
              fontSize: '14px'
            }}
            onMouseEnter={() => setHoveredItem('/inventory/categories')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            Manage Categories
          </Link>

          <Link
            to="/inventory/items"
            style={{
              ...menuItemStyle('/inventory/items'),
              padding: '8px 12px',
              fontSize: '14px'
            }}
            onMouseEnter={() => setHoveredItem('/inventory/items')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            Manage Items
          </Link>

          <Link
            to="/inventory"
            style={{
              ...menuItemStyle('/inventory'),
              padding: '8px 12px',
              fontSize: '14px'
            }}
            onMouseEnter={() => setHoveredItem('/inventory')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            Inventory Management Report
          </Link>

          <Link
            to="/inventory/stock-usage"
            style={{
              ...menuItemStyle('/inventory/stock-usage'),
              padding: '8px 12px',
              fontSize: '14px'
            }}
            onMouseEnter={() => setHoveredItem('/inventory/stock-usage')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            Stock Usage and Expiry Patterns
          </Link>

          <Link
            to="/inventory/maintenance"
            style={{
              ...menuItemStyle('/inventory/maintenance'),
              padding: '8px 12px',
              fontSize: '14px'
            }}
            onMouseEnter={() => setHoveredItem('/inventory/maintenance')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            Maintenance Inventory
          </Link>
        </div>
      )}
    </div>
  );
};

export default SidebarMenu;
