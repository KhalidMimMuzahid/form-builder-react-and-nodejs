import React, { useState } from "react";
import uploadPhoto from "../utils/uploadPhoto";
import { toast } from "react-toastify";

const FormBuilderForm = ({ currentUser, setIsFormBuilding }) => {
  const [formName, setFormName] = useState("");
  const [fields, setFields] = useState([]);
  const [addFieldStatus, setAddFieldStatus] = useState(false);
  const [fieldName, setFieldName] = useState("");
  const [fieldType, setFieldType] = useState("text");
  const [fieldLabel, setFieldLabel] = useState({
    label: "",
    photo: null,
  });
  const [fieldIsRequired, setFieldIsRequired] = useState(false);

  const handleFieldAdd = async (e) => {
    e.preventDefault();
    // regex for javascript variable declaration 
    const regex = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
    const isValidVariableName = regex.test(fieldName);
    if (!isValidVariableName) {
      return alert(
        "field name will be a Javascript variable name.\nplease follow the variable declaration rule"
      );
    }

    if (fieldLabel?.photo) {
      const photoData = await uploadPhoto(fieldLabel?.photo);
      const photoInfo = await photoData.json();

      if (photoInfo?.success) {
        setFields((prev) => {
          return [
            ...prev,
            {
              fieldName,
              fieldType,
              fieldLabel: {
                ...fieldLabel,
                photo: photoInfo?.data?.display_url,
              },
              fieldIsRequired,
            },
          ];
        });
      } else {
        // alert
        toast.error("photo could not be uploaded,\nplease try again");
      }
    } else {
      setFields((prev) => {
        return [...prev, { fieldName, fieldType, fieldLabel, fieldIsRequired }];
      });
    }

    // now reset al the state value
    setAddFieldStatus(false);
    setFieldName("");
    setFieldType("text");
    setFieldLabel({
      label: "",
      photo: null,
    });
    setFieldIsRequired(false);
    e.reset;
  };
  const createForm = () => {
    if (!formName) {
      alert("please provide a form name");
      return;
    }
    const formDetails = {
      createdBy: currentUser,
      formName,
      fields,
    };
    fetch("https://form-builder-server-chi.vercel.app/formCollection", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data: ", data);
        if (data?.success) {
          toast.success(data?.message);
          // now reset al the state value and close the modal
          setAddFieldStatus(false);
          setFieldName("");
          setFieldType("text");
          setFieldLabel({
            label: "",
            photo: null,
          });
          setFieldIsRequired(false);
          setIsFormBuilding(false);
        } else {
          toast.error(data?.message);
        }
      });
  };
  return (
    <div>
      <div className="w-full flex relative top-[-10px] justify-between">
        <div className="flex gap-2">
          <label htmlFor="form-label">Form Name:</label>
          <input
            onChange={(e) => {
              setFormName(e.target.value);
            }}
            type="text"
            name=""
            id="form-label"
            className="border-2 border-black px-2 py-0"
          />
        </div>
        <button
          onClick={() => {
            // now reset al the state value and close the modal
            setAddFieldStatus(false);
            setFieldName("");
            setFieldType("text");
            setFieldLabel({
              label: "",
              photo: null,
            });
            setFieldIsRequired(false);
            setIsFormBuilding(false);
          }}
          className="px-2 py-[2px] bg-red-500 hover:bg-rose-600 rounded-md font-semibold text-white"
        >
          close
        </button>
      </div>
      <div className="border-2 px-2 py-2 rounded-lg">
        <div className="w-full flex justify-center my-2">
          <button
            className="border rounded-md px-4 py-2 bg-slate-200 hover:bg-slate-400"
            onClick={() => {
              setAddFieldStatus(true);
            }}
          >
            add field
          </button>
        </div>
        {addFieldStatus && (
          <form
            action=""
            onSubmit={handleFieldAdd}
            className="flex flex-col gap-2"
          >
            {/* field name  */}
            <div className="flex  gap-2 justify-between">
              <label className="font-semibold" htmlFor="field-name">
                FIeld Name:{" "}
              </label>
              <input
                placeholder="type field name"
                className="border-2 px-2 grow"
                required
                type="text"
                id="field-name"
                onChange={(event) => {
                  setFieldName(event.target.value);
                }}
              />
            </div>
            <div className="flex  gap-2  justify-between">
              <label className="font-semibold" htmlFor="input-type">
                select input type
              </label>
              <select
                className="border-2 px-2 grow"
                required
                id="input-type"
                value={fieldType}
                onChange={(event) => setFieldType(event.target.value)}
              >
                <option value="text">text</option>
                <option value="checkbox">checkbox</option>
                <option value="email">email</option>
                <option value="password">password</option>
                <option value="url">url</option>
                <option value="email">email</option>
              </select>
            </div>

            {/* field label  */}
            <div className="flex  gap-2  justify-between">
              <label className="font-semibold" htmlFor="field-label">
                Question/Label
              </label>
              <input
                required
                placeholder="type your question/label"
                className="border-2 px-2 grow "
                type="text"
                id="field-label"
                onChange={(event) => {
                  setFieldLabel((prev) => {
                    return { ...prev, label: event.target.value };
                  });
                }}
              />
            </div>
            {/* label  photo*/}
            <div className="flex  gap-2  justify-between">
              <label className="font-semibold" htmlFor="label-photo">
                photo if needed
              </label>
              <input
                name="photoForLabel"
                className="grow"
                type="file"
                id="label-photo"
                onChange={(event) => {
                  setFieldLabel((prev) => {
                    return { ...prev, photo: event?.target?.files[0] };
                  });
                }}
              />
            </div>
            {/* field is required or not  */}
            <div className="flex  gap-2">
              <label htmlFor="check-required" className="font-semibold">
                check if this field is required
              </label>
              <input
                type="checkbox"
                name=""
                checked={fieldIsRequired}
                onChange={() => {
                  setFieldIsRequired((prev) => (prev ? false : true));
                }}
                id="check-required"
              />
            </div>
            {/* add this field  */}

            <div className="w-full flex justify-center my-4">
              <button
                className="border rounded-md px-4 py-2 bg-slate-200 hover:bg-slate-400"
                type="submit"
              >
                Add
              </button>
            </div>
          </form>
        )}
      </div>
      <div className="">
        <h1 className="text-lg font-bold text-center my-2">form preview</h1>
        <form
          action=""
          className="border-2 flex flex-col gap-4  rounded-lg my-4 py-4 px-2"
        >
          {fields?.length > 0 &&
            fields.map((field, index) => (
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
                    className={`border-2 px-2 ${
                      field?.fieldType === "checkbox"
                        ? "ms-4 w-[18px]"
                        : "w-full"
                    } bg-slate-100`}
                    type={field?.fieldType}
                    required={field?.fieldIsRequired}
                  />
                </label>
              </div>
            ))}
          {fields?.length > 0 && (
            <div className="w-full flex justify-center my-4">
              <button
                disabled
                type="submit"
                className="border rounded-md px-4 py-2 bg-slate-200 hover:bg-slate-400"
              >
                Submit
              </button>
            </div>
          )}
        </form>
      </div>
      {fields?.length > 0 && (
        <div className="w-full flex justify-center">
          <button
            className="border rounded-md px-4 py-2 bg-slate-200 hover:bg-slate-400"
            onClick={createForm}
          >
            Create Form
          </button>
        </div>
      )}
    </div>
  );
};

export default FormBuilderForm;
