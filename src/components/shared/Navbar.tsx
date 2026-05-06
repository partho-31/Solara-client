"use client";

import Link from "next/link";
import { ChevronDown, LogIn, UserRoundPlus } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import {  useState, useEffect } from "react";
// import Image from "next/image";
// import AuthContext from "@/context/AuthContext";
// import { logoutUser } from "@/services/authServices";
// import { toast } from "sonner";
import { useRouter } from "next/navigation";

const NAV_LINKS = [
  { label: "Home",        href: "/"            },
  { label: "Collections", href: "/collections" },
  { label: "About Us",   href: "/about"    },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy & Policy", href: "/privacy&policy" },
] as const;

// const SERVICES_LINKS = [
//   { label: "Newsletter", href: "#newsletter" },
//   { label: "About Us",   href: "/about"      },
//   { label: "Contact Us", href: "/contact"    },
// ] as const;

const Navbar = () => {
//   const { user, setUser } = useContext(AuthContext);
 const[user,setUser] = useState(null)
  const router = useRouter();
  // const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleLogout = async () => {
    // const response = await logoutUser();
    // if (response.success) {
    //   toast.success("Logout successful");
    //   setUser(null);
    //   router.push("/");
    //   router.refresh();
    // }
  };

  return (
    <>
      {/* ── NAVBAR ─────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 z-50 w-full h-17 flex items-center justify-between
          px-6 md:px-10 bg-[#faf8f4]/90 backdrop-blur-md border-b border-stone-200
          transition-shadow duration-300
          ${scrolled ? "shadow-[0_2px_20px_rgba(15,14,12,0.08)]" : "shadow-none"}`}
      >

        {/* ── LOGO ──────────────────────────────────────────────── */}
        <Link
          href="/"
          className="text-2xl font-semibold tracking-[0.18em] text-stone-900
            no-underline shrink-0"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          SOL<span className="text-[#b8975a]">ARA</span>
        </Link>

        {/* ── DESKTOP NAV LINKS ─────────────────────────────────── */}
        <ul className="hidden lg:flex items-center gap-1 list-none m-0 p-0">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="relative px-3 py-2 text-[0.8rem] tracking-widest uppercase
                  text-stone-800 font-medium no-underline rounded-sm
                  hover:text-stone-900 hover:bg-stone-100 transition-all duration-200
                  after:content-[''] after:absolute after:bottom-0
                  after:left-3 after:right-3 after:h-px after:bg-amber-600
                  after:scale-x-0 hover:after:scale-x-100
                  after:transition-transform after:duration-300"
              >
                {link.label}
              </Link>
            </li>
          ))}

          {/* Services hover-dropdown — your original logic kept intact
          <li>
            <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
              <DropdownMenuTrigger asChild>
                <span
                  onMouseEnter={() => setOpen(true)}
                  onMouseLeave={() => setOpen(false)}
                  className="relative px-3 py-2 text-[0.8rem] tracking-widest uppercase
                    text-stone-800 font-medium rounded-sm cursor-pointer
                    inline-flex items-center gap-1
                    hover:text-stone-900 hover:bg-stone-100 transition-all duration-200"
                >
                  Services
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
                  />
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                align="center"
                sideOffset={8}
                className="bg-white border border-stone-200 shadow-xl rounded-md min-w-45 z-60 p-1"
              >
                {SERVICES_LINKS.map((s) => (
                  <DropdownMenuItem
                    key={s.href}
                    className="p-0 focus:bg-stone-50 rounded-sm cursor-pointer"
                  >
                    <Link
                      href={s.href}
                      className="w-full px-3 py-2 block text-sm text-stone-600
                        hover:text-stone-900 tracking-wide transition-colors"
                    >
                      {s.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>*/}
        </ul> 

        {/* ── RIGHT SIDE ────────────────────────────────────────── */}
        <div className="flex items-center gap-2 shrink-0">

          {/* Guest: Sign In + Register */}
          {!user ? (
            <div className="hidden lg:flex items-center gap-2">
              <Link href="/login">
                <button className="flex items-center gap-2 px-4 py-2 text-[0.78rem]
                  tracking-[0.08em] uppercase text-stone-500 font-medium rounded-sm
                  border border-stone-200 bg-transparent
                  hover:border-stone-800 hover:text-stone-900
                  transition-all duration-200 cursor-pointer">
                  <LogIn size={14} />
                  Sign In
                </button>
              </Link>

              <Link href="/register">
                <button className="flex items-center gap-2 px-4 py-2 text-[0.78rem]
                  tracking-[0.08em] uppercase text-white font-medium rounded-sm
                  bg-stone-900 border border-stone-900
                  hover:bg-[#b8975a] hover:border-[#b8975a]
                  transition-all duration-200 cursor-pointer">
                  <UserRoundPlus size={14} />
                  Register
                </button>
              </Link>
            </div>
          ) : (
            /* Logged-in: avatar dropdown — your original structure */
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-9 h-9 rounded-full border-2 border-amber-600 overflow-hidden">
                  {/* <Image
                    alt="User avatar"
                    src={`https://res.cloudinary.com/jniac-just/${user?.image}`}
                    width={36}
                    height={36}
                    className="object-cover"
                  /> */}
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white border border-stone-200
                  rounded-md shadow-xl z-50 mt-3 w-52 p-1"
              >
                {/* User info — replaces plain "Profile" */}
                <li className="pointer-events-none px-3 py-2 border-b border-stone-100 mb-1">
                  <p className="text-sm font-semibold text-stone-900 p-0">
                    {/* {user.name ?? "My Account"} */}
                  </p>
                  {/* <p className="text-xs text-stone-400 p-0">{user.email}</p> */}
                </li>

                <li>
                  <Link
                    href="/dashboard"
                    className="text-sm text-stone-700 hover:bg-stone-50
                      hover:text-stone-900 rounded-sm tracking-wide"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/add-product"
                    className="text-sm text-stone-700 hover:bg-stone-50
                      hover:text-stone-900 rounded-sm tracking-wide"
                  >
                    Add Product
                  </Link>
                </li>
                <li>
                  <Link
                    href="/manage-products"
                    className="text-sm text-stone-700 hover:bg-stone-50
                      hover:text-stone-900 rounded-sm tracking-wide"
                  >
                    Manage Products
                  </Link>
                </li>

                <li className="border-t border-stone-100 mt-1 pt-1">
                  <button
                    onClick={handleLogout}
                    className="text-sm text-red-500 hover:bg-red-50
                      hover:text-red-600 rounded-sm tracking-wide w-full text-left"
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          )}

          {/* Hamburger — mobile only */}
          <button
            className="lg:hidden flex flex-col justify-center gap-1.5 p-1
              bg-transparent border-none cursor-pointer"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <span className={`block h-[1.5px] w-5.5 bg-stone-900
              transition-all duration-300 origin-center
              ${mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""}`}
            />
            <span className={`block h-[1.5px] w-5.5 bg-stone-900
              transition-all duration-300
              ${mobileOpen ? "opacity-0" : "opacity-100"}`}
            />
            <span className={`block h-[1.5px] w-5.5 bg-stone-900
              transition-all duration-300 origin-center
              ${mobileOpen ? "-rotate-45 translate-y-[-6.5px]" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* ── MOBILE FULLSCREEN MENU ─────────────────────────────── */}
      <div
        className={`fixed inset-0 z-998 bg-[#faf8f4] flex flex-col items-center
          justify-center gap-6 transition-all duration-300
          ${mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
          }`}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className="text-4xl text-stone-900 no-underline tracking-wider
              hover:text-amber-600 transition-colors duration-200"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {link.label}
          </Link>
        ))}

        {/* {SERVICES_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className="text-xl text-stone-400 no-underline tracking-widest
              hover:text-amber-600 transition-colors duration-200"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {link.label}
          </Link>
        ))} */}

        {!user && (
          <div className="flex gap-3 mt-6">
            <Link href="/login" onClick={() => setMobileOpen(false)}>
              <button className="px-6 py-3 text-sm tracking-widest rounded-sm
                border border-stone-300 text-stone-700
                hover:border-stone-900 hover:text-stone-900
                transition-colors cursor-pointer">
                Sign In
              </button>
            </Link>
            <Link href="/register" onClick={() => setMobileOpen(false)}>
              <button className="px-6 py-3 text-sm tracking-widest rounded-sm
                bg-stone-900 text-white
                hover:bg-amber-600 transition-colors cursor-pointer">
                Register
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;