import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="w-full bg-white">
      <nav className="w-full max-w-[1280px] mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
        <Link href="/" className="text-[26px] font-normal text-[#426B1F] font-newsreader tracking-tight hover:opacity-90 transition-opacity">
          World Peas
        </Link>
        <div className="flex items-center">
          <Link href="/product" className="font-sans text-[13.5px] text-[#333333] hover:text-[#426B1F] transition-colors duration-200 mx-5">
            Shop
          </Link>
          <Link href="/" className="font-sans text-[13.5px] text-[#333333] hover:text-[#426B1F] transition-colors duration-200 mx-5">
            Newstand
          </Link>
          <Link href="/" className="font-sans text-[13.5px] text-[#333333] hover:text-[#426B1F] transition-colors duration-200 mx-5">
            Who we are
          </Link>
          <Link href="/" className="font-sans text-[13.5px] text-[#333333] hover:text-[#426B1F] transition-colors duration-200 mx-5 mr-8">
            My profile
          </Link>
          <Link href="/cart" className="font-sans text-[13.5px] font-medium bg-[#426B1F] hover:bg-[#355618] text-white px-5 py-2.5 rounded-[5px] transition-colors duration-200 shadow-xs">
            Basket (3)
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;