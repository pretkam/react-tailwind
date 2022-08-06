import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  setAction: React.Dispatch<React.SetStateAction<string>>;
  login: (email: string, password: string) => void;
};

export default function Login({ setAction, login }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    const empty = email.trim() === "" || password.trim() === "";
    setButtonDisabled(empty);
  }, [email, password]);

  return (
    <div className="p-5 md:border-2 rounded-lg md:border-indigo-600 w-full md:w-fit md:max-w-[50%] md:max-h-screen overflow-auto">
      <div className="mb-2 flex relative items-center justify-center">
        <Link to="/" className="absolute left-0">
          <span className="text-3xl">&laquo;</span>
        </Link>
        <h1 className="font-bold text-2xl text-indigo-600">Login</h1>
      </div>
      <div className="">
        <div className="mb-2">
          <p className="font-bold mb-1 text-indigo-600">Email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-xl px-2 py-1 rounded border border-indigo-400"
            required
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
            required
          />
        </div>
        <div className="mb-2 mt-3">
          <button
            onClick={() => login(email, password)}
            disabled={buttonDisabled}
            className="rounded-md px-2 py-1 w-full overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600"
          >
            <span className="relative text-indigo-600 transition duration-200 group-hover:text-indigo-300 ease">
              Login
            </span>
          </button>
          <button onClick={() => setAction("register")} className="mt-2">
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
