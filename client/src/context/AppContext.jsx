import { createContext, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {

  const [user,setUser] = useState(false)
  const [modal,setModal] = useState(false)

  const value = {user,setUser,modal,setModal};

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
