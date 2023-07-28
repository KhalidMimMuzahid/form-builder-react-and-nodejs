import React, { useEffect, useState } from "react";
import ResponseForm from "./responseForm";

const FormRespond = () => {
  const [responses, setResponses] = useState([]);
  const [isResponseOpen, setIsResponseOpen] = useState(false);
  const [openResponse, setOpenResponse] = useState({});
  useEffect(() => {
    fetch("https://form-builder-server-chi.vercel.app/responseCollection")
      .then((res) => res.json())
      .then((data) => {
        console.log("dataL: ", data);
        setResponses(data);
      });
  }, []);

  return (
    <div>
      <h1>FormRespond</h1>

      <div className="flex  flex-col gap-4  rounded-lg my-4 py-4 px-2">
        {responses?.length > 0 &&
          responses?.map(
            ({ createdBy, formName, fields, submittedBy }, index) => (
              <div
                className="border-2 bg-slate-300   rounded-lg p-4 flex justify-between items-center"
                key={index}
              >
                <div className=" flex flex-col justify-start items-start">
                  <h1 className="text-xl font-bold">{formName}</h1>
                  <h1 className="text-lg">
                    Created by,{" "}
                    <span className="font-semibold">{createdBy}</span>
                  </h1>
                  <h1 className="text-lg">
                    Submitted by,{" "}
                    <span className="font-semibold">{submittedBy}</span>
                  </h1>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setOpenResponse({
                        createdBy,
                        formName,
                        fields,
                        submittedBy,
                      });
                      setIsResponseOpen(true);
                    }}
                    className="border border-black px-4 py-2 rounded-lg font-semibold text-white bg-slate-500 hover:bg-slate-600"
                  >
                    Fill Up
                  </button>
                </div>
              </div>
            )
          )}
      </div>
      {/* modal for response form  */}
      {isResponseOpen && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[20010] outline-none focus:outline-none">
            <div className="relative w-full mx-4  py-2 sm:py-4 lg:py-4 px-2 sm:px-4 md:px-6 max-w-3xl max-h-[80vh] overflow-y-auto  bg-white rounded-lg shadow-2xl">
              {/*content*/}

              <ResponseForm
                openResponse={openResponse}
                setIsResponseOpen={setIsResponseOpen}
              />
            </div>
          </div>
          <div className="opacity-25 fixed inset-0  z-[20000] bg-black"></div>
        </>
      )}
    </div>
  );
};

export default FormRespond;
