
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

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import SidebarLayout from './pages/SidebarLayout';
// import InventoryStockUsage from './components/InventoryStockUsage';
// import InventoryDashboard from './components/InventoryDashboard';
// import LoginPage from './components/loginPage';
// import './App.css';

// const App: React.FC = () => (
//   <Router>
//     <Routes>
//       <Route path="/" element={<Navigate to="/inventory" replace />} />
      
//       <Route path="/" element={<SidebarLayout />}>
//         <Route path="inventory" element={<InventoryDashboard />} />
//         <Route path="inventory/stock-usage" element={<InventoryStockUsage />} />
//       </Route>
//     </Routes>
//   </Router>
// );

// export default App;
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import SidebarLayout from './pages/SidebarLayout';
// import InventoryStockUsage from './components/InventoryStockUsage';
// import InventoryDashboard from './components/InventoryDashboard';
// import Dashboard from './components/Dashboard';
// import LoginPage from './components/LoginPage';
// // import Header from './pages/Header';
// import './App.css';

// const App: React.FC = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <Router>
//       <Routes>
//         {!isLoggedIn ? (
          
//           <Route path="*" element={<LoginPageWrapper onLogin={() => setIsLoggedIn(true)} />} />
//         ) : (
//           <>
//             {/* Redirect root to /inventory */}
//             <Route path="/" element={<Navigate to="/inventory" replace />} />
            
//             {/* Sidebar with nested pages */}
//             <Route path="/" element={<SidebarLayout />}>
//               <Route path="inventory" element={<InventoryDashboard />} />
//               <Route path="inventory/stock-usage" element={<InventoryStockUsage />} />
//             </Route>
//           </>
//         )}
//       </Routes>
//     </Router>
//   );
// };

// // Wrapper to pass onLogin to LoginPage
// const LoginPageWrapper: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
//   const [formSubmitted, setFormSubmitted] = useState(false);

//   // When login form submits successfully, call onLogin and mark form submitted
//   if (formSubmitted) {
//     onLogin();
//     return <Navigate to="/inventory" replace />;
//   }

//   return <LoginPage onLogin={() => setFormSubmitted(true)} />;
// };

// export default App;
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import SidebarLayout from './pages/SidebarLayout';
// import InventoryStockUsage from './components/InventoryStockUsage';
// import InventoryDashboard from './components/InventoryDashboard';
// import Dashboard from './components/Dashboard';
// import LoginPage from './components/LoginPage';
// import './App.css';

// const App: React.FC = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <Router>
//       <Routes>
//         {!isLoggedIn ? (
//           <Route path="*" element={<LoginPageWrapper onLogin={() => setIsLoggedIn(true)} />} />
//         ) : (
//           <>
//             {/* Redirect root to dashboard */}
//             <Route path="/" element={<Navigate to="/dashboard" replace />} />

//             {/* Sidebar with nested routes */}
//             <Route path="/" element={<SidebarLayout />}>
//               <Route path="dashboard" element={<Dashboard />} />
//               <Route path="inventory" element={<InventoryDashboard />} />
//               <Route path="inventory/stock-usage" element={<InventoryStockUsage />} />
//             </Route>
//           </>
//         )}
//       </Routes>
//     </Router>
//   );
// };

// // Wrapper to handle login redirection
// const LoginPageWrapper: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
//   const [formSubmitted, setFormSubmitted] = useState(false);

//   if (formSubmitted) {
//     onLogin();
//     return <Navigate to="/dashboard" replace />;
//   }

//   return <LoginPage onLogin={() => setFormSubmitted(true)} />;
// };

// export default App;
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SidebarLayout from './pages/SidebarLayout';
import InventoryStockUsage from './components/InventoryStockUsage';
import InventoryDashboard from './components/InventoryDashboard';
import MaintenanceInventory from './components/MaintenanceInventory';
import ManageCategories from './components/ManageCategories';
import ManageItems from './components/ManageItems';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import './App.css';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        {!isLoggedIn ? (
          <Route path="*" element={<LoginPageWrapper onLogin={() => setIsLoggedIn(true)} />} />
        ) : (
          <>
            {/* Redirect root to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Sidebar with nested routes */}
            <Route path="/" element={<SidebarLayout />}>
              <Route path="dashboard" element={<Dashboard />} />

              {/* Inventory pages */}
              <Route path="inventory/categories" element={<ManageCategories />} />
              <Route path="inventory/items" element={<ManageItems />} />
              <Route path="inventory" element={<InventoryDashboard />} />
              <Route path="inventory/stock-usage" element={<InventoryStockUsage />} />
              <Route path="inventory/maintenance" element={<MaintenanceInventory />} />
            </Route>
          </>
        )}
      </Routes>
    </Router>
  );
};

// Wrapper to handle login redirection
const LoginPageWrapper: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  if (formSubmitted) {
    onLogin();
    return <Navigate to="/dashboard" replace />;
  }

  return <LoginPage onLogin={() => setFormSubmitted(true)} />;
};

export default App;
