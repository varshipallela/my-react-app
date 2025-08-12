import React from "react";
import {
  Row,
  Col,
  Table,
  Card,
  Progress,
  // Typography
} from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";


const weeklyUsageData = [
  { name: "OC-12 Multipurpose", value: 75 },
  { name: "Red Velvet Aroma", value: 55 },
  { name: "Ultra Klean", value: 45 },
  { name: "Carpet Cleaners", value: 28 }
];

const monthlyTrendData = [
  { month: "Jan", value: 110 },
  { month: "Feb", value: 80 },
  { month: "Mar", value: 105 },
  { month: "Apr", value: 95 },
  { month: "May", value: 60 },
  { month: "Jun", value: 50 }
];

const contributionData = [
  { name: "Ultra Klean", value: 29.8 },
  { name: "OC-12 Multipurpose", value: 29.6 },
  { name: "Red Velvet Aroma", value: 14.6 },
  { name: "Carpet Cleaners", value: 6.6 },
  { name: "Others", value: 37.6 }
];

const reorderThresholds = [
  { name: "Ultra Klean", percent: 90 },
  { name: "OC-12 Multipurpose", percent: 70 },
  { name: "Red Velvet Aroma", percent: 60 },
  { name: "Carpet Cleaners", percent: 40 }
];

const stockData = [
  {
    key: "1",
    category: "Ultra Klean",
    unit: "Liters",
    opening: 150,
    weekly: 35,
    monthly: 140,
    remaining: 10,
    reordered: 55
  },
  {
    key: "2",
    category: "OC-12 Multipurpose",
    unit: "Liters",
    opening: 60,
    weekly: 8,
    monthly: 32,
    remaining: 28,
    reordered: 28
  },
  {
    key: "3",
    category: "HRT Roles",
    unit: "Nos",
    opening: 500,
    weekly: 65,
    monthly: 280,
    remaining: 120,
    reordered: 20
  },
  {
    key: "4",
    category: "Red Velvet Aroma",
    unit: "Liters",
    opening: 100,
    weekly: 20,
    monthly: 90,
    remaining: 10,
    reordered: 20
  },
  {
    key: "5",
    category: "Carpet Cleaners",
    unit: "Nos",
    opening: 80,
    weekly: 15,
    monthly: 60,
    remaining: 20,
    reordered: 25
  }
];

const InventoryDashboard: React.FC = () => {
  const pieColors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  const columns = [
    { title: "Open Category", dataIndex: "category", key: "category" },
    { title: "Unit", dataIndex: "unit", key: "unit" },
    { title: "Opening Stock", dataIndex: "opening", key: "opening" },
    { title: "ByWeekly Usage", dataIndex: "weekly", key: "weekly" },
    { title: "Monthly Usage", dataIndex: "monthly", key: "monthly" },
    { title: "Remaining Stock", dataIndex: "remaining", key: "remaining" },
    { title: "Re-ordered", dataIndex: "reordered", key: "reordered" }
  ];

  return (
    
    <div style={{ padding: 24 }}>
  <Row gutter={[16, 16]}>
    <Col span={12}>
      <Card title="Weekly Usage by Item Category">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={weeklyUsageData}
            margin={{ top: 20, right: 20, bottom: 50, left: 20 }}
              style={{ background: "none" }}
          >
            <XAxis
              dataKey="name"
              interval={0}
              angle={-20}
              textAnchor="end"
              tickLine={false}
              height={60}
              tick={{ fontSize: 12 }}
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#1890ff" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </Col>
 


        <Col span={12}>
          <Card title="Monthly Consumption Trend">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyTrendData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#1890ff" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Stock Levels vs Reorder Thresholds">
            {reorderThresholds.map((item) => (
              <div key={item.name} style={{ marginBottom: 12 }}>
                <div style={{ marginBottom: 4 }}>{item.name}</div>
                <Progress
                  percent={item.percent}
                  status="active"
                  strokeColor={{ from: "#ff4d4f", to: "#faad14" }}
                />
              </div>
            ))}
          </Card>
        </Col>

        <Col span={12}>
          <Card title="% Contribution by Item Category">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={contributionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {contributionData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col span={24}>
          <Card title="Inventory Table">
            <Table columns={columns} dataSource={stockData} pagination={false} />
          </Card>
        </Col>
      </Row>
    // </div>
  );
};

export default InventoryDashboard;
