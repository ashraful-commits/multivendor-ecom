import React from 'react'
import { Info } from 'lucide-react';
const VerifyEmail = () => {
  return (
    <div className="flex flex-col items-center p-5 justify-center dark:bg-gray-200 bg-gray-800 w-[365px] m-auto rounded-lg mt-10 border border-red-500">
      <Info className="dark:text-red-500 text-red-500"/>
      <h3 className="dark:text-black text-white my-5 text-lg font-semibold">Email sent verify your account</h3>
      <p className="dark:text-black text-justify text-white">Thanks for creating and account.We have sent you an email.please check your email and click link for verification.</p>
    </div>
  )
}

export default VerifyEmail
