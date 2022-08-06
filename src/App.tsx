import { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

import Auth from "./pages/Auth";
import Products from "./pages/Products";
import TestProtectedPage from "./pages/TestProtectedPage";

export type emtyObj = Record<string, never>;
export interface User {
  id: string;
  name: string;
  email: string;
}

// user context
import UserContext from "./context/userContext";

// get user
let localUser = {};
try {
  const data = JSON.parse(localStorage.getItem("user") || "{}");
  if (data.id && data.name && data.email) localUser = data;
} catch (error) {
  console.log(error);
}

function App() {
  const [user, setUser] = useState<User | emtyObj>(localUser);

  const Protected = ({
    guest,
    children,
  }: {
    guest?: boolean;
    children: React.ReactElement;
  }): React.ReactElement => {
    if (!!guest === !!user.id) return <Navigate to="/" replace />;
    return children;
  };

  return (
    <div className="h-screen w-full flex items-center justify-center flex-wrap">
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route
              path="auth"
              element={
                <Protected guest>
                  <Auth />
                </Protected>
              }
            />
            <Route
              path="/test-protected"
              element={
                <Protected>
                  <TestProtectedPage />
                </Protected>
              }
            />
            <Route path="product">
              <Route
                index
                element={
                  <Protected>
                    <Products />
                  </Protected>
                }
              />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

const Home = () => {
  const [text, setText] = useState("Hello....");
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="font-bold text-6xl tracking-widest">{text}</h1>
      {!user.id ? (
        <Link to={"/auth"}>
          <button className="px-2 py-1 font-semibold text-xl border-2 border-indigo-500 rounded mt-2">
            Login / Register
          </button>
        </Link>
      ) : (
        <div className="flex">
          <Link to={"/product"}>
            <button className="mr-2 px-2 py-1 font-semibold text-xl border-2 border-indigo-500 rounded mt-2">
              Products
            </button>
          </Link>
          <button
            onClick={() => {
              setUser({});
              localStorage.removeItem("user");
            }}
            className="px-2 py-1 font-semibold text-xl border-2 border-indigo-500 rounded mt-2"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
