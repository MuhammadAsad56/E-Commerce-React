// import React, { useState } from 'react'
import { Form, Input } from 'antd';
import FormSec from '../components/FormSec';
import { useContext, useState } from 'react';
import {AuthContext}  from '../context/AuthContext'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const SignUp = () => {
    const { authValues, setAuthValues } = useContext(AuthContext)
    const [errMessage, setErrMessage] = useState("")
    const {name, email, pass} = authValues
    const navigate = useNavigate()

    const handleSignIn = () => {
        if(!name || !email || !pass){
            setErrMessage("please enter all fields") 
            return
        } else{
            createUserWithEmailAndPassword(auth, email, pass)
            .then((res)=> {
                authValues.id = res.user.uid 
                console.log("successful")
                navigate("/products")
            })
            .catch((err) => setErrMessage(err.message))
        }
    }

    const provider = new GoogleAuthProvider();
    const handleSignInGoogle = () =>{
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
        signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    navigate("/products")
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

    }
    
    return (
        <>
            {/* <div className='w-full h-screen bg-gray-100 flex items-center justify-center'>
                <div className='flex flex-col mb-14 items-center justify-center rounded-lg bg-purple-400 w-1/3 h-fit'>
                    <h2 className='text-center text-3xl my-10 text-white'>Sign Up</h2>
                    <FormSec onClick={handleSignInGoogle} errMessage={errMessage} onclick={handleSignIn} text={"Sign Up"} namefield={<Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                            },
                        ]}
                    >
                        <Input onChange={(e)=> setAuthValues((prev) => ({...prev, name: e.target.value}))} />
                    </Form.Item>}/>
                </div>

            </div> */}
<div className='w-full h-screen bg-gray-100 flex items-center justify-center p-4'>
    <div className='flex flex-col items-center justify-center rounded-lg bg-purple-400 w-full max-w-xs h-fit p-6 md:p-8 shadow-lg'>
        <h2 className='text-center text-xl md:text-3xl my-4 md:my-6 text-white font-semibold'>Sign Up</h2>
        <FormSec 
            onClick={handleSignInGoogle} 
            errMessage={errMessage} 
            onclick={handleSignIn} 
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
                        onChange={(e) => setAuthValues((prev) => ({...prev, name: e.target.value}))} 
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