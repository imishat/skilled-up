import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const pathname = usePathname();
  return (
    <div
      className={`flex z-10 md:hidden fixed top-20 left-0 h-screen ${isOpen ? "sidebar-open" : "sidebar-closed w-0"}`}
    >
      <div
        className={`w-64 bg-black/90 p-4 transition-all duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="text-[#bed6f3] text-center space-y-5 text-lg lg:ml-32 md:ml-10">
          <li className="hover:text-[#FF3988] cursor-pointer">
            <Link
              className={`link ${pathname === "/home" ? "text-[#ffffff]" : ""}`}
              href="/home"
              onClick={() => toggleSidebar(!isOpen)}
            >
              Home
            </Link>
          </li>
          <li className="hover:text-[#FF3988] cursor-pointer">
            <Link
              className={`link ${pathname === "/job-post" ? "text-[#ffffff]" : ""}`}
              href="/job-post"
              onClick={() => toggleSidebar(!isOpen)}
            >
              Job Post
            </Link>
          </li>
          <li className="hover:text-[#FF3988] cursor-pointer">
            <Link
              className={`link ${pathname === "/job-search" ? "text-[#ffffff]" : ""}`}
              href="/job-search"
              onClick={() => toggleSidebar(!isOpen)}
            >
              Candidate Profile
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
