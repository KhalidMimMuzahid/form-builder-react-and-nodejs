import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import FormBuilderForm from "../components/formBuilderForm";

const Landing = () => {
  const { currentUser } = useContext(UserContext);
  const [isFormBuilding, setIsFormBuilding] = useState(false);
  return (
    <div>
      <div className="my-8 flex justify-center">
        <h1 className="text-2xl">Welcome, <span className="font-bold">{currentUser}</span></h1>
      </div>
      <div className="flex w-full justify-center mt-12">
        <div className="px-16 inline-block   py-12 border-2 hover:cursor-pointer rounded-lg bg-slate-100" 
        onClick = {()=>setIsFormBuilding(true)}
        >
          <span className="text-lg font-bold">create new form</span>
        </div>
      </div>
{/* modal for building form  */}
      {isFormBuilding && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[20010] outline-none focus:outline-none">
            <div className="relative w-full mx-4  py-2 sm:py-4 lg:py-4 px-2 sm:px-4 md:px-6 max-w-3xl max-h-[80vh] overflow-y-auto  bg-white rounded-lg shadow-2xl">
              {/*content*/}

              <FormBuilderForm currentUser={currentUser} setIsFormBuilding={setIsFormBuilding}/>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0  z-[20000] bg-black"></div>
        </>
      )}
    </div>
  );
};

export default Landing;
