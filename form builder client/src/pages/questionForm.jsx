import React, { useContext, useEffect, useState } from "react";
import FillUpForm from "./fillUpForm";
import { UserContext } from "../context/UserProvider";

const QuestionForm = () => {
  const {currentUser} = useContext(UserContext)
  const [forms, setForms] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [openForm, setOpenForm]= useState({})
  useEffect(() => {
    fetch("https://form-builder-server-chi.vercel.app/formCollection")
      .then((res) => res.json())
      .then((data) => {
        console.log("dataL: ", data);
        setForms(data);
      });
  }, []);
  return (
    <div>
      <h1>QuestionForm</h1>

      <div
        className="flex  flex-col gap-4  rounded-lg my-4 py-4 px-2"
      >
        {forms?.length > 0 &&
          forms.map(({ createdBy, formName, fields }, index) => (
            <div
              className="border-2 bg-slate-300   rounded-lg p-4 flex justify-between items-center"
              key={index}
            >
              <div className=" flex flex-col justify-start items-start">
                <h1 className="text-xl font-bold">{formName}</h1>
                <h1 className="text-lg">Created by, <span className="font-semibold">{createdBy}</span></h1>
              </div>
              <div>
                <button onClick={()=> {
                  setOpenForm({ createdBy, formName, fields })
                  setIsFormOpen(true)
                }}className="border border-black px-4 py-2 rounded-lg font-semibold text-white bg-slate-500 hover:bg-slate-600">
                  Fill Up
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* modal for fill-up form  */}
      {isFormOpen && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[20010] outline-none focus:outline-none">
            <div className="relative w-full mx-4  py-2 sm:py-4 lg:py-4 px-2 sm:px-4 md:px-6 max-w-3xl max-h-[80vh] overflow-y-auto  bg-white rounded-lg shadow-2xl">
              {/*content*/}

              <FillUpForm currentUser={currentUser} setIsFormOpen={setIsFormOpen} openForm={openForm}/>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0  z-[20000] bg-black"></div>
        </>
      )}
    </div>
  );
};

export default QuestionForm;
