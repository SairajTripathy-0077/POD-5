'use client';
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-auto w-screen flex flex-col items-center justify-center gap-y-20">
      <div className="font-newsreader text-6xl text-gray-700 px-48 text-center">
        <div className="py-44 mt-4">
          <div className="my-5">We’re farmers, purveyors, and eaters of organically grown food.</div>
            <button className="text-xl bg-[#426B1F] border border-[#E5E5E5] rounded-md text-white font-medium p-2 px-4">
          <Link href="/product">Browse our shop</Link>
        </button>
        </div>
        <div className="flex items-center justify-center">
          <CldImage
            src="https://res.cloudinary.com/dkjfdb1mj/image/upload/v1779206745/leaves_cumgwu.png"
            alt="Hero Image"
            width={500}
            height={500}
            className="rounded-lg mt-10 mr-12"
          />
          <CldImage
            src="https://res.cloudinary.com/dkjfdb1mj/image/upload/v1779207199/veg_ynaxiw.png"
            alt="Hero Image"
            width={700}
            height={600}
            className="rounded-lg mt-10 ml-12"
          />

        </div>
      </div>
    </div>
  );
}
