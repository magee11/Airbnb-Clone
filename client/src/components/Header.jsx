import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../pages/userContext";

function Header() {
  const { user } = useContext(userContext);
  console.log("====================================");
  console.log(user);
  console.log("====================================");
  return (
    <header className="p-4 flex justify-between">
      {/* Logo image */}
      <Link to={"/"} href="" className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-8 h-8 -rotate-90"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
        <span className="font-bold text-xl ">Airbnb</span>
      </Link>

      {/* head center search bar */}
      <div className="flex border gap-2 border-gray-300 py-1 px-3 rounded-full shadow-md shadow-gray-300">
        <div>anywhere</div>
        <div className="border border-gray-300"></div>
        <div>any week</div>
        <div className="border border-gray-300"></div>

        <div>add guest</div>
        <button className="bg-primary p-1.5 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>

      {/* user button */}
      <div className="flex border gap-2 border-gray-300 py-1 px-3 rounded-full items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <Link
          to={user ? "/account" : "/login"}
          className="bg-gray-500  rounded-full text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 relative top-1 overflow-hidden"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
        {console.log(user,"user")}
        {user && <div>{user.firstname}</div>}
      </div>
    </header>
  );
}

export default Header;
