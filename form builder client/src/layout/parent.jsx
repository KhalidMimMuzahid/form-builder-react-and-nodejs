import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import { UserContext } from "../context/UserProvider";

const Parent = () => {
  // this state is for tracking who have just visied this site
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const haandleFormSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    setCurrentUser(name);
    // console.log("name: ", name);
  };

  return currentUser ? (
    <div className="max-x max-w-[1024px] mx-auto">
      <Navbar />
      <Outlet />
    </div>
  ) : (
    // before entering our main App. user need to enter their name
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[20010] outline-none focus:outline-none">
        <div className="relative w-[360px]  sm:w-[400px] md:w-[600px] lg-[700px]  py-2 sm:py-4 lg:py-4 px-2 sm:px-4 md:px-6 mx-auto max-w-3xl  bg-white rounded-lg shadow-2xl">
          {/*content*/}
          <form
            onSubmit={haandleFormSubmit}
            action=""
            className="flex flex-col py-4 gap-4"
          >
            <label htmlFor="userName">What's your name?</label>
            <input
              type="text"
              required
              name="name"
              className="border border-black px-2 py-1"
              placeholder="type your name"
            />
            <button
              type="submit"
              className="border border-black py-1 bg-slate-600 hover:bg-slate-800 hover:cursor-pointer text-white  rounded-lg inline"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0  z-[20000] bg-black"></div>
    </>
  );
};

export default Parent;
