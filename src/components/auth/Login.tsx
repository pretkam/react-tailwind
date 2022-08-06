import { useEffect, useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    const empty = username.trim() === "" || password.trim() === "";
    setButtonDisabled(empty);
  }, [username, password]);

  const login = () => {
    console.log(username, password);
  };

  return (
    <div className="p-5 md:border-2 rounded-lg md:border-indigo-600 w-full md:w-fit md:max-w-[50%] md:max-h-screen overflow-auto">
      <h1 className="font-bold text-2xl text-indigo-600 text-center mb-2">
        Login
      </h1>
      <div className="">
        <div className="mb-2">
          <p className="font-bold mb-1 text-indigo-600">Email</p>
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full text-xl px-2 py-1 rounded border border-indigo-400"
            autoFocus
          />
        </div>
        <div className="mb-2">
          <p className="font-bold mb-1 text-indigo-600">Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-xl px-2 py-1 rounded border border-indigo-400"
          />
        </div>
        <div className="mb-2 mt-3">
          <button
            onClick={login}
            disabled={buttonDisabled}
            className="rounded-md px-2 py-1 w-full overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600"
          >
            <span className="relative text-indigo-600 transition duration-200 group-hover:text-indigo-300 ease">
              Login
            </span>
          </button>
          <a href="/register" className="inline-block mt-2">
            <span>Register</span>
          </a>
        </div>
      </div>
    </div>
  );
}
