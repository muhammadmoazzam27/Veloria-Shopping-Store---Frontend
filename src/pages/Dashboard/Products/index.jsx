import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Modal, Popover, Space, Table, Tag, Form, Input, Select } from 'antd'
import axios from 'axios';
import "@/config/global";

const { Item } = Form;
const { Option } = Select;

const Products = () => {

  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Screen Browser Popup
  const [isSubmitting, setIsSubmitting] = useState(false); // Handle Update Button Loading
  const [selectedProduct, setSelectedProduct] = useState(null); // 

  const [form] = Form.useForm();

  const token = localStorage.getItem("jwtToken");

  const handleEdit = (record) => {
    setSelectedProduct(record);
    form.setFieldsValue({ title: record.title, category: record.category, stock: record.stock, price: record.price, description: record.description });
    setIsModalOpen(true);
  };

  const handleDelete = async (record) => {

    const res = await axios.delete(`${VITE_API_BASE_URL}/products/delete/product/${record.id}`, { headers: { Authorization: `Bearer ${token}` } });

    try {
      const { status, data } = res;
      if (status === 200) {
        toastify(data.message || "Product deleted", "success")
        const filteredProducts = products.filter((product) => {
          return product.id !== record.id
        })
        setProducts(filteredProducts)
      }
    }
    catch (error) {
      console.error("Error : ", error);
      return toastify(error?.response?.data?.message || "Product not deleted", "error")
    }

  }


  const handleUpdate = async (values) => {

    setIsSubmitting(true);

    const res = await axios.patch(`${VITE_API_BASE_URL}/products/update/single/product/${selectedProduct.id}`, values, { headers: { Authorization: `Bearer ${token}` } })

    try {

      if (res.status === 200) {
        toastify(res?.data?.message || "Product updated", "success")
        setIsModalOpen(false);
        getAllProducts();
        return
      }

    }
    catch (error) {
      console.error("Error : ", error);
      return toastify(error?.response?.data?.message || "Product not updated", "error")
    }
    finally {
      setIsSubmitting(false);
    }

  }

  const getAllProducts = () => {

    setIsLoading(true);
    
    axios.get(`${VITE_API_BASE_URL}/products/get/all/products`, { headers: { Authorization: `Bearer ${token}` } })

      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          setProducts(data.allProducts)
          console.log("All Products : ", data.allProducts)
          return
        }
      })
      .catch((error) => {
        console.error("Error : ", error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    getAllProducts();
  }, [])

  const columns = [
    {
      title: 'Admin ID',
      dataIndex: 'uid',
      key: 'uid',
      render: (uid) => <Tag>{uid}</Tag>,
    },
    {
      title: 'Product ID',
      dataIndex: 'id',
      key: 'id',
      render: (id) => <Tag>{id}</Tag>,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      render: (text) => <Tag> {text} </Tag>,
      key: 'createdAt',
    },
    {
      title: 'Created By',
      dataIndex: 'user_role',
      render: (role) => {
        const color = role === "Super Admin" ? "darkblue" : "green";
        return <Tag color={color}>{role}</Tag>;
      },
      key: 'user_role',
    },
    {
      title: 'Action',
      key: 'operation',
      render: (_, record) => (
        <Space>
          <Popconfirm
            title="Edit Product"
            description="Are you sure"
            onConfirm={() => handleEdit(record)}
            okText="Yes"
            cancelText="No"
          >
            <a className='p-2'> <EditOutlined /> </a>
          </Popconfirm>
          <Popconfirm
            title="Delete Product"
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

      <div>
        <h1 className='text-center'>Products</h1>
      </div>
      <div className='my-1 d-flex justify-content-end'>
        <Button size='large' type='primary'><Link className='text-decoration-none' to="/dashboard/user-profile/add-product">+ Create New Product</Link></Button>
      </div>
      <div className="custom-purple-table">
        <Table rowKey="id" dataSource={products} columns={columns} loading={isLoading} pagination={{ pageSize: 5 }} size='medium' bordered title={() => <div style={{ backgroundColor: '#09183b', color: '#ffffff', padding: '10px 0', fontSize: '1.25rem', textAlign: 'center', fontWeight: 'bold', margin: '-12px -16px' }}>All Products</div>} scroll={{ x: 'max-content' }} />
      </div>
      <div>
        {/* Edit User Modal Popup */}
        <Modal title="Update Product" open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={() => form.submit()} confirmLoading={isSubmitting} okText="Update">

          <Form form={form} layout="vertical" onFinish={handleUpdate}>
            <Item name="title" label="Title" rules={[{ required: true, message: 'Please enter product name' }]}>
              <Input />
            </Item>

            <Item name="stock" label="Stock" rules={[{ required: true, message: 'Please enter a stock quantity' }]} >
              <Input />
            </Item>

            <Item name="category" label="Category" rules={[{ required: true, message: 'Please enter a product category' }]}>
              <Select>
                <Option value="Men Fashion">Men Fashion</Option>
                <Option value="Women Fashion">Women Fashion</Option>
                <Option value="Electronics">Electronics</Option>
                <Option value="Home & living">Home & living</Option>
                <Option value="Fashion & Style">Fashion & Style</Option>
              </Select>
            </Item>

            <Item name="price" label="Price" rules={[{ required: true, message: "enter a product price" }]}>
              <Input />
            </Item>

            <Item name="description" label="Description" rules={[{ required: true, message: "enter a product description" }]}>
              <Input />
            </Item>
          </Form>
        </Modal>
      </div>

    </div>
  )
}

export default Products