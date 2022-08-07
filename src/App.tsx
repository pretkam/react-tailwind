import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// components
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Products from "./pages/Products";
import TestProtectedPage from "./pages/TestProtectedPage";
import Sidebar from "./components/web/Sidebar";

// user context
import UserContext, { User, emtyObj } from "./context/userContext";

// get local user
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
                <Route
                  path="create"
                  element={
                    <Protected>
                      <Products />
                    </Protected>
                  }
                />
                <Route
                  path="edit/:id"
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

export default App;
