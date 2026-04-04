'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { Loader2, Mail, Lock } from 'lucide-react';
import Image from 'next/image';
import api from '@/lib/api';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await api.post('/auth/login', data);
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      toast.success('Login successful');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-[#f8fafc] flex items-center justify-center overflow-hidden">

      {/* Responsive Auth Card */}
      <div className="w-[850px] max-w-[95%] md:h-[600px] max-h-[95vh] bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">

        {/* Left Illustrative Side */}
        <div className="w-full md:w-1/2 h-48 md:h-full bg-[#1972F5] flex items-center justify-center relative overflow-hidden shrink-0">
          <div className="w-full h-full relative">
            <Image
              src="/login-img.png"
              alt="Login Illustration"
              fill
              className="object-contain scale-[1.15]"
              priority
            />
          </div>
        </div>

        {/* Right Form Side */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-10 py-6 bg-white flex-1 overflow-y-auto">
          <div className="w-full max-w-sm mx-auto">
            <h2 className="text-3xl font-bold text-slate-800 mb-8">Login</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

              <div className="w-full flex items-center gap-3 px-4 py-3 border border-slate-300 rounded-lg focus-within:border-[#1972F5] focus-within:ring-1 focus-within:ring-[#1972F5] transition-all bg-white">
                <Mail size={20} className="text-slate-400 shrink-0" />
                <input
                  {...register('email')}
                  type="email"
                  className="flex-1 bg-transparent border-none outline-none text-sm text-slate-700 placeholder:text-slate-400"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="w-full flex items-center gap-3 px-4 py-3 border border-slate-300 rounded-lg focus-within:border-[#1972F5] focus-within:ring-1 focus-within:ring-[#1972F5] transition-all bg-white">
                <Lock size={20} className="text-slate-400 shrink-0" />
                <input
                  {...register('password')}
                  type="password"
                  className="flex-1 bg-transparent border-none outline-none text-sm text-slate-700 placeholder:text-slate-400"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm py-2">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-300 text-[#1972F5] focus:ring-[#1972F5]"
                  />
                  <span>Remember Me</span>
                </label>
                <Link href="/forgot-password" className="text-[#1972F5] font-medium hover:underline opacity-80 cursor-not-allowed">
                  Forgot Password?
                </Link>
              </div>

              <div className="pt-2">
                <button
                  disabled={isLoading}
                  type="submit"
                  className="w-full bg-[#1972F5] hover:bg-[#1558c4] text-white py-3.5 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    'Login'
                  )}
                </button>
              </div>

              <div className="text-center text-sm text-slate-500 pt-6">
                Don't have an account?{' '}
                <Link href="/register" className="text-[#1972F5] font-bold hover:underline">
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}



