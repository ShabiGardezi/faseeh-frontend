'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import axiosInstance from '@/lib/axios';
import { useRouter } from 'next/navigation';
import GoogleLoginButton from '@/components/core/GoogleLoginButton';
import { useUser } from '@/contexts/UserContext';


// Validation schema
const schema = yup.object({
  identifier: yup.string().required('Username or Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
}).required();

export function LoginPageComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const router = useRouter()
  const {saveUserData} = useUser()


  const onSubmit = async (data) => {
    console.log(data);
    const { identifier, password } = data;

    try {
      // Make the API request with axiosInstance
      const response = await axiosInstance.post("/auth/login", {
        identifier,
        password,
      });

      if (response.status !== 200) {
        console.log('error: ' + response.data.message);

        toast({
          title: response?.data?.message,
          description: "Failed to generate email. Please try again.",
          variant: "error",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Logged in successfully",
        variant: "success",
      });

      console.log('user', JSON.stringify(response?.data.user));

      saveUserData(response?.data?.user, response?.data?.token)

      router.push('/');
    } catch (error) {
      console.error("Error while login:", error);
      toast({
        title: "Error",
        description: "There was an error during sign-in. Please try again.",
        variant: "error",
      });
    }
  };

  return (
    (<div className="min-h-screen flex items-center justify-center bg-[#20b1c9] bg-opacity-10 py-3">
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
            <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">Email / Username</label>
            <input
              { ...register('identifier') }
              type="text"
              id="identifier"
              className="bg-transparent mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#20b1c9] focus:border-[#20b1c9]"
              placeholder="Enter your username or email" />
            { errors.email && <p className="mt-1 text-sm text-red-600">{ errors.identifier.message }</p> }
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

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-medium text-[#1C9AAF] hover:text-[#20b1c9]">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#20b1c9] hover:bg-[#1C9AAF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#20b1c9]">
              Sign in
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
            {/* <button
              type="button"
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#20b1c9]">
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
              </svg>
              Sign in with Google
            </button> */}

            <GoogleLoginButton/>

          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{ ' ' }
          <a href="/signup" className="font-medium text-[#1C9AAF] hover:text-[#20b1c9]">
            Sign up now
          </a>
        </p>
      </div>
    </div>)
  );
}