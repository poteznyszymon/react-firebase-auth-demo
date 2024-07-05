import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

export default function Login() {
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const errorToast = (message: string) => toast.error(message);
  const successToast = (message: string) => toast.success(message);

  const LoginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, emailAddress, password);
      successToast("user logged in successfully");
      navigate("/profile");
      
    } catch (error) {
      if (error instanceof FirebaseError) {
        errorToast(error.message);
      } else console.log(error);
    }
  };

  return (
    <main className="h-screen flex items-center justify-center bg-slate-900 flex-col">
      <Toaster />
      <h1 className="text-white text-center text-4xl pb-10 font-bold">
        Login demo
      </h1>
      <div className="sm: ld: xl: w-2/5">
        <form onSubmit={LoginUser}>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email address
            </label>
            <input
              onChange={(e) => setEmailAddress(e.target.value)}
              type="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="john.doe@company.com"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="•••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-4">
            Don’t have an account yet?{" "}
            <a
              href="/"
              className="text-blue-600 hover:underline dark:text-blue-500 cursor-pointer font-bold"
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
    </main>
  );
}
