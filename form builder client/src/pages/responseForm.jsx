import React from "react";

const ResponseForm = ({ openResponse, setIsResponseOpen }) => {
  return (
    <div>
      <div className="w-full flex relative top-[-10px] justify-end">
        <button
          onClick={() => {
            // now reset al the state value and close the modal

            setIsResponseOpen(false);
          }}
          className="px-2 py-[2px] bg-red-500 hover:bg-rose-600 rounded-md font-semibold text-white"
        >
          close
        </button>
      </div>

      <form
        action=""
        className="border-2 flex flex-col gap-4  rounded-lg my-4 py-4 px-2"
      >
        {openResponse?.fields?.length > 0 &&
          openResponse?.fields.map((field, index) => (
            <div key={index} className="border-2 bg-slate-300 rounded-lg p-4">
              {/* {fieldName,fieldType,fieldLabel,fieldIsRequired} */}
              <label
                htmlFor={field?.fieldName}
                className={`${field?.fieldType === "checkbox" && "flex"}`}
              >
                <div>
                  <h1 className="font-semibold">
                    {field?.fieldLabel?.label}{" "}
                    {` ${field?.fieldIsRequired && "*"}`}
                  </h1>
                  {field?.fieldLabel?.photo && (
                    <img
                      className="w-[100px]"
                      src={field?.fieldLabel?.photo}
                      alt=""
                    />
                  )}
                </div>
                <input
                
                  readOnly
                  defaultValue={field?.answer}
                  name={field?.fieldName}
                  className={`border-2 px-2 ${
                    field?.fieldType === "checkbox" ? "ms-4 w-[18px]" : "w-full"
                  } bg-slate-100`}
                  type={
                    field?.fieldType === "password" ? "text" : field?.fieldType
                  }
                />
              </label>
            </div>
          ))}
      </form>
    </div>
  );
};

export default ResponseForm;
