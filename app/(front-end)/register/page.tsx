import React from 'react';
import RegisterForm from './../../../components/frontend/RegisterForm';

const Register = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen flex-col  dark:bg-slate-900 bg-white">
      <p className="text-white dark:text-black font-bold my-2">Welcome to Register</p>
     <h1 className="font-bold text-2xl my-2 text-white dark:text-black">Create a seller account</h1>

     <RegisterForm/>

    </div>
  );
};

export default Register;
