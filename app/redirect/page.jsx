'use client'

import { useRouter } from 'next/navigation';
import NeonCursor from "@/components/neonCursor"

export default function RedirectPage() {
  const router = useRouter();

  // OCAuth functionality has been removed
  // This page now just redirects to home
  router.push('/');

  return (
    <>
      <div>Redirecting...</div>
      <NeonCursor />
    </>
  );
}