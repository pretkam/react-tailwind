import { useEffect, useState } from "react";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Example from "./components/Example";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = "Vite, React, TS, Tailwind";
  }, []);

  return (
    <div className="h-screen w-full flex items-center justify-center flex-wrap">
      <Register />
    </div>
  );
}

export default App;
