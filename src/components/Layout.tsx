import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-[100vh] dark:bg-black bg-[#ccdadd]">
      <Outlet />
    </div>
  );
}
