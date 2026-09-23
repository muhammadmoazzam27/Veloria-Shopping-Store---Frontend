import { useEffect, useState } from 'react';
import { Space, Table, Tag, Modal, Form, Input, Select, Popconfirm, Popover } from 'antd';
import "@/config/global";
import axios from 'axios';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Item } = Form;

const AllUsers = () => {

  const [users, setUsers] = useState([]); // Get All Users in Table
  const [isLoading, setIsLoading] = useState(false); // Table loading 
  const [isModalOpen, setIsModalOpen] = useState(false); // Screen Browser Popup
  const [isSubmitting, setIsSubmitting] = useState(false); // Handle Update Button Loading
  const [selectedUser, setSelectedUser] = useState(null); // 

  const [form] = Form.useForm();

  const getAllUsers = () => {

    setIsLoading(true);

    const token = localStorage.getItem("jwtToken");

    axios.get("http://localhost:8000/api/auth/get/all/users", { headers: { Authorization: `Bearer ${token}` } })

      .then((res) => {
        if (res.status === 200) {
          return setUsers(res.data.allUsers);
        }
      })
      .catch((error) => console.error("Error : ", error))
      .finally(() => setIsLoading(false));

  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // Edit Button Handle - Modal open aur form fill karne ke liye
  const handleEdit = (record) => {
    setSelectedUser(record);
    form.setFieldsValue({ fullName: record.fullName, email: record.email, status: record.status, role: record.role, });
    setIsModalOpen(true);
  };


  const handleUpdate = async (values) => {

    setIsSubmitting(true);

    const token = localStorage.getItem("jwtToken");

    try {

      const res = await axios.patch(`http://localhost:8000/api/auth/update/user/single/${selectedUser.uid}`, values, { headers: { Authorization: `Bearer ${token}` } });

      if (res.status === 200) {
        toastify("User updated successfully!", "success");
        setIsModalOpen(false);
        getAllUsers();
      }
    } catch (error) {
      console.error("Update Error:", error);
      toastify("Failed to update user", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (record) => {

    try {

      setIsSubmitting(true);

      const token = localStorage.getItem("jwtToken")

      const res = await axios.delete(`http://localhost:8000/api/auth/delete/user/single/${record.uid}`, { headers: { Authorization: `Bearer ${token}` } })

      if (res.status === 200) {
        toastify("User deleted successfully!", "success");
        const filteredUsers = users.filter((user) => {
          return user.uid !== record.uid
        })
        setUsers(filteredUsers);
      }

    }
    catch (error) {
      console.error("Error : ", error)
      toastify("User not deleted!", "error");
    }
    finally {
      setIsSubmitting(false);
    }

  }

  const columns = [
    {
      title: 'uid',
      dataIndex: 'uid',
      key: 'uid',
      render: (uid) => <Tag>{uid}</Tag>,
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      render: (text) => <Tag> {text} </Tag>,
      key: 'createdAt',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color = status === "Active" ? "darkgreen" : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => {
        let color = 'red';
        if (role === 'Super Admin') {
          color = 'darkred'
        }
        else if (role === 'Admin') {
          color = 'darkblue'
        }
        else if (role === 'Customer') {
          color = 'blue'
        }

        return <Tag color={color}>{role}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'operation',
      render: (_, record) => (
        <Space>
          <Popover title="Edit User">
            <a className='p-2' onClick={() => { handleEdit(record) }}> <EditOutlined /> </a>
          </Popover>
          <Popconfirm
            title="Delete User"
            description="Are you sure"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <a className='p-2'> <DeleteOutlined /> </a>
          </Popconfirm>

        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="custom-purple-table">
        <Table rowKey="uid" dataSource={users} columns={columns} loading={isLoading} pagination={{ pageSize: 5 }} size='medium' bordered title={() => <div style={{ backgroundColor: '#09183b', color: '#ffffff', padding: '10px 0', fontSize: '1.25rem', textAlign: 'center', fontWeight: 'bold', margin: '-12px -16px' }}>All Users</div>} scroll={{ x: 'max-content' }} />
      </div>

      {/* Edit User Modal Popup */}
      <Modal title="Update User Profile" open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={() => form.submit()} confirmLoading={isSubmitting} okText="Update">

        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <Item name="fullName" label="Full Name" rules={[{ required: true, message: 'Please enter full name' }]}>
            <Input />
          </Item>

          <Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Please enter valid email' }]} >
            <Input />
          </Item>

          <Item name="status" label="Status" rules={[{ required: true }]}>
            <Select>
              <Option value="Active">Active</Option>
              <Option value="In Active">In Active</Option>
            </Select>
          </Item>

          <Item name="role" label="Role" rules={[{ required: true }]}>
            <Select>
              <Option value="Admin">Admin</Option>
              <Option value="Customer">Customer</Option>
            </Select>
          </Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AllUsers;