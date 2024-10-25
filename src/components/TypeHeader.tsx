import logo from "../assets/logo.svg";
import exit from "../assets/exit.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <div className="flex justify-center items-center gap-8 md:gap-36 lg:gap-64  dark:bg-black pt-8">
        <Link to="/">
          <img className="w-3/4" src={logo} alt="" />
        </Link>
        <Link to="/">
          <img
            className="drop-shadow-[0_4px_4px_rgba(44,114,184,1)]"
            src={exit}
            alt=""
          />
        </Link>
      </div>
    </div>
  );
};

export default Header;
