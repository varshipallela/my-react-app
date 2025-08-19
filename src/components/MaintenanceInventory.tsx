import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Popconfirm,
  Typography,
  Row,
  Col,
  Card
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ToolOutlined,
  AppstoreOutlined,
  CheckCircleOutlined,
  SettingOutlined,
  WarningOutlined,
  SearchOutlined
} from "@ant-design/icons";

interface MaintenanceItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  status: string;
}

const { Title } = Typography;
const { Option } = Select;

const MaintenanceInventory: React.FC = () => {
  const [data, setData] = useState<MaintenanceItem[]>([
    { id: 1, name: "Wrench Set", category: "Tools", quantity: 5, status: "Available" },
    { id: 2, name: "Oil Can", category: "Consumables", quantity: 12, status: "Available" },
    { id: 3, name: "Drill Machine", category: "Equipment", quantity: 2, status: "Under Repair" },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<MaintenanceItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [form] = Form.useForm();

  const handleAdd = () => {
    setEditingItem(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: MaintenanceItem) => {
    setEditingItem(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    setData(prev => prev.filter(item => item.id !== id));
  };

  const handleSave = () => {
    form.validateFields().then(values => {
      if (editingItem) {
        setData(prev =>
          prev.map(item =>
            item.id === editingItem.id ? { ...item, ...values } : item
          )
        );
      } else {
        const newItem: MaintenanceItem = {
          id: Date.now(),
          ...values,
        };
        setData(prev => [...prev, newItem]);
      }
      setIsModalVisible(false);
    });
  };

  const filteredData = data.filter(
    item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { title: "Item Name", dataIndex: "name", key: "name" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: MaintenanceItem) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm title="Are you sure?" onConfirm={() => handleDelete(record.id)}>
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 16, width: "1200px"}}>
      {/* Header */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={2} style={{ margin: 0 }}>
            <ToolOutlined /> Maintenance Inventory
          </Title>
        </Col>
        <Col>
          {/* <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} size="large" >
            Add Item
          </Button> */}
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row gutter={12} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Card
            style={{
              background: "linear-gradient(135deg, #2c3e50, #4ca1af)",
              color: "white",
              height: 120,
              borderRadius: 8
            }}
            bodyStyle={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px"
            }}
          >
            <AppstoreOutlined style={{ fontSize: 24, marginBottom: 4 }} />
            <div style={{ fontSize: 12, fontWeight: "bold" }}>Total Items</div>
            <div style={{ fontSize: 24, fontWeight: "bold" }}>{data.length}</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            style={{
              background: "linear-gradient(135deg, #1d976c, #93f9b9)",
              color: "white",
              height: 120,
              borderRadius: 8
            }}
            bodyStyle={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px"
            }}
          >
            <CheckCircleOutlined style={{ fontSize: 24, marginBottom: 4 }} />
            <div style={{ fontSize: 12, fontWeight: "bold" }}>Available</div>
            <div style={{ fontSize: 24, fontWeight: "bold" }}>
              {data.filter(item => item.status === "Available").length}
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            style={{
              background: "linear-gradient(135deg, #42275a, #734b6d)",
              color: "white",
              height: 120,
              borderRadius: 8
            }}
            bodyStyle={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px"
            }}
          >
            <SettingOutlined style={{ fontSize: 24, marginBottom: 4 }} />
            <div style={{ fontSize: 12, fontWeight: "bold" }}>Under Repair</div>
            <div style={{ fontSize: 24, fontWeight: "bold" }}>
              {data.filter(item => item.status === "Under Repair").length}
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            style={{
              background: "linear-gradient(135deg, #ff512f, #dd2476)",
              color: "white",
              height: 120,
              borderRadius: 8
            }}
            bodyStyle={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px"
            }}
          >
            <WarningOutlined style={{ fontSize: 24, marginBottom: 4 }} />
            <div style={{ fontSize: 12, fontWeight: "bold" }}>Low Stock</div>
            <div style={{ fontSize: 24, fontWeight: "bold" }}>
              {data.filter(item => item.quantity < 5).length}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Search Bar */}
      {/* <Row style={{ marginBottom: 20 }}> */}
                  {/* <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>

        <Col>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search by Item Name or Category"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ width: 300 }}
          />
           <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} size="large" >
            Add Item
          </Button>
        </Col>
      </Row> */}
      <Row gutter={12} style={{ marginBottom: 16 }}>
  {/* Search Bar */}
  <Col flex="auto">
    <Input
      prefix={<SearchOutlined />}
      placeholder="Search by Item Name or Category"
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
    />
  </Col>

  {/* Add Item Button */}
  <Col>
    <Button
      type="primary"
      icon={<PlusOutlined />}
      onClick={handleAdd}
      size="large"
    >
      Add Item
    </Button>
  </Col>
</Row>

      {/* </Row> */}
         

      {/* Table */}
      <Table 
        columns={columns} 
        dataSource={filteredData} 
        rowKey="id" 
        size="small"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
      />

      {/* Add/Edit Modal */}
      <Modal
        title={editingItem ? "Edit Item" : "Add Item"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSave}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Item Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true }]}>
            <Select>
              <Option value="Tools">Tools</Option>
              <Option value="Equipment">Equipment</Option>
              <Option value="Consumables">Consumables</Option>
            </Select>
          </Form.Item>
          <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select>
              <Option value="Available">Available</Option>
              <Option value="Under Repair">Under Repair</Option>
              <Option value="Out of Stock">Out of Stock</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MaintenanceInventory;
