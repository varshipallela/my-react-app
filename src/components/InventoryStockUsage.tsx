import React from 'react';
import { Layout, Typography, Table, Card, Row, Col } from 'antd';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, Cell,
} from 'recharts';

const { Title } = Typography;
const { Content } = Layout;

const usageTrendData = [
  { date: 'Jun 24', value: 3 },
  { date: 'Jul 1', value: 5 },
  { date: 'Jul 11', value: 7 },
  { date: 'Jul 17', value: 10 },
  { date: 'Jul 23', value: 6 },
];

const consumedItemsData = [
  { name: 'Gloves', value: 10 },
  { name: 'Sanitizer', value: 7 },
  { name: 'Cleaning Supplies', value: 5 },
  { name: 'Air Filters', value: 3 },
];

const expiryRiskData = [
  { label: '0–15 Days', value: 680, color: '#f44336' },
  { label: '16–30 Days', value: 460, color: '#ff9800' },
  { label: '31+ Days', value: 280, color: '#4caf50' },
];

const expiringItemsColumns = [
  { title: 'Item', dataIndex: 'item', key: 'item' },
  { title: 'Batch ID', dataIndex: 'batchId', key: 'batchId' },
  { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
  { title: 'Expiry Date', dataIndex: 'expiryDate', key: 'expiryDate' },
  { title: 'Days Left', dataIndex: 'daysLeft', key: 'daysLeft' },
];

const expiringItemsData = [
  { key: '1', item: 'Sanitizer', batchId: 'B123', quantity: 30, expiryDate: 'Aug. 1, 2025', daysLeft: 17 },
  { key: '2', item: 'Gloves', batchId: 'G567', quantity: 50, expiryDate: 'Sept. 15, 2025', daysLeft: 62 },
  { key: '3', item: 'Cleaning Solution', batchId: 'C980', quantity: 20, expiryDate: 'July 25, 2025', daysLeft: 10 },
];

const InventoryStockUsage: React.FC = () => {
  return (
      <Content>
        <Title level={2}>Stock Usage & Expiry Patterns</Title>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card title="Usage Trend" bordered>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={usageTrendData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#1890ff" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card title="Top Consumed Items" bordered>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart layout="vertical" data={consumedItemsData}>
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#1e3a8a" barSize={25} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card title="Expiry Risk" bordered>
              <ResponsiveContainer width="80%" height={250}>
                <BarChart data={expiryRiskData}>
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value">
                    {expiryRiskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card title="Expiring Items" bordered>
              <Table
                columns={expiringItemsColumns}
                dataSource={expiringItemsData}
                pagination={{ pageSize: 2 }}
                size="middle"
              />
            </Card>
          </Col>
        </Row>
      </Content>
  );
};

export default InventoryStockUsage;
