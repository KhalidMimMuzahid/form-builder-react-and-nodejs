import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import 'react-toastify/dist/ReactToastify.css';
import UserProvider from "./context/UserProvider.jsx";
import { ToastContainer, toast } from 'react-toastify';
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <App />
      <ToastContainer position="top-center"/>
    </UserProvider>
  </React.StrictMode>
);
