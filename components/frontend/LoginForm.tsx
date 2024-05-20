"use client"
import { signIn } from 'next-auth/react';
// import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import TextInput from './../backend/Form/TextInput';
import { SubmitButton } from './../backend/Form/SubmitButton';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  
  // const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data:any) => {
    try {
      setLoading(true);
      const loginData = await signIn('credentials', {
        ...data,
      });

      if (loginData?.error) {
        toast.error('Sign-in error: Check your credentials');
      } else {
        toast.success('Login Successful');
        reset();
        // router.push('/');
      }
    } catch (error) {
      console.error('Network Error:', error);
      toast.error('It seems something is wrong with your Network');
    } finally {
      setLoading(false);
    }
  };

  if (typeof document ==='undefined') {
   return null;
  }
  

  return (
    <div className="max-w-[500px] rounded-lg bg-slate-200 dark:bg-slate-800">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md min-w-[35vw] mx-auto p-5 rounded-md">
        <div className="mb-5">
          <TextInput
            label="Your email"
            placeholder="Enter your email"
            name="email"
            type="text"
            className="border border-slate-500"
            register={register}
            errors={errors?.email?.message}
          />
          <TextInput
            label="Your password"
            placeholder="Enter your password"
            name="password"
            type="password"
            className="border border-slate-500"
            register={register}
            errors={errors?.password?.message}
          />
          <span className="text-yellow-500">{errors?.password?.message}</span>
          <p className="text-slate-600 dark:text-white my-4 flex items-center gap-x-4">
            Don&apos;t have an account?
            <Link className="font-bold hover:underline" href="/register">
              Register
            </Link>
          </p>
          <SubmitButton loading={loading} title="Login now" />
        </div>
      </form>
    </div>
  );
}
