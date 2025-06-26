"use client";
import PaymentModal from '@/components/payment'
import { useSearchParams } from 'next/navigation';
import React from 'react'

const page = () => {
    const sessionId = Math.random().toString(36).substr(2, 16);
    const searchParams = useSearchParams();
  const workspaceId = searchParams.get('id') || null;
  return (
    <div>
      <PaymentModal  sessionId={sessionId} workspaceId={workspaceId} />
    </div>
  )
}

export default page
