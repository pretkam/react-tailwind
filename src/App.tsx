import { useContext, useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  matchRoutes,
  useLocation,
} from "react-router-dom";

// components
import Auth from "./pages/Auth";
import Products from "./pages/Products";
import TestProtectedPage from "./pages/TestProtectedPage";
import Sidebar from "./components/web/Sidebar";

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

  const logout = () => {
    setUser({});
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="h-screen w-full flex items-center justify-center">
        <BrowserRouter>
          {user.id && <Sidebar logout={logout} />}

          {/* untuk margin */}
          <div
            className={
              (true ? "hidden " : "") +
              (user.id ? "lg:block " : "") +
              "left-0 top-0 p-5 bg-white w-[310px] shrink-0"
            }
          ></div>

          {/* main content */}
          <div
            className={
              (!user.id ? "flex items-center justify-center  " : "") +
              "w-full h-screen overflow-y-auto overflow-x-hidden"
            }
          >
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
              <Route path="*" element={<>Page not found...</>} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

const Home = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen p-10">
      <h1 className="font-bold text-6xl tracking-widest break-all">
        Hello {user.name || "..."}
      </h1>
      {!user.id ? (
        <Link to={"/auth"}>
          <button className="px-2 py-1 font-semibold text-xl border-2 border-indigo-500 rounded mt-2">
            Login / Register
          </button>
        </Link>
      ) : (
        <div className="flex mt-2">
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
