'use client';

import AuthModal from '@/components/auth-modal';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <AuthModal 
        isOpen={true} 
        onClose={() => router.push('/')} 
        initialMode="signup" 
      />
    </div>
  );
}
