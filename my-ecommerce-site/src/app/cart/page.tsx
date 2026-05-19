'use client';
import { CldImage } from "next-cloudinary";
export default function CartPage() {
  return (
    <div>
      <div className="flex items-center justify-between px-8 py-4 mx-8 bg-white border-b-gray-200 border-b-2 ">
        <div className="flex mt-5 items-end ">
            <h1 className="text-5xl text-black font-light mr-4">Basket</h1>
            <p className="text-gray-500 mt-5 px-3">3 items</p>
        </div>
      </div>
      <div className="flex items-center gap-x-40 px-8 py-10">
        <CldImage
            src="https://res.cloudinary.com/dkjfdb1mj/image/upload/v1779209433/Tomato_mdbxqm.png"
            alt="tomato"
            width={800}
            height={400}
            className="rounded-lg ml-12 "
          />
        <div>
            <div className="w-70 rounded-2xl border border-gray-300 bg-[#F5F5F2] p-5">
        
        <h2 className="text-xl font-semibold mb-6">
            Order summary
        </h2>

        <div className="space-y-4 text-sm">
            
            <div className="flex justify-between">
            <span>Subtotal</span>
            <span>$27.44</span>
            </div>

            <div className="flex justify-between">
            <span>Shipping</span>
            <span>$3.99</span>
            </div>

            <div className="flex justify-between">
            <span>Tax</span>
            <span>$2.00</span>
            </div>

            <div className="flex justify-between font-semibold pt-1">
            <span>Total</span>
            <span>$33.43</span>
            </div>

        </div>

        <button className="mt-8 flex w-full items-center justify-between rounded-md bg-[#4A731C] px-5 py-3 text-white font-medium hover:opacity-90 transition">
            
            <span>Continue to payment</span>

            <span className="text-lg">
            →
            </span>

        </button>

        </div>
        </div>
      </div>
    </div>
  );
}