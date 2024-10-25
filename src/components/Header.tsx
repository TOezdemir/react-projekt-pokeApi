import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <div className="flex justify-center items-center dark:bg-black pt-8">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
