import React, { useContext, useEffect, useState } from 'react';
import {Modal, Input, Button, Form} from 'antd';
import { Link } from 'react-router-dom';
import { CartItems } from '../context/AuthContext';
import { HeaderLinksContext } from '../context/AuthContext';

const CheckOutModal = ({isModalOpen, handleOk,handleCancel, checkoutOrder}) => {
  const {authenticated} = useContext(CartItems)
  const { headerLinks, setHeaderLinks } = useContext(HeaderLinksContext)
  const [continueAsGuest, setContinueAsGuest] = useState(false)
  
  
  useEffect(()=>{
    setContinueAsGuest(false)
  },[])

  return (
    <>
      <Modal 
      open={isModalOpen}
      onOk={handleOk}
      closable = {false}
      footer={null} 
      onCancel={handleCancel}>
       {
        authenticated || continueAsGuest ? (
        <Form  onFinish={checkoutOrder} layout="vertical">
        <Form.Item  name={"username"} label={"Username"}>
          <Input type='text' />
        </Form.Item>
        <Form.Item name={"email"} required label={"Email"}>
          <Input type="email" />
        </Form.Item>
        <Form.Item name={"number"} required label={"Phone Number"}>
          <Input type="number" />
        </Form.Item>
        <Form.Item required name={"address"} label={"Address"}>
          <Input.TextArea placeholder="Address" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form> 
        )  
      : (
        <div className="flex flex-col items-center">
        <h1 className="text-center text-xl my-5">
          Login to Save your Order's and See Progress
        </h1>
        <Link to="/signin">
        <Button onClick={() => setHeaderLinks("/signin")} type="primary">Continue to Login</Button>
        </Link>
        <h1 className="text-center my-5">----- OR -----</h1>
        <Button onClick={() => setContinueAsGuest(true)}>
          Continue as a Guest
        </Button>
      </div>
      )
      }
    </Modal>

    </>
  );
};
export default CheckOutModal;