import React from 'react';
import RegisterForm from './../../../components/frontend/RegisterForm';

const RegisterSeller = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen flex-col bg-slate-900">
      <p className="text-white font-bold my-2">Welcome to Register</p>
     <h1 className="font-bold text-2xl my-2 text-white">Create a new account</h1>
     <RegisterForm role="SELLER"/>

    </div>
  );
};

export default RegisterSeller;
