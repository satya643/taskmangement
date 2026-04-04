'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { Loader2, Mail, Lock, User } from 'lucide-react';
import Image from 'next/image';
import api from '@/lib/api';

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await api.post('/auth/register', data);
      toast.success('Registration successful! Please login.');
      router.push('/login');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
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
              src="/register-img.png"
              alt="Register Illustration"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain scale-[1.15]"
              priority
            />
          </div>
        </div>

        {/* Right Form Side */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-10 py-4 bg-white flex-1 md:overflow-hidden overflow-y-auto">
          <div className="w-full max-w-sm mx-auto">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 text-center md:text-left">Register</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">

              <div className="w-full flex items-center gap-3 px-4 py-2.5 border border-slate-300 rounded-lg focus-within:border-[#1972F5] focus-within:ring-1 focus-within:ring-[#1972F5] transition-all bg-white">
                <User size={18} className="text-slate-400 shrink-0" />
                <input
                  {...register('name')}
                  type="text"
                  className="flex-1 bg-transparent border-none outline-none text-sm text-slate-700 placeholder:text-slate-400"
                  placeholder="Full Name"
                />
              </div>

              <div className="w-full flex items-center gap-3 px-4 py-2.5 border border-slate-300 rounded-lg focus-within:border-[#1972F5] focus-within:ring-1 focus-within:ring-[#1972F5] transition-all bg-white">
                <Mail size={18} className="text-slate-400 shrink-0" />
                <input
                  {...register('email')}
                  type="email"
                  className="flex-1 bg-transparent border-none outline-none text-sm text-slate-700 placeholder:text-slate-400"
                  placeholder="Email"
                  required
                />
              </div>

              <div className="w-full flex items-center gap-3 px-4 py-2.5 border border-slate-300 rounded-lg focus-within:border-[#1972F5] focus-within:ring-1 focus-within:ring-[#1972F5] transition-all bg-white">
                <Lock size={18} className="text-slate-400 shrink-0" />
                <input
                  {...register('password')}
                  type="password"
                  className="flex-1 bg-transparent border-none outline-none text-sm text-slate-700 placeholder:text-slate-400"
                  placeholder="Password"
                  required
                />
              </div>

              <div className="w-full flex items-center gap-3 px-4 py-2.5 border border-slate-300 rounded-lg focus-within:border-[#1972F5] focus-within:ring-1 focus-within:ring-[#1972F5] transition-all bg-white">
                <Lock size={18} className="text-slate-400 shrink-0" />
                <input
                  {...register('confirmPassword')}
                  type="password"
                  className="flex-1 bg-transparent border-none outline-none text-sm text-slate-700 placeholder:text-slate-400"
                  placeholder="Confirm Password"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  disabled={isLoading}
                  type="submit"
                  className="w-full bg-[#1972F5] hover:bg-[#1558c4] text-white py-3 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    'Register'
                  )}
                </button>
              </div>

              <div className="text-center text-sm text-slate-500 pt-4 border-t border-slate-100 mt-4">
                Already have an account?{' '}
                <Link href="/login" className="text-[#1972F5] font-bold hover:underline">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}



