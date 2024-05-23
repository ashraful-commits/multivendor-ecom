import React from 'react';
import RegisterForm from './../../../components/frontend/RegisterForm';

const Register = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen flex-col text-slate-900 dark:text-slate-100 ">
      <p className=" font-bold my-2">Welcome to Register</p>
     <h1 className="font-bold text-2xl my-2">Create a seller account</h1>

     <RegisterForm/>

    </div>
  );
};

export default Register;
