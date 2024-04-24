"use client";
import { useIsAuthenticated } from "@/app/hooks/useIsAuthenticated";
import { logout } from "@/app/lib/auth";
import logo from "@/public/assets/logo.jpeg";

import useToast from "@/app/components/ui/toast";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import Onboarding from "../Auth";
import Sidebar from "../Sidebar/Sidebar";
import NavAction from "./NavAction";

const Navbar = () => {
  // Local State
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  //toast state
  const { Toast, showToast } = useToast();

  const isAuthenticated = useIsAuthenticated();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const logoutHandler = async () => {
    const isLoggedOut = await logout();
    if (isLoggedOut) {
      showToast("Logout successful", "success");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <Toast />
      <nav className="w-full fixed top-0 right-0 z-20 min-h-20 flex justify-between bg-secondary items-center border-b border-slate-800 lg:px-10 md:px-4">
        {/* <div className="flex items-center"> */}
        <Image
          height="100"
          width="100"
          src={logo}
          alt="logo"
          className="h-20 w-20"
        />
        <ul className="md:flex items-center text-[#7e7e81] gap-5 text-lg lg:ml-32 md:ml-10 hidden">
          <li className="hover:text-btnColor cursor-pointer">
            <Link
              className={`link ${pathname === "/home" ? "text-btnColor" : ""}`}
              href="/home"
            >
              Home
            </Link>
          </li>
          <li className="hover:text-btnColor cursor-pointer">
            <Link
              className={`link ${pathname === "/job-post" ? "text-btnColor" : ""}`}
              href="/job-post"
            >
              Job Post
            </Link>
          </li>
          <li className="hover:text-btnColor cursor-pointer">
            <Link
              className={`link ${pathname === "/job-search" ? "text-btnColor" : ""}`}
              href="/job-search"
            >
              Candidate Profile
            </Link>
          </li>
        </ul>
        {isOpen ? (
          <RxCross2
            onClick={toggleSidebar}
            className="text-white text-3xl block md:hidden"
          />
        ) : (
          <GiHamburgerMenu
            onClick={toggleSidebar}
            className="text-white text-3xl block md:hidden"
          />
        )}
        {/* </div> */}
        <div className="flex items-center gap-3 md:gap-0 justify-end">
          <div className="w-full flex items-center  justify-end lg:ml-24 md:ml-10 gap-5">
            {loading ? (
              <div className="w-full h-10 bg-slate-800 rounded animate-pulse"></div>
            ) : (
              <>
                {!isAuthenticated && <Onboarding />}
                {isAuthenticated && <NavAction onLogout={logoutHandler} />}
              </>
            )}
          </div>
        </div>
      </nav>
      <Sidebar toggleSidebar={toggleSidebar} isOpen={isOpen} />
    </>
  );
};

export default Navbar;
