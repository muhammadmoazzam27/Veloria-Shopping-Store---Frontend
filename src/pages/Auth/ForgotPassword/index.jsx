import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Form, Input, Button, Card, Typography, Space } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import "@/config/global";

const { Title, Text } = Typography;
const { Item } = Form
const initialState = { password: '' }

const ForgotPassword = () => {

  const [isProcessing, setIsProcessing] = useState(false);

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

    const { password } = state;

    const changePassword = { password }

    // Processing trigger


  };

  return (
    <div className="register-wrapper container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-light p-3">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 d-flex justify-content-center">
          <Card className="shadow-sm rounded-4 register-card border-0 w-100">
            <div className="text-center mb-2">
              <Title level={3} className="fw-bold mb-4">Change Password</Title>
            </div>

            <Form layout="vertical" size="middle">

              {/* Password */}
              <Item className='mb-2'
                label={
                  <Space>
                    <LockOutlined />
                    <span>Password</span>
                  </Space>
                }
              >
                <Input.Password name="password" size='large' onChange={handleChange} placeholder="Enter Password" />
              </Item>

              {/* Submit Button */}
              <div className="mt-4 mb-2">
                <Button type="primary" block size='large' loading={isProcessing} onClick={handleSubmit} htmlType='submit' >Change Password</Button>
              </div>

              <div className="text-center mt-2">
                <Text className='mx-1' type='secondary' >Remember Password? </Text>
                <Link to="/auth/login" className="text-decoration-none fw-semibold">
                  Login
                </Link>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword