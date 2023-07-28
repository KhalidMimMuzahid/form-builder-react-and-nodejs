import React, { createContext, useState } from "react";
export const UserContext = createContext();
const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const info = { currentUser, setCurrentUser };

  return <UserContext.Provider value={info}>{children}</UserContext.Provider>;
};

export default UserProvider;
