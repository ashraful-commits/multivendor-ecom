"use client"
import React,{useState} from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextInput from './../backend/Form/TextInput';
import { useForm,FieldValues,Resolver } from 'react-hook-form';
import { SubmitButton } from './../backend/Form/SubmitButton';
import { Button } from '@/components/ui/button';
import { makePostRequest } from '../../lib/apiRequest';
import { useRouter } from 'next/navigation';
import  Link  from 'next/link';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  role: yup.string().required('Role is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});
interface FormValues {
  name: string;
  role: string;
  email: string;
  password: string;
}
const RegisterForm = ({role="USER",id}:{role?:string;id?:string;}) => {
  const [loading,setLoading] = useState(false)
  const router = useRouter()
  function redirect(){
    if(role=="USER"){
      router.push(`/verify-email`)
    }else{

      router.push(`/verify-email`)
    }
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit=(data:{name:string;email:string;role:string;password:string})=>{
    makePostRequest(setLoading, '/api/users', data, 'User', reset,redirect);
  }
  return (
    <div className="w-full">
      

    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md min-w-[35vw] mx-auto bg-slate-200 dark:bg-slate-800  p-5 rounded-md">
      <div className="mb-5">
        <TextInput label="Your name" placeholder="Enter your name" name="name" type="text" register={register} errors={errors?.name?.message}/>
        <TextInput  defaultValue={role} name="role" type="hidden" register={register} errors={errors?.role?.message}/>
        <TextInput label="Your email" placeholder="Enter your email" name="email" type="text" register={register} errors={errors?.email?.message}/>
        <TextInput label="Your  password" placeholder="Enter your password" name="password" type="password" register={register} errors={errors?.password?.message}/>
       <span className=""> {errors?.password?.message}</span>
       <p className=" my-4 flex items-center gap-x-4">Already have an account <Link className="font-bold hover:underline  " href="/login">Login</Link></p>
       <SubmitButton loading={loading} title="Register now"/>
        </div>
    </form>

    </div>
  )
}

export default RegisterForm
