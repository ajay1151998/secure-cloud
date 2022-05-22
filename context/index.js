import { createContext, useContext, useReducer, useEffect } from "react";
import { authReducer } from "./authReducer";
import { parseCookies, destroyCookie } from "nookies";

import axios from "axios";
import { apiUrl } from "config/api";
import { useState } from "react";
import { useRouter } from "next/router";

export const GlobalContext = createContext();

const initialState = {
  loading: false,
  token: null,
  user: null,
  error: null,
};

const GlobalProvider = ({ children }) => {
  const [auth, dispatchAuth] = useReducer(authReducer, initialState);
  const [profile, setProfile] = useState();

  const router = useRouter();

  const logOut = async () => {
    destroyCookie(null, "user");
    destroyCookie(null, "token");
    dispatchAuth({ type: "AUTH_RESET" });
    router.push("/");
  };

  useEffect(() => {
    dispatchAuth({ type: "AUTH_LOADING" });
    async function loadUserFromCookies() {
      const { token, user } = parseCookies();
      if (!!token && !!user) {
        auth.token = token;
        auth.user = JSON.parse(user);
        dispatchAuth({
          type: "LOGIN_SUCCESS",
          payload: { token, user: auth.user },
        });

        if (auth?.user?.role?.id === 1) {
          var role = "drivers";
        }

        const res = await axios.get(
          `${apiUrl}/${role}/${auth?.user?.profileId}`,
          {
            headers: {
              authorization: `Bearer ${auth.token}`,
            },
          }
        );
        const result = await res.data;
        setProfile(result);
      } else {
        dispatchAuth({ type: "LOGIN_FAILED" });
      }
    }
    loadUserFromCookies();
  }, []);

  return (
    <GlobalContext.Provider value={{ auth, dispatchAuth, logOut, profile }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useAuth = () => useContext(GlobalContext);

export default GlobalProvider;
