'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CertificatePasscodeRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/admin?error=unauthorized&attempt=passcode');
  }, [router]);
  return null;
}
