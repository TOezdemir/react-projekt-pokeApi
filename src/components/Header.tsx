import logo from "../assets/logo.png";

const Header = () => {
  return (
    <div>
      <div className="flex justify-center items-center dark:bg-black pt-8">
        <img src={logo} alt="" />
      </div>
    </div>
  );
};

export default Header;
