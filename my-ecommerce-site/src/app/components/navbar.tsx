import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-gray-100">
      <Link href="/" className="text-2xl font-bold text-[#426B1F] font-newsreader ">World Peas</Link>
      <div className="px-10">
        <Link href="/product" className="text-gray-700 hover:text-[#426B1F] mx-4">Shop</Link>
        <Link href="/" className="text-gray-700 hover:text-[#426B1F] mx-4">Newstand</Link>
        <Link href="/" className="text-gray-700 hover:text-[#426B1F] mx-4">Who we are</Link>
        <Link href="/" className="text-gray-700 hover:text-[#426B1F] mx-4 mr-10">My profile</Link>
        <Link href="/cart" className="bg-[#426B1F] border border-[#E5E5E5] rounded-md text-white font-medium p-2 px-4 ">Basket</Link>
      </div>
    </nav>
  )
}

export default Navbar;