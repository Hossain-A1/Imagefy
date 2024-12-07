import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(false);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  const [credit, setCredit] = useState(false);
  const [modal, setModal] = useState(false);

  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  //---------------------
  const fetchCreditsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/credits", {
        headers: { token },
      });

      if (data.success) {
        setCredit(data.payload);
      } else {
        prompt(data.message);
      }
    } catch (error) {
      prompt("Something went wrong!");
      console.log(error);
    }
  };
  //--------------------
  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/image/generate-image",
        { prompt },
        { headers: { token } }
      );

      if (data.success) {
        fetchCreditsData();
        return data.payload?.resultImage;
      } else {
        alert(data.message);
        // fetchCreditsData()
        // if(data.payload ===0){
        //   navigate('/buy')
        // }
      }
    } catch (error) {
      alert(error.message);
    }
  };

  //----------------------
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  useEffect(() => {
    if (token) {
      fetchCreditsData();
    }
  }, [token]);

  const value = {
    backendUrl,
    user,
    setUser,
    modal,
    setModal,
    token,
    setToken,
    credit,
    setCredit,
    fetchCreditsData,
    logout,
    generateImage,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
