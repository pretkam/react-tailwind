import React, { createContext } from "react";
import { emtyObj, User } from "../App";

interface userContext {
  user: User | emtyObj;
  setUser: (() => void) | React.Dispatch<React.SetStateAction<User | emtyObj>>;
}

const UserContext = createContext<userContext>({ user: {}, setUser: () => {} });

export default UserContext;
