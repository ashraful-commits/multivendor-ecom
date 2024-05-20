import React from 'react';
import LoginForm from './../../../components/frontend/LoginForm';


const Login = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen flex-col">
     <h1 className="font-bold text-2xl my-2 ">Login here</h1>
      <p className=" font-bold mb-5">Login user/farmer/seller</p>
        <LoginForm/>
    </div>
  );
};

export default Login;
