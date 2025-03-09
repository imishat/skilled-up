import logo from "@/public/assets/logo.jpeg";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="bg-secondary">
      <div className="container">
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-4 py-16 border-b border-white/40 lg:grid-cols-6">
          <Link href="/home">
            <Image src={logo} alt="logo" width={80} />
          </Link>

          <div className="text-center sm:text-left">
            <p className="text-lg font-medium text-white">Services</p>

            <ul className="mt-8 space-y-4 text-sm">
              <li>
                <Link
                  className="text-white/70 transition hover:text-white"
                  href="/home"
                >
                  Browse Jobs
                </Link>
              </li>

              <li>
                <Link
                  className="text-white/70 transition hover:text-white"
                  href="/home"
                >
                  Companies
                </Link>
              </li>

              <li>
                <Link
                  className="text-white/70 transition hover:text-white"
                  href="/home"
                >
                  Candidates
                </Link>
              </li>

              <li>
                <Link
                  className="text-white/70 transition hover:text-white"
                  href="/home"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <p className="text-lg font-medium text-white">Company</p>

            <ul className="mt-8 space-y-4 text-sm">
              <li>
                <Link
                  className="text-white/70 transition hover:text-white"
                  href="/home"
                >
                  About us
                </Link>
              </li>

              <li>
                <Link
                  className="text-white/70 transition hover:text-white"
                  href="/home"
                >
                  Blogs
                </Link>
              </li>

              <li>
                <Link
                  className="text-white/70 transition hover:text-white"
                  href="/home"
                >
                  FAQ’s
                </Link>
              </li>

              <li>
                <Link
                  className="text-white/70 transition hover:text-white"
                  href="/home"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <p className="text-lg font-medium text-white">Support</p>

            <ul className="mt-8 space-y-4 text-sm">
              <li>
                <Link
                  className="text-white/70 transition hover:text-white"
                  href="/home"
                >
                  Terms of use
                </Link>
              </li>

              <li>
                <Link
                  className="text-white/70 transition hover:text-white"
                  href="/home"
                >
                  Terms & conditions
                </Link>
              </li>

              <li>
                <Link
                  className="text-white/70 transition hover:text-white"
                  href="/privacy"
                >
                  Privacy
                </Link>
              </li>

              <li>
                <Link
                  className="text-white/70 transition hover:text-white"
                  href="/home"
                >
                  Cookie policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left md:col-span-4 lg:col-span-2">
            <p className="text-lg font-medium text-white">Stay in Touch</p>

            <div className="mx-auto mt-8 max-w-md sm:ms-0">
              <p className="text-white/70">
                Join & get important new regularly
              </p>
              <form className="mt-4 flex items-center justify-center">
                <input
                  className="w-full rounded-l-xl outline-none border-gray-200 px-6 py-3 shadow-sm"
                  type="email"
                  placeholder="Enter your email"
                />

                <button
                  className="block rounded-r-xl bg-btnColor px-5 py-3 font-medium text-primary"
                  type="submit"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        <footer className="bg-secondary">
          <div className="flex flex-col items-center justify-between p-6 mx-auto space-y-4 sm:space-y-0 sm:flex-row">
            <div className="text-white/60">
              <Link href="/home" className="font-bold">
                Privacy & Terms.
              </Link>
              <Link href="/home" className="font-bold">
                Contact Us
              </Link>
            </div>
            <p className="text-sm text-gray-600">
              © Copyright 2021. All Rights Reserved.
            </p>
            <div className="flex -mx-2">
              <Link
                href="/home"
                className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500"
                aria-label="What'sapp"
              >
                <FaWhatsapp />
              </Link>
              <Link
                href="/home"
                className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </Link>
              <Link
                href="/home"
                className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500"
                aria-label="Linkedin"
              >
                <FaLinkedinIn />
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
