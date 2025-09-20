import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Dropdown } from "flowbite-react";
import { MdLogin, MdLogout, MdMenu, MdOutlineAccountBox } from "react-icons/md";
import { LuShoppingCart } from "react-icons/lu";

import UserPlaceholder from "../../assets/userplaceholder.png";
import LogoShort from "../../assets/logo-short.png";
import { useCartContext } from "../../context/useCartContext.hook";
import CartDishCard from "../restaurants/CartDishCard";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { cart, clearCart } = useCartContext();

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleCheckout = () => {
    clearCart();
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
          <MdMenu size={32} />
        </button>

        {/* DESKTOP MENU START */}
        <div className="hidden flex-row items-center gap-4 md:flex">
          <div className="hidden w-full md:block md:w-auto">
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

          <Dropdown
            label=""
            dismissOnClick={false}
            renderTrigger={() => (
              <div className="relative cursor-pointer">
                <LuShoppingCart className="text-red-600" size={24} />
                <span className="absolute -right-3 -top-3 rounded-full bg-red-600 px-1 text-sm font-semibold text-white">
                  {cart?.totalQuantity}
                </span>
              </div>
            )}
            className="w-[300px] rounded-xl shadow-lg"
          >
             <div className="px-4 pb-4 pt-2">
              <h2 className="mb-4 text-xl font-extrabold">Your Cart</h2>
              {cart.allDishes.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {cart.allDishes.map((dish) => (
                    <CartDishCard
                      key={dish.dish._id}
                      dish={dish.dish}
                      quantity={dish.quantity}
                    />
                  ))}

                  <button
                    type="button"
                    onClick={handleCheckout}
                    className="mt-2 flex w-full justify-center rounded-full bg-red-600 py-1 text-lg font-medium text-white"
                  >
                    {`Checkout $${cart.totalPrice.toFixed(2)}`}
                  </button>
                </div>
              ) : (
                <p className="font-medium">No dishes added!</p>
              )}
            </div>
          </Dropdown>
        </div>
        {/* DESKTOP MENU END */}
      </div>
      {mobileMenuOpen && (
        
        {/* MOBILE MENU */}
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