"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

const Navbar = () => {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();

    const tabs = [
        { label: "Home", href: "/" },
        { label: "Search", href: "/SearchPage" },
        { label: "Global", href: "/GlobalPage" },
    ];

    return (
        <nav
            className="
                flex justify-between items-center w-[90%] max-w-[800px] mx-auto mt-8 px-8 py-4
                rounded-[20px] relative z-10
                bg-[#e0e5ec] border border-[#c8ced6]
                shadow-[8px_8px_16px_#a3b1c6,_-8px_-8px_16px_#ffffff]
                dark:bg-[#1a1e24] dark:border-[#2a2f37]
                dark:shadow-[8px_8px_16px_#0d0f12,_-8px_-8px_16px_#272c35]
            "
        >
            {/* Tab Buttons */}
            <div className="flex gap-4">
                {tabs.map((tab) => {
                    const isActive = pathname === tab.href;
                    return (
                        <Link key={tab.href} href={tab.href}>
                            <button
                                className={`
                                    font-bold px-6 py-3 rounded-xl cursor-pointer
                                    transition-all duration-200 text-base tracking-wide border-none
                                    bg-[#d1d9e6] text-[#2c3e50] font-semibold tracking-[0.02em]
                                    shadow-[5px_5px_10px_#a3b1c6,_-5px_-5px_10px_#ffffff,_inset_2px_2px_4px_rgba(255,255,255,0.8),_inset_-2px_-2px_4px_rgba(163,177,198,0.4)]
                                    hover:bg-[#c8d0dd]
                                    dark:bg-[#2a3039] dark:text-[#e8ecf1]
                                    dark:shadow-[5px_5px_10px_#111418,_-5px_-5px_10px_#3a4250,_inset_2px_2px_4px_rgba(58,66,80,0.5),_inset_-2px_-2px_4px_rgba(17,20,24,0.5)]
                                    dark:hover:bg-[#323a45]
                                    ${isActive
                                        ? "scale-[0.97] !bg-[#c4ccda] !shadow-[inset_5px_5px_10px_#a3b1c6,_inset_-5px_-5px_10px_#ffffff] dark:!bg-[#1e232a] dark:!shadow-[inset_5px_5px_10px_#111418,_inset_-5px_-5px_10px_#333a44]"
                                        : ""
                                    }
                                `}
                            >
                                {tab.label}
                            </button>
                        </Link>
                    );
                })}
            </div>

            {/* Theme Toggle */}
            <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="
                    font-bold px-6 py-3 rounded-xl cursor-pointer
                    transition-all duration-200 text-base tracking-wide border-none
                    bg-[#d1d9e6] text-[#2c3e50] font-semibold tracking-[0.02em]
                    shadow-[5px_5px_10px_#a3b1c6,_-5px_-5px_10px_#ffffff,_inset_2px_2px_4px_rgba(255,255,255,0.8),_inset_-2px_-2px_4px_rgba(163,177,198,0.4)]
                    hover:bg-[#c8d0dd]
                    dark:bg-[#2a3039] dark:text-[#e8ecf1]
                    dark:shadow-[5px_5px_10px_#111418,_-5px_-5px_10px_#3a4250,_inset_2px_2px_4px_rgba(58,66,80,0.5),_inset_-2px_-2px_4px_rgba(17,20,24,0.5)]
                    dark:hover:bg-[#323a45]
                "
            >
                {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
            </button>
        </nav>
    );
};

export default Navbar;