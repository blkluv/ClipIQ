"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Lock, CreditCard, Calendar, Key } from "lucide-react";
import { completeSubscription } from "@/app/actions/user";
import { useRouter } from "next/navigation";

type Props = {
  sessionId: string;
  workspaceId: string | null;
};

export default function PaymentModal({ sessionId, workspaceId }: Props) {
  const [show, setShow] = useState(false);
  const [processing, setProcessing] = useState(false);
  const router = useRouter();

  // Open the modal as soon as this component mounts
  useEffect(() => {
    setShow(true);
  }, []);

  // Common close handler: hide + redirect
  const handleClose = () => {
    setShow(false);
    if (workspaceId) {
      router.push(`/dashboard/${workspaceId}`);
    } else {
      window.history.back();
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  };

  const handlePay = async () => {
    setProcessing(true);
    // simulate payment delay
    await new Promise((r) => setTimeout(r, 2000));

    const res = await completeSubscription(sessionId);
    if (res.status === 200) {
      toast.success("Payment successful!", { description: res.data });
      if (workspaceId) {
        router.push(`/dashboard/${workspaceId}`);
      } else {
        window.history.back();
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    } else {
      toast.error("Payment failed", { description: res.data });
      setProcessing(false);
    }
  };

  // Nothing to render if modal is closed
  if (!show) return null;

  return (
    <div
      // Backdrop click closes
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={handleClose}
    >
      <div
        // Prevent clicks inside the modal from bubbling to backdrop
        onClick={(e) => e.stopPropagation()}
        className="bg-[#1E1E1E] w-full max-w-md p-6 rounded-xl shadow-xl text-white space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Secure Checkout</h2>
          <button
            onClick={handleClose}
            className="text-neutral-400 hover:text-white transition"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Plan Info */}
        <div className="flex items-center gap-3 bg-[#2A2A2A] p-4 rounded-lg">
          <Lock size={24} className="text-purple-400" />
          <div>
            <p className="text-sm text-neutral-400">ClipIQ Pro Subscription</p>
            <p className="text-xl font-bold">₹999 / month</p>
          </div>
        </div>

        {/* Card Form */}
        <div className="space-y-4">
          <div className="relative">
            <CreditCard className="absolute top-1/2 -translate-y-1/2 left-3 text-neutral-400" />
            <input
              type="text"
              placeholder="Card Number"
              className="w-full pl-12 pr-4 py-2 bg-[#2A2A2A] rounded-lg border border-neutral-700 focus:border-purple-600 outline-none transition"
              maxLength={19}
            />
          </div>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Calendar className="absolute top-1/2 -translate-y-1/2 left-3 text-neutral-400" />
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full pl-10 pr-4 py-2 bg-[#2A2A2A] rounded-lg border border-neutral-700 focus:border-purple-600 outline-none transition"
                maxLength={5}
              />
            </div>
            <div className="relative flex-1">
              <Key className="absolute top-1/2 -translate-y-1/2 left-3 text-neutral-400" />
              <input
                type="text"
                placeholder="CVC"
                className="w-full pl-10 pr-4 py-2 bg-[#2A2A2A] rounded-lg border border-neutral-700 focus:border-purple-600 outline-none transition"
                maxLength={4}
              />
            </div>
          </div>
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePay}
          disabled={processing}
          className={`w-full py-3 rounded-lg font-semibold transition ${
            processing
              ? "bg-neutral-600 text-neutral-300 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700 text-white"
          }`}
        >
          {processing ? "Processing..." : "Pay Now"}
        </button>

        {/* Disclaimer */}
        <p className="text-xs text-neutral-500">
          Your payment is secure and encrypted. We do not store your card
          details.
        </p>
      </div>
    </div>
  );
}
