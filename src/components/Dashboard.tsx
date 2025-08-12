
import React from "react";
import { Layout, Card as AntCard, Row, Col, Typography } from "antd";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import WorldMapComponent from "./WorldMapComponent";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

const { Content } = Layout;
const { Text } = Typography;

const Dashboard: React.FC = () => {
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Predictive Maintenance",
        data: [120, 200, 150, 80, 70, 110],
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const occupancyData = {
    labels: ["Occupied", "Vacant"],
    datasets: [
      {
        data: [57, 43],
        backgroundColor: ["#3b82f6", "#1f2937"],
        borderColor: "#111827",
      },
    ],
  };

  const occupancyValue = occupancyData.datasets[0]?.data[0] ?? 0;

  const barData = {
    labels: ["HVAC", "Elevator", "Water Leak", "Lighting", "Fault Detection"],
    datasets: [
      {
        label: "Anomalies",
        data: [0, 5, 6, 8, 3],
        backgroundColor: "#3b82f6",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: "#9ca3af" } },
      y: { ticks: { color: "#9ca3af" } },
    },
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#0d1117", minWidth: "1230px" }}>
      <div style={{ padding: "16px 24px", fontSize: "24px", fontWeight: "bold", backgroundColor: "#001529", color: "#fff" }}>
        Smart Facility Dashboard
      </div>

      <Content style={{ padding: "0" }}>
        <div style={{ maxWidth: "100%", padding: "16px 24px", margin: "0 auto" }}>
          {/* Top Info Cards */}
          <Row gutter={12}>
            <Col xs={24} sm={12} md={6}><InfoCard title="Occupancy Forecasting" value="84%" /></Col>
            <Col xs={24} sm={12} md={6}><InfoCard title="Assets Under Monitoring" value="1,250" /></Col>
            <Col xs={24} sm={12} md={6}><InfoCard title="Active Alerts" value="⚠️ 14" /></Col>
            <Col xs={24} sm={12} md={6}><InfoCard title="Energy Usage" value="⚡ 126 kWh" /></Col>
          </Row>

          {/* Sensor Data + Predictive Maintenance + Smart Energy + Fault Detection */}
          <Row gutter={12} style={{ marginTop: 12 }}>
            {/* Left Large Card */}
            <Col xs={24} md={10}>
              <AntCard title={<span style={{ fontWeight: "bold", color: "#fff" }}>Global Network Monitor</span>} bordered={false} style={mapCardStyle}>
                <p style={{ color: "#fff" }}>Temperature: 72°F</p>
                <p style={{ color: "#fff" }}>Humidity: 45%</p>
                <p style={{ color: "#fff" }}>Occupancy: 57%</p>
                <div style={{ height: "260px", borderRadius: "8px", overflow: "hidden", position: "relative" }}>
                  <WorldMapComponent
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "8px"
                    }}
                  />
                </div>
              </AntCard>
            </Col>

            {/* Right Side Column with 3 stacked */}
            <Col xs={24} md={14}>
              <Row gutter={[12, 12]}>
                <Col xs={24} lg={12}>
                  <AntCard title={<span style={{ fontWeight: "bold", color: "#fff" }}>Predictive Maintenance</span>} bordered={false} style={cardStyle}>
                    <Line data={lineData} options={chartOptions} />
                  </AntCard>
                </Col>
                <Col xs={24} lg={12}>
                  <AntCard bordered={false} style={cardStyle}>
                    <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>Smart Energy Optimization</Text>
                    <div style={{ marginTop: 16, textAlign: "center" }}>
                      <svg width="100%" height="100" viewBox="0 0 200 100">
                        <defs>
                          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#00BFFF" />
                            <stop offset="50%" stopColor="#1DE9B6" />
                            <stop offset="100%" stopColor="#333" />
                          </linearGradient>
                        </defs>
                        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="url(#gaugeGradient)" strokeWidth="14" />
                        <line x1="100" y1="100" x2="135" y2="60" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
                        <circle cx="100" cy="100" r="6" fill="#fff" />
                      </svg>
                      <div style={{ display: "flex", justifyContent: "space-between", color: "#ccc", marginTop: 4 }}>
                        <Text>Low</Text>
                        <Text>Efficient</Text>
                        <Text>High</Text>
                      </div>
                    </div>
                  </AntCard>
                </Col>
                <Col xs={24}>
                  <AntCard bordered={false} style={cardStyle}>
                    <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>Fault Detection</Text>
                    <ul style={{ marginTop: 16, paddingLeft: 20, color: "#fff", lineHeight: 2 }}>
                      <li><span style={{ color: "#FF6B6B" }}>■</span> HVAC</li>
                      <li><span style={{ color: "#FF9F1C" }}>■</span> Elevators</li>
                      <li><span style={{ color: "#4ECDC4" }}>■</span> Water Leakage</li>
                      <li><span style={{ color: "#FFE66D" }}>■</span> Lighting</li>
                    </ul>
                  </AntCard>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Bottom Cards */}
          <Row gutter={12} style={{ marginTop: 12 }}>
            <Col xs={24} md={6}>
              <AntCard bordered={false} style={cardStyle}>
                <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>Space Utilization</Text>
                <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <Text style={{ color: "#9ca3af", fontSize: 14 }}>Temperature</Text>
                    <div style={{ fontSize: 24, color: "#fff", fontWeight: "bold" }}>76%</div>
                  </div>
                  <div style={{ width: 80, height: 50 }}>
                    <Bar
                      data={{
                        labels: ["A", "B", "C"],
                        datasets: [{ data: [30, 50, 76], backgroundColor: "#3b82f6", barThickness: 8 }],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { display: false }, tooltip: { enabled: false } },
                        scales: { x: { display: false }, y: { display: false } },
                      }}
                    />
                  </div>
                </div>
                <div style={{ marginTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <Text style={{ color: "#9ca3af", fontSize: 14 }}>Occupancy</Text>
                    <div style={{ fontSize: 24, color: "#fff", fontWeight: "bold" }}>57%</div>
                  </div>
                  <div style={{ width: 60 }}>
                    <Doughnut
                      data={{
                        labels: ["Occupied", "Vacant"],
                        datasets: [{ data: [57, 43], backgroundColor: ["#3b82f6", "#1f2937"], borderWidth: 0 }],
                      }}
                      options={{
                        cutout: "70%",
                        plugins: { legend: { display: false }, tooltip: { enabled: false } },
                      }}
                    />
                  </div>
                </div>
              </AntCard>
            </Col>

            <Col xs={24} md={6}>
              <AntCard bordered={false} style={cardStyle}>
                <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>Space Utilization</Text>
                <div style={{
                  marginTop: 16, backgroundColor: "#1f2937", borderRadius: 8, padding: 16,
                  display: "flex", alignItems: "center", justifyContent: "center", height: 150,
                }}>
                  <svg width="92" height="92" viewBox="0 0 100 100" fill="none">
                    <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
                      fill="#10b981" stroke="#ffffff" strokeWidth="4" />
                  </svg>
                  <Text style={{ fontSize: 24, color: "#ffffff", fontWeight: "bold", marginLeft: 12 }}>76%</Text>
                </div>
              </AntCard>
            </Col>

            <Col xs={24} md={6}>
              <AntCard bordered={false} style={cardStyle}>
                <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>Anomaly Detection</Text>
                <div style={{ marginTop: 16 }}>
                  {["HVAC", "Elevator", "Water Leak", "Lighting"].map((label, i) => (
                    <div key={i} style={{ color: "#fff", fontSize: 14, marginBottom: 8 }}>
                      <span style={{ width: 10, height: 10, backgroundColor: "#ef4444", display: "inline-block", borderRadius: 2, marginRight: 8 }} />
                      {label}
                    </div>
                  ))}
                </div>
              </AntCard>
            </Col>

            <Col xs={24} md={6}>
              <AntCard bordered={false} style={cardStyle}>
                <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>Anomaly Detection</Text>
                <Bar
                  data={{
                    labels: ["0", "5", "A", "6", "8"],
                    datasets: [{ label: "Anomaly", data: [40, 60, 90, 45, 30], backgroundColor: "#3b82f6" }],
                  }}
                  options={chartOptions}
                />
              </AntCard>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

const InfoCard = ({ title, value }: { title: string; value: string }) => (
  <AntCard bordered={false} style={cardStyle}>
    <Text style={{ fontSize: 18, fontWeight: "bold", color: "#9ca3af" }}>{title}</Text>
    <Text style={{ fontSize: 24, fontWeight: "bold", color: "#fff", display: "block", marginTop: 8 }}>{value}</Text>
  </AntCard>
);

const cardStyle: React.CSSProperties = {
  background: "#161b22",
  borderRadius: 12,
  boxShadow: "0 2px 8px rgba(0,0,0,0.45)",
  color: "#ffffff",
  height: "100%",
};

// Map card style to complement the golden theme
const mapCardStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #1a1a1a, #2d2d2d)",
  borderRadius: 12,
  boxShadow: "0 2px 8px rgba(212,175,55,0.2)",
  border: "1px solid rgba(212,175,55,0.1)",
  color: "#ffffff",
  height: "100%",
};

export default Dashboard;
