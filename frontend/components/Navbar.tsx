'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, CheckSquare, User } from 'lucide-react';
import api from '@/lib/api';
import { toast } from 'sonner';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');

      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');

      toast.success('Logged out successfully');
      router.push('/login');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return (
    <nav className="bg-[#3f51b5] sticky top-0 z-50 px-6 py-4 flex items-center justify-between text-white shadow-md">
      <Link href="/dashboard" className="text-xl font-bold tracking-wider">
        HOME
      </Link>

      <div className="flex items-center gap-4">
        <button
          onClick={handleLogout}
          className="text-sm font-semibold hover:underline px-2 py-1 uppercase cursor-pointer"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
