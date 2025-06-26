// app/billing/page.tsx
import { getPaymentInfo } from '@/app/actions/user';
import React from 'react';
import Link from 'next/link';

type PaymentInfo =
  | { status: number; data?: undefined }
  | { status: number; data: { subscription: { plan: 'FREE' | 'PRO' } | null } };

export default async function BillingPage() {
  const payment = (await getPaymentInfo()) as PaymentInfo | undefined;

  // Determine plan, defaulting to FREE if anything is missing
  const plan =
    payment?.status === 200 &&
    payment.data?.subscription?.plan === 'PRO'
      ? 'PRO'
      : 'FREE';

  const isFree = plan === 'FREE';

  return (
    <div className="flex justify-center p-6">
      {/* Outer card always has gray-500 border */}
      <div
        className={`w-full max-w-md rounded-xl border border-gray-500 bg-neutral-900 transition-transform ${
          isFree ? 'hover:scale-105' : ''
        }`}
      >
        {/* Current Plan Section */}
        <div className="px-6 py-6 text-center">
          <h2 className="text-2xl font-medium text-neutral-300">Current Plan</h2>
          <p className="text-4xl font-bold text-white mt-2">
            {plan === 'PRO' ? (
              <>
                ₹99<span className="text-lg font-normal text-neutral-400">/mo</span>
              </>
            ) : (
              <>
                Free
                <span className="text-lg font-normal text-neutral-400"> (₹0/mo)</span>
              </>
            )}
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-700" />

        {/* If Free, show the upgrade card details */}
        {isFree && (
          <>
            <div className="px-6 py-6 text-center">
              <h3 className="text-xl font-semibold text-white mb-4">
                Upgrade to ClipIQ Pro
              </h3>
              <ul className="space-y-3 text-left text-neutral-300 mb-6">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-purple-500">•</span>
                  Record in 1080p HD with our <strong>Desktop App</strong>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-purple-500">•</span>
                  Collaborate & organize in <strong>Public Workspaces</strong>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-purple-500">•</span>
                  Invite others to your workspace
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-purple-500">•</span>
                  AI features: transcription, auto-title & description
                </li>
              </ul>
              <Link
                href="/subscription"
                className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
              >
                Upgrade to Pro ₹99/mo
              </Link>
            </div>
          </>
        )}

        {/* If already Pro, thank-you message */}
        {!isFree && (
          <div className="px-6 py-6 text-center text-neutral-300">
            <p className="mb-4">You’re already on the Pro plan.</p>
            <p>Enjoy unlimited HD recording, collaboration, and AI features!</p>
          </div>
        )}
      </div>
    </div>
  );
}
