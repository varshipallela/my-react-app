import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Popconfirm,
  Typography,
  Row,
  Col,
  Card,
  message
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  AppstoreOutlined,
  SearchOutlined
} from "@ant-design/icons";

interface Category {
  id: number;
  name: string;
  description: string;
  itemCount: number;
}

const { Title } = Typography;

const ManageCategories: React.FC = () => {
  const [data, setData] = useState<Category[]>([
    { id: 1, name: "Cleaning Supplies", description: "All cleaning related items", itemCount: 15 },
    { id: 2, name: "Tools", description: "Maintenance and repair tools", itemCount: 8 },
    { id: 3, name: "Equipment", description: "Heavy machinery and equipment", itemCount: 5 },
    { id: 4, name: "Consumables", description: "Items that are consumed during use", itemCount: 12 },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<Category | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [form] = Form.useForm();

  const handleAdd = () => {
    setEditingItem(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: Category) => {
    setEditingItem(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    setData(prev => prev.filter(item => item.id !== id));
    message.success('Category deleted successfully');
  };

  const handleSave = () => {
    form.validateFields().then(values => {
      if (editingItem) {
        setData(prev =>
          prev.map(item =>
            item.id === editingItem.id ? { ...item, ...values } : item
          )
        );
        message.success('Category updated successfully');
      } else {
        const newItem: Category = {
          id: Date.now(),
          itemCount: 0,
          ...values,
        };
        setData(prev => [...prev, newItem]);
        message.success('Category added successfully');
      }
      setIsModalVisible(false);
    });
  };

  const filteredData = data.filter(
    item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { 
      title: "Category Name", 
      dataIndex: "name", 
      key: "name",
      sorter: (a: Category, b: Category) => a.name.localeCompare(b.name),
    },
    { 
      title: "Description", 
      dataIndex: "description", 
      key: "description" 
    },
    { 
      title: "Items Count", 
      dataIndex: "itemCount", 
      key: "itemCount",
      sorter: (a: Category, b: Category) => a.itemCount - b.itemCount,
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_: any, record: Category) => (
        <Space size="small">
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
            size="small"
          />
          <Popconfirm 
            title="Are you sure you want to delete this category?" 
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

  return (
    <div style={{ padding: "16px", width: "1200px"}}>
      {/* Header */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={3} style={{ margin: 0, display: "flex", alignItems: "center" }}>
            <AppstoreOutlined style={{ marginRight: 8, color: "#1890ff" , fontWeight: "bold"}} />
            Manage Categories
          </Title>
        </Col>
      </Row>

      {/* Stats Card */}
      <Row style={{ marginBottom: 16 }}>
        <Col span={24}>
          <Card 
            size="small"
            style={{
              // background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
background: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",

              color: "white",
              borderRadius: 8
            }}
            bodyStyle={{ padding: "16px" }}
          >
            <Row align="middle">
              <Col>
                <AppstoreOutlined style={{ fontSize: 35, marginRight: 12 }} />
                <div style={{ fontSize: 25, fontWeight: "bold" }}>Total Categories</div>
                <div style={{ fontSize: 30, fontWeight: "bold" }}>{data.length}</div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Search and Add */}
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col flex="auto">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search categories..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            allowClear
          />
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            Add Category
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
        title={editingItem ? "Edit Category" : "Add Category"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSave}
        width={500}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item 
            name="name" 
            label="Category Name" 
            rules={[
              { required: true, message: 'Please enter category name' },
              { min: 2, message: 'Category name must be at least 2 characters' }
            ]}
          >
            <Input placeholder="Enter category name" />
          </Form.Item>
          <Form.Item 
            name="description" 
            label="Description" 
            rules={[
              { required: true, message: 'Please enter description' }
            ]}
          >
            <Input.TextArea 
              rows={3} 
              placeholder="Enter category description"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageCategories;