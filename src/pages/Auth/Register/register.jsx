import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Space, Select } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import "@/config/global";
import axios from 'axios';

const { Title, Text } = Typography;
const { Item } = Form
const { Option } = Select

const initialState = {
  fullName: '',
  email: '',
  password: '',
  role: 'Customer',
}

const Register = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  // Form input state
  const [state, setState] = useState(initialState);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manual submit handler connected directly to the button
  const handleSubmit = async () => {

    const { fullName, email, password, role } = state;

    if (fullName.trim().length < 3) {
      toastify('Enter your full name', "error");
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      toastify('Please enter a valid email address!', 'error');
      return;
    }

    if (password.length < 6) {
      toastify('Password must be at least 6 characters long!', 'error');
      return;
    }

    const user = { fullName, email, password, role }

    // Processing trigger
    setIsProcessing(true);

    axios.post(`${VITE_API_BASE_URL}/auth/register`, user)

      .then((res) => {
        const { status, data } = res
        toastify(data.message || 'Registration successful!', "success");
        console.log('User : ', user);
        navigate('/auth/login');
      })
      .catch((error) => {
        const status = error.response?.status;
        const data = error.response?.data;
        console.error(error);
        if (status === 403) {
          toastify(data.message || 'User already exists!', 'error');
        }
        else if (status === 400) {
          toastify(data.message || 'Invalid input!', 'error');
        }
        else {
          toastify(data.message || 'Registration failed!', 'error');
        }
      })
      .finally(() => {
        setIsProcessing(false)
      })

  };

  return (
    <div className="register-wrapper container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-light p-3">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 d-flex justify-content-center">
          <Card className="shadow-sm rounded-4 register-card border-0 w-100">
            <div className="text-center mb-2">
              <Title level={3} className="fw-bold mb-1">Create Account</Title>
              <Text type="secondary">Sign up to get started</Text>
            </div>

            <Form layout="vertical" size="middle">
              {/* Full Name */}
              <Item className='mb-4'
                label={
                  <Space>
                    <UserOutlined />
                    <span>Full Name</span>
                  </Space>
                }
              >
                <Input name="fullName" size='large' onChange={handleChange} placeholder="Enter your full name" />
              </Item>

              {/* Email */}
              <Item
                className='mb-4'
                label={
                  <Space>
                    <MailOutlined />
                    <span>Email</span>
                  </Space>
                }
              >
                <Input name="email" size='large' type="email" onChange={handleChange} placeholder="Enter your email address" />
              </Item>

              {/* Password */}
              <Item
                className='mb-4'
                label={
                  <Space>
                    <LockOutlined />
                    <span>Password</span>
                  </Space>
                }
              >
                <Input.Password name="password" size='large' onChange={handleChange} placeholder="Enter Password" />
              </Item>


              {/* Account Role Selection */}
              <Item
                name="role"
                label={
                  <Space>
                    <SafetyOutlined />
                    <span>Role</span>
                  </Space>
                }
              >
                <Select placeholder="Please Select a role" size="large" onChange={(value) => setState((s) => ({ ...s, role: value }))}>
                  <Option value="Customer">Customer / Buyer</Option>
                  <Option value="Admin">Admin / Seller</Option>
                </Select>
              </Item>

              {/* Submit Button */}
              <div className="mt-3 mb-2">
                <Button type="primary" block size='large' loading={isProcessing} onClick={handleSubmit} htmlType='submit' >Register</Button>
              </div>

              <div className="text-center mt-2">
                <Text type="secondary">Already have an account? </Text>
                <Link to="/auth/login" className="text-decoration-none fw-semibold">
                  Log in
                </Link>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;