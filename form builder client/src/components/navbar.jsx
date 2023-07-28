import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navLinks = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "QuestionForm",
      link: "/questionform",
    },
    {
      title: "FormRespond",
      link: "/formrespond",
    },
  ];
  return (
    <div className="border rounded-md border-slate-300 shadow-xl bg-slate-200 px-4 py-2">
      <div className="flex gap-4 justify-around">
        {navLinks?.map((nav, index) => (
          <Link key={index} className="font-semibold" to={nav?.link}>
            {nav?.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
