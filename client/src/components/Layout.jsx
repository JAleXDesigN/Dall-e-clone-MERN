import { Link, Outlet, useLocation } from "react-router-dom";
import { logo } from "../assets";

const Layout = () => {
  const { pathname } = useLocation();
  return (
    <>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4  border-b border-b-[#e6ebf4] h-[73px]">
        <Link to="/" aria-label="Logo">
          <img src={logo} alt="Logo Brand" className="w-28 object-contain" />
        </Link>
        {pathname === "/" && (
          <Link
            to="/create-post"
            className="font-inter font-bold bg-[#6469ff] text-white px-4 py-2 rounded-md hover:bg-[#9498ff]"
          >
            Create Post
          </Link>
        )}
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
