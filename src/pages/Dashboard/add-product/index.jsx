import { Button, Col, Form, Input, Row, Select } from 'antd'
import { useEffect, useState } from 'react';
import "@/config/global";
import axios from 'axios';

const { Item } = Form
const { Option } = Select

const initialState = {
  title: "",
  category: "",
  price: "",
  stock: "",
  description: ""
};

const AddProduct = () => {

  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)

  const [imageFile, setImageFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleRemoveImage = () => {
    setImageFile(null)
    setPreviewUrl(null)
  }

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])


  const handleChange = (e) => setState((s) => ({ ...s, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {

    e.preventDefault();

    const { title, category, price, stock, description } = state

    if (title.length < 3 || title.trim() === "") {
      return toastify("Enter your product name", "error")
    }

    if (!category) {
      return toastify("Select your category name", "error")
    }

    if (stock.trim() === "") {
      return toastify("Enter a stock quantity", "error")
    }

    if (price.trim() === "") {
      return toastify("Enter a product price", "error")
    }

    if (description.length < 6 || description.trim() === "") {
      return toastify("Enter a product description", "error")
    }

    const product = { title, category, price, stock, description }


    const productData = new FormData();

    for (const key in product) {
      productData.append(key, product[key])
    }

    productData.append("image", imageFile)
    console.log("Product Data : ", productData)


    const token = localStorage.getItem("jwtToken");

    setIsProcessing(true);

    axios.post(`${VITE_API_BASE_URL}/products/create`, productData, { headers: { Authorization: `Bearer ${token}` } })

      .then((res) => {
        const { status, data } = res;
        if (status === 201) {
          return toastify(data.message || "Product successfully created", "success")
        }
      })
      .catch((error) => {
        console.error("Error : ", error);
        return toastify(error?.response?.data.message || "Product not created", "error")
      })
      .finally(() => {
        setIsProcessing(false);
      })

  }

  return (
    <div className='p-2'>
      <h1 className='text-center py-2'>Add New Product</h1>
      <div className='d-flex justify-content-center alig-items-center'>
        <div className="container">
          <div className="row">
            <div className="card mx-auto p-3" style={{ maxWidth: 450 }}>
              <Form layout='vertical'>
                <Row gutter={12}>
                  <Col span={24}>
                    <Item label="Title" required>
                      <Input size='large' placeholder='Enter Product Name' name='title' onChange={handleChange} />
                    </Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12}>
                    <Item className='w-100' label="Category" required>
                      <Select size='large' placeholder="Select Category" name="category" onChange={(value) => setState((s) => ({ ...s, category: value }))}>
                        <Option value="Men Fashion">Men Fashion</Option>
                        <Option value="Women Fashion">Women Fashion</Option>
                        <Option value="Fashion & Style">Fashion & Style</Option>
                        <Option value="Electronics">Electronics</Option>
                        <Option value="Home & living">Home & living</Option>
                      </Select>
                    </Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12}>
                    <Item className='w-100' label="Stock Quatity" required>
                      <Input size='large' type="number" placeholder='Enter stock quatity' min={0} name='stock' onChange={handleChange} />
                    </Item>
                  </Col>
                  <Col span={24}>
                    <Item label="Price ($)" required>
                      <Input size='large' type="number" placeholder='Enter Price' min={0} name='price' onChange={handleChange} />
                    </Item>
                  </Col>
                  <Col span={24}>
                    <Item label="Description" required>
                      <Input.TextArea rows={3} type="text" placeholder='Enter your product specifications and features...' name='description' onChange={handleChange} />
                    </Item>
                  </Col>
                  <Col span={24}>
                    <Item label="Product Image" required>
                      <input type="file" className='form-control' name='file' onChange={handleImageChange} />
                      {previewUrl && (
                        <div className="mt-3 position-relative d-inline-block">
                          <img src={previewUrl} alt="Product Preview" className="img-thumbnail rounded" style={{ maxWidth: '200px', maxHeight: '180px', objectFit: 'cover' }} />
                          <button type="button" className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1 rounded-circle" onClick={handleRemoveImage} style={{ width: '24px', height: '24px', padding: 1, lineHeight: 1 }} title="Remove Image">
                            &times;
                          </button>
                        </div>
                      )}
                    </Item>
                  </Col>
                  <Button type='primary' size='large' block htmlType='submit' loading={isProcessing} onClick={handleSubmit}>Publish Product</Button>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddProduct