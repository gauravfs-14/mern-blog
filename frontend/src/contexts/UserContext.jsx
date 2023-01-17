import { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(
    window.localStorage.getItem("isLogin") &&
      window.localStorage.getItem("isLogin") == true
      ? true
      : false
  );
  const [userInfo, setUserInfo] = useState(null);

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
