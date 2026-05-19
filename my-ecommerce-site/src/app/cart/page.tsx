'use client';
import { useState } from "react";
import { CldImage } from "next-cloudinary";

export default function CartPage() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Heirloom tomato",
      pricePerLb: "$5.99 / lb",
      totalPrice: "$5.99",
      quantity: "1 lb",
      image: "https://res.cloudinary.com/dkjfdb1mj/image/upload/v1779210406/tomato1_uywsm0.png"
    },
    {
      id: 2,
      name: "Organic ginger",
      pricePerLb: "$12.99 / lb",
      totalPrice: "$6.50",
      quantity: "0.5 lb",
      image: "https://res.cloudinary.com/dkjfdb1mj/image/upload/v1779210406/ginger_ed0d5t.png"
    }
  ]);

  return (
    <div className="w-full bg-white pb-32">
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 pt-10 md:pt-16">
        {/* Header */}
        <div className="flex items-end gap-4 pb-6 border-b border-[#E5E5E5]">
          <h1 className="font-newsreader text-[48px] md:text-[64px] font-normal leading-none text-[#222222]">
            Basket
          </h1>
          <span className="font-sans text-[15px] text-gray-500 mb-2">3 items</span>
        </div>

        {/* Cart Content */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Products List */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="w-full flex rounded-[20px] border border-[#EBEBEB] overflow-hidden bg-white shadow-xs hover:shadow-sm transition-shadow duration-200"
              >
                {/* Image Section */}
                <div className="w-[140px] sm:w-[180px] h-[140px] sm:h-[160px] bg-[#F2F2F0] flex items-center justify-center p-4 shrink-0 border-r border-[#EBEBEB]">
                  <CldImage
                    src={item.image}
                    alt={item.name}
                    width={130}
                    height={130}
                    className="object-contain"
                  />
                </div>

                {/* Text and Actions Section */}
                <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between bg-[#FDFDFD]">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-sans text-[16px] sm:text-[18px] font-bold text-[#111111]">
                        {item.name}
                      </h3>
                      <p className="font-sans text-[14px] sm:text-[15px] font-semibold text-[#426B1F] mt-1">
                        {item.pricePerLb}
                      </p>
                    </div>
                    <span className="font-sans text-[16px] sm:text-[18px] font-bold text-[#111111]">
                      {item.totalPrice}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center">
                    <button className="flex items-center gap-2 border border-[#D9D9D9] bg-white px-3 sm:px-4 py-1.5 rounded-full text-[12.5px] sm:text-[13.5px] text-[#222222] font-semibold hover:bg-gray-50 transition-colors duration-150 cursor-pointer">
                      <span>{item.quantity}</span>
                      <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 w-full">
            <div className="w-full rounded-[20px] border border-[#EBEBEB] bg-[#FAFAFA] p-6">
              <h2 className="font-sans text-[20px] font-bold text-[#111111] mb-6">
                Order summary
              </h2>

              <div className="space-y-4 text-[14.5px] text-[#444444]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#111111]">$27.44</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium text-[#111111]">$3.99</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax</span>
                  <span className="font-medium text-[#111111]">$2.00</span>
                </div>

                <div className="border-t border-[#EAEAEA] pt-4 flex justify-between font-bold text-[16px] text-[#111111]">
                  <span>Total</span>
                  <span>$33.43</span>
                </div>
              </div>

              <button className="mt-8 flex w-full items-center justify-between rounded-[6px] bg-[#426B1F] hover:bg-[#355618] px-5 py-3.5 text-white font-medium text-[15px] transition-colors duration-200">
                <span>Continue to payment</span>
                <span className="text-lg leading-none">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}