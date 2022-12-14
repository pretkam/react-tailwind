import React, { createContext } from "react";

export type emtyObj = Record<string, never>;

export interface User {
  id: string;
  name: string;
  email: string;
}

interface userContext {
  user: User | emtyObj;
  setUser: (() => void) | React.Dispatch<React.SetStateAction<User | emtyObj>>;
}

const UserContext = createContext<userContext>({ user: {}, setUser: () => {} });

export default UserContext;
