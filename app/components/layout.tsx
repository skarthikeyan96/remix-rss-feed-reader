import { NavLink } from "@remix-run/react";

const Layout = ({ children }: any) => {
  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-8 flex-col md:flex-row items-center">
          <NavLink
            to="/"
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <span className="text-xl">Transcribe</span>
          </NavLink>

          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
            <NavLink to={"/add"} className="mr-5 hover:text-gray-900">
              Add Feed
            </NavLink>
          </nav>
        </div>
      </header>
      <div className="mx-auto container p-8">{children}</div>
    </>
  );
};

export default Layout;
