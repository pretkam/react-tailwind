import { useContext, useState } from "react";

import axios from "axios";

import { User } from "../App";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import UserContext from "../context/userContext";
import { Navigate } from "react-router-dom";

export default function Auth() {
  const [action, setAction] = useState("login");
  const { user, setUser } = useContext(UserContext);

  const login = async (email: string, password: string) => {
    //await axios.post("/login");
    const user: User = { id: "testId", name: email.split("@")[0], email };
    setAppUser(user);
  };

  const register = async (email: string, password: string) => {
    //await axios.get("/register");
    const user: User = { id: "testId", name: email.split("@")[0], email };
    setAppUser(user);
  };

  const setAppUser = (user: User) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));   
  };

  return action === "login" ? (
    <Login setAction={setAction} login={login} />
  ) : (
    <Register setAction={setAction} register={register} />
  );
}
