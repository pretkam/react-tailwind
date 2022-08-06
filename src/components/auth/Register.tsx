import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  setAction: React.Dispatch<React.SetStateAction<string>>;
  register: (email: string, password: string) => void;
};

export default function Login({ setAction, register }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    const empty =
      email.trim() === "" ||
      password.trim() === "" ||
      passwordConfirm.trim() === "" ||
      password.trim() !== passwordConfirm.trim();
    setButtonDisabled(empty);
  }, [email, password, passwordConfirm]);

  return (
    <div className="p-5 md:border-2 rounded-lg md:border-indigo-600 w-full md:w-fit md:max-w-[50%] md:max-h-screen overflow-auto">
      <div className="mb-2 flex relative items-center justify-center">
        <Link to="/" className="absolute left-0">
          <span className="text-3xl">&laquo;</span>
        </Link>
        <h1 className="font-bold text-2xl text-indigo-600">Register</h1>
      </div>
      <div className="">
        <div className="mb-2">
          <p className="font-bold mb-1 text-indigo-600">Email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div className="mb-2">
          <p className="font-bold mb-1 text-indigo-600">Confirm Password</p>
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="w-full text-xl px-2 py-1 rounded border border-indigo-400"
          />
        </div>
        <div className="mb-2 mt-3">
          <button
            onClick={() => register(email, password)}
            disabled={buttonDisabled}
            className="rounded-md px-2 py-1 w-full overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-indigo-600"
          >
            <span className="relative text-indigo-600 transition duration-200 group-hover:text-indigo-300 ease">
              Register
            </span>
          </button>
          <button onClick={() => setAction("login")} className="mt-2">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
