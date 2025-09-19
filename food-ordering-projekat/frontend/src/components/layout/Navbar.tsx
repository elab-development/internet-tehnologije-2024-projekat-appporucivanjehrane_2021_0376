import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Dropdown } from "flowbite-react";
import { MdLogin, MdLogout, MdOutlineAccountBox } from "react-icons/md";

import UserPlaceholder from "../../assets/userplaceholder.png";
import LogoShort from "../../assets/logo-short.png";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="border-gray-200 bg-white">
      <div className="mx-10 flex flex-wrap items-center justify-between p-4">
        <Link
          to={"/"}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={LogoShort} className="h-8" alt="logo" />
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
            Food
          </span>
        </Link>
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
        >
          <svg
            className="size-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div className="hidden flex-row items-center gap-4 md:flex">
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse">
              <li>
                <Link
                  to="/"
                  className="block rounded-sm px-3 py-2 font-semibold text-gray-900 hover:text-red-500 md:bg-transparent md:p-0 "
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/restaurants"
                  className="block rounded-sm px-3 py-2 font-semibold text-gray-900 hover:bg-gray-100 hover:text-red-500 md:border-0 md:p-0 md:hover:bg-transparent"
                >
                  Restaurants
                </Link>
              </li>
            </ul>
          </div>
          <Dropdown
            label=""
            dismissOnClick={false}
            renderTrigger={() => (
              <div className="cursor-pointer rounded-full bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-400">
                Get Started
              </div>
            )}
          >
            <Link to={"/login"}>
              <Dropdown.Item icon={MdLogin}>Login</Dropdown.Item>
            </Link>
            <Link to={"/register"}>
              <Dropdown.Item icon={MdOutlineAccountBox}>Register</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Link to={"/login/restaurant"}>
              <Dropdown.Item icon={MdLogin}>Login Restaurant</Dropdown.Item>
            </Link>
            <Link to={"/register/restaurant"}>
              <Dropdown.Item icon={MdOutlineAccountBox}>
                Register Restaurant
              </Dropdown.Item>
            </Link>
          </Dropdown>

          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="User settings" img={UserPlaceholder} rounded />}
          >
            <Dropdown.Header>
              <span className="block text-sm">John Doe</span>
              <span className="block truncate text-sm font-medium">
                john@mail.com
              </span>
            </Dropdown.Header>
            <Dropdown.Item>
              <Link to={"/profile"}>Profile</Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item icon={MdLogout}>Sign out</Dropdown.Item>
          </Dropdown>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="flex md:hidden">
          <ul className="mt-4 flex w-full flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse">
            <li>
              <Link
                to="/"
                className="block rounded-sm px-3 py-2 text-gray-900 hover:bg-gray-100 md:bg-transparent "
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/restaurants"
                className="block rounded-sm px-3 py-2 text-gray-900 hover:bg-gray-100"
              >
                Restaurants
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="block rounded-sm px-3 py-2 text-gray-900 hover:bg-gray-100"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="block rounded-sm px-3 py-2 text-gray-900 hover:bg-gray-100"
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="block rounded-sm px-3 py-2 text-gray-900 hover:bg-gray-100"
              >
                Profile
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;