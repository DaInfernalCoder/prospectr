import { Suspense } from "react";
import SignupForm from "./SignupForm";

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8 md:p-24 flex items-center justify-center">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      }
    >
      <SignupForm />
    </Suspense>
  );
}
