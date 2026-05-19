'use client';
import { CldImage } from "next-cloudinary";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full bg-white pb-32">
      {/* Hero Section */}
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 pt-16 md:pt-24 flex flex-col items-center">
        <h1 className="font-newsreader text-[40px] sm:text-[50px] md:text-[66px] leading-[1.12] text-[#222222] max-w-4xl mx-auto text-center font-normal tracking-tight">
          We’re <span className="italic">farmers</span>, <span className="italic">purveyors</span>, and <span className="italic">eaters</span> of organically grown food.
        </h1>
        
        <div className="mt-10 mb-20 md:mb-24">
          <Link
            href="/product"
            className="font-sans text-[15px] font-medium bg-[#426B1F] hover:bg-[#355618] text-white px-8 py-3.5 rounded-[5px] transition-colors duration-200 inline-block"
          >
            Browse our shop
          </Link>
        </div>

        {/* Asymmetrical Image Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start mt-6">
          {/* Left portrait/square image */}
          <div className="md:col-span-5 w-full">
            <CldImage
              src="https://res.cloudinary.com/dkjfdb1mj/image/upload/v1779206745/leaves_cumgwu.png"
              alt="Fresh green spinach leaves"
              width={500}
              height={500}
              className="w-full h-auto object-cover rounded-none"
              priority
            />
          </div>
          {/* Right landscape image shifted down */}
          <div className="md:col-span-7 w-full md:pt-24">
            <CldImage
              src="https://res.cloudinary.com/dkjfdb1mj/image/upload/v1779207199/veg_ynaxiw.png"
              alt="Organically grown vegetables and bread"
              width={700}
              height={600}
              className="w-full h-auto object-cover rounded-none"
              priority
            />
          </div>
        </div>

        <div className="w-full border-t border-[#E5E5E5] mt-28 pt-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 text-left">
          <div className="md:col-span-3">
            <h2 className="font-sans text-[12.5px] font-bold tracking-widest text-[#111111] uppercase">
              What we believe
            </h2>
          </div>
      
          <div className="md:col-span-9 font-sans text-[16px] md:text-[17.5px] leading-[1.65] text-[#222222] font-normal flex flex-col gap-y-6 max-w-[800px]">
            <p>We believe in produce. Tasty produce. Produce like:</p>
            
            <p>
              Apples. Oranges. Limes. Lemons. Guavas. Carrots. Cucumbers. Jicamas. Cauliflowers.
              Brussels sprouts. Shallots. Japanese eggplants. Asparagus. Artichokes—Jerusalem
              artichokes, too. Radishes. Broccoli. Baby broccoli. Brocolini. Bok choy. Scallions.
              Ginger. Cherries. Raspberries. Cilantro. Parsley. Dill.
            </p>
            
            <p>What are we forgetting?</p>
            
            <p>
              Oh! Onions. Yams. Avocados. Lettuce. Arugula (to some, “rocket”). Persian cucumbers,
              in addition to aforementioned “normal” cucumbers. Artichokes. Zucchinis. Pumpkins.
              Squash (what some cultures call pumpkins). Sweet potatoes and potato-potatoes.
              Jackfruit. Monk fruit. Fruit of the Loom. Fruits of our labor (this website). Sorrel.
              Pineapple. Mango. Gooseberries. Blackberries. Tomatoes. Heirloom tomatoes. Beets.
              Chives. Corn. Endive. Escarole, which, we swear, we’re vendors of organic produce,
              but if you asked us to describe what escaroles are...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
