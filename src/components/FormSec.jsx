
import { Button, Form, Input } from 'antd';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const FormSec = ({ namefield, text, onclick, errMessage, onClick, num, headerLinks }) => {
  const { authValues, setAuthValues } = useContext(AuthContext)

  return (
    <Form
      name="basic"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >

      {namefield}
      <Form.Item

        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input onChange={(e) => setAuthValues((prev) => ({ ...prev, email: e.target.value }))} />
      </Form.Item>

      <Form.Item
        label="Password "
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password onChange={(e) => setAuthValues((prev) => ({ ...prev, pass: e.target.value }))} />
      </Form.Item>

      <p className='text-xl text-center text-red-600 '>{errMessage}</p>
      <Form.Item
        wrapperCol={{
          offset: num,
          span: 16
        }}
      >
        <Button onClick={onclick} className='bg-purple-400 text-white' htmlType="submit">
          {text}
        </Button>
      </Form.Item>
      {headerLinks == "/signin" && (
        <div>
          <h2 className='text-2xl text-white font-semibold mb-5 text-center'>or</h2>
          <Form.Item
            wrapperCol={{
              offset: 5,
              span: 16,
            }}
          >
            <Button onClick={onClick} className='bg-purple-400 text-white' htmlType="submit">
              Sign in with google
            </Button>
          </Form.Item>
          <div className='flex gap-3'>
            <p className=' font-semibold text-gray-200'>Don't have an account:</p>
            <span className='text-sky-400'><Link to="/signup">Create account</Link></span>
          </div>
          <div className='text-md mt-2'>
          <p>Admin Email: asad@gmail.com</p>
          <p>password: 123456</p>
          </div>
        </div>
      )}
    </Form>
  );
}
export default FormSec;
