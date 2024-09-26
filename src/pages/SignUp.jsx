// import React, { useState } from 'react'
import { Form, Input } from 'antd';
import FormSec from '../components/FormSec';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const { authValues, setAuthValues } = useContext(AuthContext)
    const [errMessage, setErrMessage] = useState("")
    const { name, email, pass } = authValues
    const navigate = useNavigate()

    const handleSignUp = () => {
        if (!name || !email || !pass) {
            setErrMessage("please enter all fields")
            return
        } else {
            createUserWithEmailAndPassword(auth, email, pass)
                .then((res) => {
                    authValues.id = res.user.uid
                    console.log("successful")
                    navigate("/products")
                })
                .catch((err) => setErrMessage(err.message))
        }
    }

    return (
        <>
            <div className='w-full h-screen bg-gray-100 flex items-center justify-center p-4'>
                <div className='flex flex-col items-center justify-center rounded-lg bg-purple-400 w-full max-w-xs h-fit p-6 md:p-8 shadow-lg'>
                    <h2 className='text-center text-xl md:text-3xl my-4 md:my-6 text-white font-semibold'>Sign Up</h2>
                    <FormSec
                        num={8}
                        errMessage={errMessage}
                        onclick={handleSignUp}
                        text={"Sign Up"}
                        namefield={
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your name!',
                                    },
                                ]}
                            >
                                <Input
                                    className='w-full p-2 rounded-md text-sm'
                                    onChange={(e) => setAuthValues((prev) => ({ ...prev, name: e.target.value }))}
                                />
                            </Form.Item>
                        }
                    />
                </div>
            </div>
        </>
    )
}

export default SignUp  