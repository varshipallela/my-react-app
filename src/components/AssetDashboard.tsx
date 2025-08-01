
// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";
// import type { LegendProps } from "recharts";

// import "../App.css";

// interface Asset {
//   name: string;
//   category: string;
//   status: string;
//   value: string;
//   location: string;
// }

// interface ChartData {
//   name: string;
//   value: number;
// }

// const data = {
//   totalAssets: 350,
//   allocated: 250,
//   maintenance: 25,
//   unknown: 5,
//   assets: [
//     {
//       name: "Laptop ABC123",
//       category: "Laptops",
//       status: "Allocated",
//       value: "$1200",
//       location: "New York",
//     },
//     {
//       name: "Office Chair B",
//       category: "Furniture",
//       status: "In Maintenance",
//       value: "$150",
//       location: "San Angeles",
//     },
//     {
//       name: "Printer XYZ789",
//       category: "Machinery",
//       status: "Allocated",
//       value: "$500",
//       location: "Chicago",
//     },
//     {
//       name: "Projector LMN456",
//       category: "Others",
//       status: "Status Unknown",
//       value: "$800",
//       location: "Austin",
//     },
//   ] as Asset[],
//   pieChart: [
//     { name: "Laptops", value: 60 },
//     { name: "Furniture", value: 20 },
//     { name: "Machinery", value: 10 },
//     { name: "Others", value: 10 },
//   ] as ChartData[],
//   lineChart: [
//     { name: "Jan", value: 100 },
//     { name: "Feb", value: 200 },
//     { name: "Mar", value: 300 },
//     { name: "Apr", value: 300 },
//     { name: "May", value: 400 },
//   ] as ChartData[],
// };

// const COLORS = ["#4F86F7", "#7DAFFF", "#AFCFFF", "#D3E3FC"];

// // ✅ Updated renderCustomLegend function with safe types
// const renderCustomLegend = (props: LegendProps) => {
//   const { payload } = props as LegendProps;

//   if (!payload) return null;

//   return (
//     <ul style={{ listStyle: "none", padding: 0 }}>
//       {payload.map((entry: any, index: number) => (
//         <li
//           key={`item-${index}`}
//           style={{
//             color: "black",
//             fontWeight: "bold",
//             fontSize: "20px",
//             marginBottom: "8px",
//             display: "flex",
//             alignItems: "center",
//             marginLeft: "-90px",
//           }}
//         >
//           <span
//             style={{
//               display: "inline-block",
//               marginRight: "10px",
//               width: "12px",
//               height: "12px",
//               borderRadius: "50%",
//               backgroundColor: entry.color,
//             }}
//           />
//           {entry.value}
//         </li>
//       ))}
//     </ul>
//   );
// };

// const AssetDashboard: React.FC = () => {
//   return (
//     <div className="dashboard-container">
//       {/* Stats Cards */}
//       <div className="stats-cards">
//         <div className="info-card">
//           <div className="title">Total Assets</div>
//           <div className="value">{data.totalAssets}</div>
//         </div>
//         <div className="info-card">
//           <div className="title">Allocated</div>
//           <div className="value">{data.allocated}</div>
//         </div>
//         <div className="info-card">
//           <div className="title">In Maintenance</div>
//           <div className="value">{data.maintenance}</div>
//         </div>
//         <div className="info-card">
//           <div className="title">Status Unknown</div>
//           <div className="value">{data.unknown}</div>
//         </div>
//       </div>

//       {/* Charts Row */}
//       <div className="charts-row">
//         <div className="chart-box">
//           <h3>Assets by Category</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={data.pieChart}
//                 dataKey="value"
//                 nameKey="name"
//                 cx="40%"
//                 cy="50%"
//                 outerRadius={90}
//                 label={false}
//               >
//                 {data.pieChart.map((_, index) => (
//                   <Cell
//                     key={`cell-${index}`}
//                     fill={COLORS[index % COLORS.length]}
//                   />
//                 ))}
//               </Pie>
//               <Legend
//                 layout="vertical"
//                 align="right"
//                 verticalAlign="middle"
//                 iconType="circle"
//                 content={renderCustomLegend}
//               />
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="chart-box">
//           <h3>Asset Value Over Time</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={data.lineChart}>
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Line
//                 type="monotone"
//                 dataKey="value"
//                 stroke="#4F86F7"
//                 strokeWidth={3}
//                 dot={false}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Asset Table */}
//       <div className="table-card">
//         <div className="asset-table-header">
//           <h3>Asset List</h3>
//           <Link to="/assets" className="view-all">
//             View All
//           </Link>
//         </div>
//         <table className="asset-table">
//           <thead>
//             <tr>
//               <th>Asset Name</th>
//               <th>Category</th>
//               <th>Status</th>
//               <th>Value</th>
//               <th>Location</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.assets.map((item, idx) => (
//               <tr key={idx}>
//                 <td>{item.name}</td>
//                 <td>{item.category}</td>
//                 <td>{item.status}</td>
//                 <td>{item.value}</td>
//                 <td>{item.location}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AssetDashboard;
