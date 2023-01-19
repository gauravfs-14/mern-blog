import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  let login = window.localStorage.getItem("isLogin");
  const [isLogin, setIsLogin] = useState(login);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/user/status", {
      credentials: "same-origin",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((res) => {
      if (res.status == 200) setIsLogin(true);
      setIsLogin(false);
    });
  }, []);

  const logout = () => {
    fetch("http://localhost:8080/api/user/logout").then((res) => {
      setIsLogin(false);
      setUserInfo(null);
      window.localStorage.removeItem("isLogin");
      window.localStorage.setItem("isLogin", false);
    });
  };

  const value = {
    isLogin,
    setIsLogin,
    userInfo,
    setUserInfo,
    logout,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
