import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import ScrollToTopButton from "../ScrollToTopButton/ScrollToTopButton";

export default function Layout() {
  let [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  function changeTheme() {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  }
  return (
    <div className={`${theme} dark:bg-slate-700 `}>
      <div className={theme}>
        <Navbar changeTheme={changeTheme} theme={theme} />
      </div>
      <div
        className={`container overflow-hidden py-20 dark:bg-slate-700   ${theme}`}
      >
        <ScrollToTopButton />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
