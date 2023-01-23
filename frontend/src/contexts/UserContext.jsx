import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(null);
  useEffect(() => {
    const loginStatus = async () => {
      const res = await axios.get("http://localhost:8080/api/user/status");
      setIsLogin(res.data);
    };
    loginStatus();
  }, []);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  // console.log(error);
  const login = async (email, password) => {
    if (isLogin == false) {
      try {
        const res = await axios.post("http://localhost:8080/api/user/login", {
          email: email,
          password: password,
        });
        if (res.status == 200) {
          setIsLogin(true);
          return true;
        } else {
          setIsLogin(false);
          setError(res.data.message);
          return false;
        }
      } catch (err) {
        setIsLogin(false);
        // console.log(err.response.data.message);
        setError(err.response.data.message);
        return false;
      }
    } else {
      return false;
    }
  };

  const logout = () => {
    axios
      .get("http://localhost:8080/api/user/logout")
      .then((res) => (res.status == 200 ? setIsLogin(false) : setIsLogin(true)))
      .catch((err) => setError(err));
  };

  const value = {
    isLogin,
    setIsLogin,
    userInfo,
    setUserInfo,
    logout,
    login,
    error,
    setError,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
