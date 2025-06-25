import { useState } from "react";
import { completeSubscription } from "@/app/actions/user";
import { toast } from "sonner";

export default function PaymentModal({ workspaceId }: { workspaceId: string }) {
  const [showModal, setShowModal] = useState(false);

  const handlePayment = async () => {
    setShowModal(false);
    await new Promise((r) => setTimeout(r, 2000)); // simulate delay
    const response=await completeSubscription(workspaceId);
    toast(response.status==200 ? "Success" :"Failed", {description:response.data})
  };

  return (
    <>
      <button onClick={() => setShowModal(true)} className="btn-primary">
        Upgrade to Pro
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-5 rounded space-y-4 text-black">
            <h2 className="text-xl font-bold">Mock Payment Gateway</h2>
            <p>Pay ₹999 to upgrade to PRO.</p>
            <button onClick={handlePayment} className="bg-green-500 text-white px-4 py-2 rounded">
              Pay Now (₹999)
            </button>
          </div>
        </div>
      )}
    </>
  );
}
