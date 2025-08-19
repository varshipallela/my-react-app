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
  Card,
  Tag,
  message,
  InputNumber
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  InboxOutlined,
  SearchOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined
} from "@ant-design/icons";

interface Item {
  id: number;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minStock: number;
  maxStock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  description: string;
}

const { Title } = Typography;
const { Option } = Select;

const ManageItems: React.FC = () => {
  const [data, setData] = useState<Item[]>([
    { 
      id: 1, 
      name: "Ultra Klean", 
      category: "Cleaning Supplies", 
      quantity: 25, 
      unit: "Liters", 
      minStock: 10, 
      maxStock: 100, 
      status: "In Stock",
      description: "Multi-purpose cleaning solution"
    },
    { 
      id: 2, 
      name: "Wrench Set", 
      category: "Tools", 
      quantity: 5, 
      unit: "Sets", 
      minStock: 3, 
      maxStock: 15, 
      status: "Low Stock",
      description: "Professional wrench set for maintenance"
    },
    { 
      id: 3, 
      name: "Oil Can", 
      category: "Consumables", 
      quantity: 0, 
      unit: "Pieces", 
      minStock: 5, 
      maxStock: 50, 
      status: "Out of Stock",
      description: "Lubricating oil for machinery"
    },
    { 
      id: 4, 
      name: "Drill Machine", 
      category: "Equipment", 
      quantity: 8, 
      unit: "Units", 
      minStock: 2, 
      maxStock: 10, 
      status: "In Stock",
      description: "Heavy duty drill machine"
    },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [form] = Form.useForm();

  const categories = ["Cleaning Supplies", "Tools", "Equipment", "Consumables"];

  const getStatus = (quantity: number, minStock: number): Item['status'] => {
    if (quantity === 0) return 'Out of Stock';
    if (quantity <= minStock) return 'Low Stock';
    return 'In Stock';
  };

  const handleAdd = () => {
    setEditingItem(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: Item) => {
    setEditingItem(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    setData(prev => prev.filter(item => item.id !== id));
    message.success('Item deleted successfully');
  };

  const handleSave = () => {
    form.validateFields().then(values => {
      const status = getStatus(values.quantity, values.minStock);
      
      if (editingItem) {
        setData(prev =>
          prev.map(item =>
            item.id === editingItem.id ? { ...item, ...values, status } : item
          )
        );
        message.success('Item updated successfully');
      } else {
        const newItem: Item = {
          id: Date.now(),
          ...values,
          status,
        };
        setData(prev => [...prev, newItem]);
        message.success('Item added successfully');
      }
      setIsModalVisible(false);
    });
  };

  const filteredData = data.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || item.category === categoryFilter;
    const matchesStatus = !statusFilter || item.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'green';
      case 'Low Stock': return 'orange';
      case 'Out of Stock': return 'red';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'In Stock': return <CheckCircleOutlined />;
      case 'Low Stock': return <ExclamationCircleOutlined />;
      case 'Out of Stock': return <CloseCircleOutlined />;
      default: return null;
    }
  };

  const columns = [
    { 
      title: "Item Name", 
      dataIndex: "name", 
      key: "name",
      sorter: (a: Item, b: Item) => a.name.localeCompare(b.name),
    },
    { 
      title: "Category", 
      dataIndex: "category", 
      key: "category",
      filters: categories.map(cat => ({ text: cat, value: cat })),
      onFilter: (value: any, record: Item) => record.category === value,
    },
    { 
      title: "Quantity", 
      dataIndex: "quantity", 
      key: "quantity",
      sorter: (a: Item, b: Item) => a.quantity - b.quantity,
      render: (quantity: number, record: Item) => (
        <span>
          {quantity} {record.unit}
        </span>
      )
    },
    { 
      title: "Min/Max Stock", 
      key: "stockLimits",
      render: (_, record: Item) => (
        <span>
          {record.minStock} / {record.maxStock}
        </span>
      )
    },
    { 
      title: "Status", 
      dataIndex: "status", 
      key: "status",
      filters: [
        { text: 'In Stock', value: 'In Stock' },
        { text: 'Low Stock', value: 'Low Stock' },
        { text: 'Out of Stock', value: 'Out of Stock' },
      ],
      onFilter: (value: any, record: Item) => record.status === value,
      render: (status: string) => (
        <Tag color={getStatusColor(status)} icon={getStatusIcon(status)}>
          {status}
        </Tag>
      )
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_: any, record: Item) => (
        <Space size="small">
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
            size="small"
          />
          <Popconfirm 
            title="Are you sure you want to delete this item?" 
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button 
              type="text" 
              danger 
              icon={<DeleteOutlined />}
              size="small"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const inStockCount = data.filter(item => item.status === 'In Stock').length;
  const lowStockCount = data.filter(item => item.status === 'Low Stock').length;
  const outOfStockCount = data.filter(item => item.status === 'Out of Stock').length;

  return (
    <div style={{ padding: "16px", width: "1200px"}}>
      {/* Header */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={3} style={{ margin: 0, display: "flex", alignItems: "center" }}>
            <InboxOutlined style={{ marginRight: 8, color: "#1890ff" , fontWeight: "bold"}} />
            Manage Items
          </Title>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Card 
            size="small"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              borderRadius: 8
            }}
            bodyStyle={{ padding: "12px" }}
          >
            <div style={{ textAlign: "center" }}>
              <InboxOutlined style={{ fontSize: 35, marginBottom: 4 }} />
              <div style={{ fontSize: 25, fontWeight: "bold", opacity: 0.9 }}>Total Items</div>
              <div style={{ fontSize: 30, fontWeight: "bold" }}>{data.length}</div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card 
            size="small"
            style={{
              background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
              color: "white",
              borderRadius: 8
            }}
            bodyStyle={{ padding: "12px" }}
          >
            <div style={{ textAlign: "center" }}>
              <CheckCircleOutlined style={{ fontSize: 35, marginBottom: 4 }} />
              <div style={{ fontSize: 25, fontWeight: "bold", opacity: 0.9 }}>In Stock</div>
              <div style={{ fontSize: 30, fontWeight: "bold" }}>{inStockCount}</div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card 
            size="small"
            style={{
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              color: "white",
              borderRadius: 8
            }}
            bodyStyle={{ padding: "12px" }}
          >
            <div style={{ textAlign: "center" }}>
              <ExclamationCircleOutlined style={{ fontSize: 35, marginBottom: 4 }} />
              <div style={{ fontSize: 25, fontWeight: "bold", opacity: 0.9 }}>Low Stock</div>
              <div style={{ fontSize: 30, fontWeight: "bold" }}>{lowStockCount}</div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card 
            size="small"
            style={{
              background: "linear-gradient(135deg, orange 0%, gray 100%)",
              color: "white",
              borderRadius: 8
            }}
            bodyStyle={{ padding: "12px" }}
          >
            <div style={{ textAlign: "center" }}>
              <CloseCircleOutlined style={{ fontSize: 35, marginBottom: 4 }} />
              <div style={{ fontSize: 25, fontWeight: "bold", opacity: 0.9 }}>Out of Stock</div>
              <div style={{ fontSize: 30, fontWeight: "bold" }}>{outOfStockCount}</div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Filters and Search */}
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col flex="auto">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search items..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            allowClear
          />
        </Col>
        <Col>
          <Select
            placeholder="Filter by Category"
            value={categoryFilter  || undefined}
            onChange={setCategoryFilter}
            allowClear
            style={{ width: 200 }}
          >
            {categories.map(category => (
              <Option key={category} value={category}>{category}</Option>
            ))}
          </Select>
        </Col>
        <Col>
          <Select
            placeholder="Filter by Status"
            value={statusFilter  || undefined}
            onChange={setStatusFilter}
            allowClear
            style={{ width: 130 }}
          >
            <Option value="In Stock">In Stock</Option>
            <Option value="Low Stock">Low Stock</Option>
            <Option value="Out of Stock">Out of Stock</Option>
          </Select>
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            Add Item
          </Button>
        </Col>
      </Row>

      {/* Table */}
      <Card size="small" style={{ borderRadius: 8 }}>
        <Table 
          columns={columns} 
          dataSource={filteredData} 
          rowKey="id"
          size="small"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
        />
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        title={editingItem ? "Edit Item" : "Add Item"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSave}
        width={600}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item 
                name="name" 
                label="Item Name" 
                rules={[
                  { required: true, message: 'Please enter item name' },
                  { min: 2, message: 'Item name must be at least 2 characters' }
                ]}
              >
                <Input placeholder="Enter item name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item 
                name="category" 
                label="Category" 
                rules={[{ required: true, message: 'Please select category' }]}
              >
                <Select placeholder="Select category">
                  {categories.map(category => (
                    <Option key={category} value={category}>{category}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item 
                name="quantity" 
                label="Current Quantity" 
                rules={[{ required: true, message: 'Please enter quantity' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} placeholder="0" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item 
                name="minStock" 
                label="Min Stock Level" 
                rules={[{ required: true, message: 'Please enter min stock' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} placeholder="0" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item 
                name="maxStock" 
                label="Max Stock Level" 
                rules={[{ required: true, message: 'Please enter max stock' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} placeholder="0" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item 
            name="unit" 
            label="Unit of Measurement" 
            rules={[{ required: true, message: 'Please enter unit' }]}
          >
            <Select placeholder="Select unit">
              <Option value="Pieces">Pieces</Option>
              <Option value="Liters">Liters</Option>
              <Option value="Kilograms">Kilograms</Option>
              <Option value="Sets">Sets</Option>
              <Option value="Units">Units</Option>
              <Option value="Boxes">Boxes</Option>
            </Select>
          </Form.Item>

          <Form.Item 
            name="description" 
            label="Description" 
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <Input.TextArea 
              rows={3} 
              placeholder="Enter item description"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageItems;