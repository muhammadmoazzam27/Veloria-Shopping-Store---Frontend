import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Form, Input, Button, Card, Typography, Space } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import "@/config/global";
import axios from 'axios';
import { useAuthContext } from '@/hooks/AuthContext';

const { Title, Text } = Typography;
const { Item } = Form
const initialState = {
  email: '',
  password: '',
}

const Login = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const { readProfile } = useAuthContext();

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

  const handleSubmit = async () => {

    const { email, password } = state;

    const user = { email, password }

    // Processing trigger
    setIsProcessing(true);

    axios.post(`${VITE_API_BASE_URL}/auth/login`, user)

      .then((res) => {
        const { status, data } = res;
        if (status == 200) {
          localStorage.setItem("jwtToken", data.token);
          readProfile(data.token);
          toastify(data.message || 'Login successful!', "success");
          console.log('User : ', user);
          return navigate('/');
        }
      })
      .catch((error) => {
        const status = error.response?.status;
        const data = error.response?.data;
        if (status == 401) {
          toastify(data.message || 'Invalid credentials!', "error");
        }
        else if (status == 403) {
          return toastify(data.message || 'In active user !', "error");
        }
        else if (status == 404) {
          return toastify(data.message || 'User not found!', "error");
        }
        else {
          toastify('Login failed!', "error");
          console.error('Error : ', error);
        }
      }
      )
      .finally(() => {
        setIsProcessing(false);
      })
  };

  return (
    <div className="register-wrapper container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-light p-1">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 d-flex justify-content-center">
          <Card className="shadow-sm rounded-4 register-card border-0 w-100">
            <div className="text-center mb-2">
              <Title level={3} className="fw-bold mb-1">Login Account</Title>
              <Text type="secondary">Sign in to get started</Text>
            </div>

            <Form layout="vertical" size="middle">

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
                className='mb-2'
                label={
                  <Space>
                    <LockOutlined />
                    <span>Password</span>
                  </Space>
                }
              >
                <Input.Password name="password" size='large' onChange={handleChange} placeholder="Enter Password" />
              </Item>
              <Link to="/auth/forgot-password" className='text-decoration-none'>Forgot Password ?</Link>

              {/* Submit Button */}
              <div className="mt-3 mb-2">
                <Button type="primary" block size='large' loading={isProcessing} onClick={handleSubmit} htmlType='submit' >Login</Button>
              </div>

              <div className="text-center mt-2">
                <Text type="secondary">Don't have an account? </Text>
                <Link to="/auth/register" className="text-decoration-none fw-semibold">
                  Register
                </Link>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;