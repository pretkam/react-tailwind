import { useContext } from "react";
import { Link } from "react-router-dom";

import UserContext from "../context/userContext";

export default function Home() {
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
}
