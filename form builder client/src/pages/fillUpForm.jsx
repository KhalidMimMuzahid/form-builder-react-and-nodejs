import React, { useState } from "react";
import uploadPhoto from "../utils/uploadPhoto";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
const FillUpForm = ({ currentUser, setIsFormOpen, openForm }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const handleFormSubmit = (data) => {
    const fieldResponse = openForm?.fields.map((field) => {
      const answer = data[field?.fieldName];
      const newFieldResponse = { ...field, answer };
      return newFieldResponse;
    });
    const formResponse = {
      ...openForm,
      fields: fieldResponse,
      submittedBy: currentUser,
    };
    // console.log("formResponse: ", formResponse);

    fetch("https://form-builder-server-chi.vercel.app/formResponse", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formResponse),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data: ", data);
        if (data?.success) {
          toast.success(data?.message);
         
          reset()
          setIsFormOpen(false);
          // now reset the form
        } else {
          toast.error(data?.message);
        }
      });
  };
  return (
    <div>
      <div className="w-full flex relative top-[-10px] justify-end">
        <button
          onClick={() => {
            // now reset al the state value and close the modal

            setIsFormOpen(false);
          }}
          className="px-2 py-[2px] bg-red-500 hover:bg-rose-600 rounded-md font-semibold text-white"
        >
          close
        </button>
      </div>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        action=""
        className="border-2 flex flex-col gap-4  rounded-lg my-4 py-4 px-2"
      >
        {openForm?.fields?.length > 0 &&
          openForm?.fields.map((field, index) => (
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
                  {...register(field?.fieldName, {
                    required: {
                      value: field?.fieldIsRequired,
                      message: "this field is required",
                    },
                  })}
                  className={`border-2 px-2 ${
                    field?.fieldType === "checkbox" ? "ms-4 w-[18px]" : "w-full"
                  } bg-slate-100`}
                  type={field?.fieldType}
                />
                {errors[field?.fieldName] && (
                  <p role="alert" className="text-red-500 font-bold">
                    {errors[field?.fieldName]?.message}
                  </p>
                )}
              </label>
            </div>
          ))}
        {openForm?.fields?.length > 0 && (
          <div className="w-full flex justify-center my-4">
            <button
              type="submit"
              className="border rounded-md px-4 py-2 bg-slate-200 hover:bg-slate-400"
            >
              Submit
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default FillUpForm;
