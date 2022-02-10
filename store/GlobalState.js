import { createContext, useEffect, useReducer } from "react";
import reducers from "./Reducers";
import { getData } from "../utils/fecthData";
import Cookies from "js-cookie";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const initialState = { auth: {} };
  const [state, dispatch] = useReducer(reducers, initialState);
  const { auth } = state;

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    const refreshToken = Cookies.get("refreshtoken");

    if (firstLogin) {
      getData("admin/accessToken", refreshToken).then((res) => {
        if (res.err) {
          localStorage.removeItem("firstLogin");
          Cookies.remove("refreshtoken", { path: process.env.BASE_URL });
        }

        dispatch({
          type: "AUTH",
          payload: {
            token: res.access_token,
            user: res.user,
          },
        });
      });
    }
  }, []);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
