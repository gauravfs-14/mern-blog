import React, { useState } from "react";
import { CgMenuRight } from "react-icons/cg";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [mobileNav, setMobileNav] = useState("hidden");
  return (
    <>
      <nav className="w-screen h-[60px] flex justify-between px-5 items-center bg-gray-200">
        <div className="font-bold text-3xl">UBlog</div>
        <ul
          className={`${mobileNav} gap-4 flex-col absolute z-50 top-[60px] left-0 w-screen bg-gray-200 items-center justify-start py-10 text-lg lg:flex lg:relative lg:flex-row lg:py-0 lg:justify-end lg:bg-transparent lg:top-0`}
        >
          <li>Home</li>
          <li>Blogs</li>
          <li>Categories</li>
          <Link to="login" className="py-1 px-5 bg-emerald-400 rounded-lg">
            Login
          </Link>
        </ul>
        <CgMenuRight
          className="text-3xl lg:hidden"
          onClick={() =>
            setMobileNav(mobileNav == "hidden" ? "flex" : "hidden")
          }
        />
      </nav>
    </>
  );
};

export default Navbar;
