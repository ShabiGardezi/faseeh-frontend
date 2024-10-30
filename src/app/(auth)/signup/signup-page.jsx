'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';
import axiosInstance from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { toast } from "@/hooks/use-toast";


// Validation schema
const schema = yup.object({
  name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
  username: yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
}).required();

export function SignupPageComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const router = useRouter();

  const onSubmit = async (data) => {

    const { name, username, email, password } = data;

    try {
      const response = await axiosInstance.post("/auth/signup", {
        name,
        username,
        email,
        password,
      });

      if (response.status !== 200) {
        console.log('error: ' + response.data.message);

        toast({
          title: response?.data?.message,
          description: "Failed to signup. Please try again.",
          variant: "error",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Signed up successfully",
        variant: "success",
      });

      router.push('/login');

    } catch (error) {
      console.error("Error while signup:", error);
      toast({
        title: "Error",
        description: "There was some error while signup try again",
        variant: "error",
      });
    }
  };

  return (
    (<div className="min-h-screen flex items-center justify-center bg-[#20b1c9] bg-opacity-10 py-10">
      <div className="bg-white ring-1 ring-[#20b1c9] p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-8">
          {/* Replace with your actual logo */ }
          <div
            className="w-32 h-32 bg-[#20b1c9] rounded-full flex items-center justify-center text-white text-2xl font-bold">
            LOGO
          </div>
        </div>

        <form onSubmit={ handleSubmit(onSubmit) } className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              { ...register('name') }
              type="text"
              id="name"
              className="bg-transparent mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#20b1c9] focus:border-[#20b1c9]"
              placeholder="Enter your name" />
            { errors.username && <p className="mt-1 text-sm text-red-600">{ errors.name.message }</p> }
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              { ...register('username') }
              type="text"
              id="username"
              className="bg-transparent mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#20b1c9] focus:border-[#20b1c9]"
              placeholder="Enter your username" />
            { errors.username && <p className="mt-1 text-sm text-red-600">{ errors.username.message }</p> }
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              { ...register('email') }
              type="email"
              id="email"
              className="bg-transparent mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#20b1c9] focus:border-[#20b1c9]"
              placeholder="Enter your email" />
            { errors.email && <p className="mt-1 text-sm text-red-600">{ errors.email.message }</p> }
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                { ...register('password') }
                type={ showPassword ? 'text' : 'password' }
                id="password"
                className="bg-transparent mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#20b1c9] focus:border-[#20b1c9]"
                placeholder="Enter your password" />
              <button
                type="button"
                onClick={ () => setShowPassword(!showPassword) }
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                { showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" /> }
              </button>
            </div>
            { errors.password && <p className="mt-1 text-sm text-red-600">{ errors.password.message }</p> }
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <div className="relative">
              <input
                { ...register('confirmPassword') }
                type={ showConfirmPassword ? 'text' : 'password' }
                id="confirmPassword"
                className="bg-transparent mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#20b1c9] focus:border-[#20b1c9]"
                placeholder="Confirm your password" />
              <button
                type="button"
                onClick={ () => setShowConfirmPassword(!showConfirmPassword) }
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                { showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" /> }
              </button>
            </div>
            { errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{ errors.confirmPassword.message }</p> }
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#20b1c9] hover:bg-[#1C9AAF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#20b1c9]">
              Sign up
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="button"
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#20b1c9]">
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
              </svg>
              Sign up with Google
            </button>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{ ' ' }
          <a href="/login" className="font-medium text-[#1C9AAF] hover:text-[#20b1c9]">
            Sign in now
          </a>
        </p>
      </div>
    </div>)
  );
}