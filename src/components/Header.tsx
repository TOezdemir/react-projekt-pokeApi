import { useState } from "react";
import logo from "../assets/logo.png";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <div className={`${darkMode && "dark"}`}>
      <div className="flex justify-center items-center dark:bg-neutral-900">
        <img src={logo} alt="" />
        <button
          className="absolute w-16 h-16 buttom-16 right-16 bg-neutral-900 dark:bg-white rounded-full text-white dark:text-black font-semibold"
          onClick={toggleDarkMode}
        >
          {darkMode ? "LIGHT" : "DARK"}
        </button>
      </div>
    </div>
  );
};

export default Header;
