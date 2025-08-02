
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // import AssetDashboard from './components/AssetDashboard';
// import InventoryStockUsage from './components/InventoryStockUsage';
// import InventoryDashboard from './components/InventoryDashboard';
// import './App.css';

// const App: React.FC = () => (
//   <Router>
//     <Routes>
//       <Route path="/" element={<Navigate to="/dashboard" replace />} />
//       {/* <Route path="/dashboard" element={<AssetDashboard />} /> */}
//       <Route path="/inventory" element={<InventoryDashboard />} />
//       <Route path="/inventory/stock-usage" element={<InventoryStockUsage />} /> {/* ✅ Fixed closing tag */}
//     </Routes>
//   </Router>
// );

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SidebarLayout from './pages/SidebarLayout';
import InventoryStockUsage from './components/InventoryStockUsage';
import InventoryDashboard from './components/InventoryDashboard';
import './App.css';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/inventory" replace />} />
      
      <Route path="/" element={<SidebarLayout />}>
        <Route path="inventory" element={<InventoryDashboard />} />
        <Route path="inventory/stock-usage" element={<InventoryStockUsage />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import SidebarLayout from './pages/SidebarLayout';
// import InventoryStockUsage from './components/InventoryStockUsage';
// import InventoryDashboard from './components/InventoryDashboard';
// import './App.css';

// const App: React.FC = () => (
//   <Router>
//     <Routes>
//       <Route path="/" element={<SidebarLayout />}>
//         <Route index element={<Navigate to="inventory" replace />} />
//         <Route path="inventory" element={<InventoryDashboard />} />
//         <Route path="inventory/stock-usage" element={<InventoryStockUsage />} />
//       </Route>
//     </Routes>
//   </Router>
// );

// export default App;
