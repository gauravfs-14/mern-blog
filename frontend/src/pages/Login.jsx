import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

const Login = () => {
  const { isLogin, setIsLogin } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    isLogin ? navigate("/") : null;
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const submitHandler = async (e) => {
    setErrorText("");
    e.preventDefault();
    if (!email || !password) {
      setErrorText("Please fill out required fields");
      return false;
    }
    if (password.length < 8) {
      setErrorText("Password must be at least 8 characters");
      return false;
    }
    const response = await fetch("http://localhost:8080/api/user/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (response.status == 200) {
      setIsLogin(true);
      window.localStorage.setItem("isLogin", true);
      navigate("/");
    }
    const res = await response.json();
    if (res.message) {
      setErrorText(res.message);
    }
  };
  return (
    <>
      <h2 className="text-center text-4xl pt-10">Login</h2>
      <form
        className="w-screen flex flex-col gap-5 py-10 px-5 max-w-[500px] md:max-w-[80%] lg:max-w-[60%] mx-auto"
        onSubmit={(e) => submitHandler(e)}
      >
        <p>{errorText}</p>
        <input
          type="email"
          placeholder="Email"
          className="p-3 outline-none border-b-2 border-emerald-400 "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 outline-none border-b-2 border-emerald-400 "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="submit"
          value="Login"
          className="py-2 px-10 max-w-[300px] bg-emerald-400 rounded-lg mx-auto cursor-pointer"
        />
      </form>
    </>
  );
};

export default Login;
