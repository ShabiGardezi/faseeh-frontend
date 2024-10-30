'use client';
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'

// Validation schema
const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
}).required()

export function ForgetPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(data)
    setIsSubmitting(false)
    setIsSubmitted(true)
    // Handle password reset logic here
  }

  return (
    (<div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-8">
          {/* Replace with your actual logo */}
          <div
            className="w-32 h-32 bg-[#20b1c9] rounded-full flex items-center justify-center text-white text-2xl font-bold">
            LOGO
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Forgot Your Password?</h2>
        
        {!isSubmitted ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                {...register('email')}
                type="email"
                id="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#20b1c9] focus:border-[#20b1c9]"
                placeholder="Enter your email" />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#20b1c9] hover:bg-[#1C9AAF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#20b1c9] disabled:opacity-50">
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-3" />
                    Sending...
                  </>
                ) : (
                  'Reset Password'
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-green-600 mb-4">Password reset instructions have been sent to your email.</p>
            <p className="text-gray-600">Please check your inbox and follow the instructions to reset your password.</p>
          </div>
        )}
        
        <p className="mt-10 text-center text-sm text-gray-500">
          Remember your password?{' '}
          <Link href="/login" className="font-medium text-[#1C9AAF] hover:text-[#20b1c9]">
            Sign in now
          </Link>
        </p>
      </div>
    </div>)
  );
}