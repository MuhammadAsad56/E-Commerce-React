import React, { useContext, useState } from 'react'
import FormSec from '../components/FormSec'
import { AuthContext } from '../context/AuthContext'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const SignIn = () => {
  const {authValues, setAuthValues} = useContext(AuthContext)
  const {email, pass} = authValues
  const [errMessage, setErrMessage] = useState("")
  const navigate = useNavigate()

  const handleSignIn = () => {
    if(!email || !pass){
      setErrMessage("please enter all Fields")
      return
    }else{
      signInWithEmailAndPassword(auth,email, pass)
      .then((res)=> {
        authValues.id = res.user.uid
        navigate("/products")
      })
      .catch(err => setErrMessage(err.message))
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
  });

  }

  return (
    <>
    <div className='w-full h-screen bg-gray-100 flex items-center justify-center'>
    <div className='flex flex-col mb-14  rounded-lg bg-purple-400 w-1/3 h-fit'>
    <h2 className='text-center text-3xl my-10 text-white'>Login</h2>
    <div className='flex items-center justify-center'>
    <FormSec onClick={handleSignInGoogle} errMessage={errMessage} onclick={handleSignIn} text={"Login"}/>  
    </div>
    </div>
    </div>

    </>
  )
}

export default SignIn