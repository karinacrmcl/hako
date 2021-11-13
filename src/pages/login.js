import { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { Transition } from "react-transition-group";

export default function Login() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      setEmailAddress("");
      setPassword("");
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = "HAKO | Login ";
  }, []);

  return (
    <div
      style={{ backgroundImage: "url(" + "/images/bg.jpg" + ")" }}
      className="bg-cover bg-no-repeat"
    >
      <div className="container flex mx-auto font-fontbasic flex-col justify-center items-center h-screen bg-sign-in">
        <div className="flex flex-col w-1/4 items-center bg-white p-4 mb-4 rounded-lg shadow-xl">
          <h1 className="flex justify-center w-full mt-6">
            <img src="/images/logo.svg" alt="hako-logo" className="" />
          </h1>
          {error && (
            <p className="mt-1 mb-1 text-xs text-red-primary">{error}</p>
          )}
          <form
            onSubmit={handleLogin}
            method="POST"
            className="flex flex-col	items-center mt-8 mb-6"
          >
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="text-sm text-gray-extralight w-80 py-5 px-4 h-2 border border-gray-inputborder rounded-lg mb-4"
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-extralight w-80 py-5 px-4 h-2 border border-gray-inputborder rounded-lg mb-6"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-default-first text-white w-28 rounded h-8 font-bold
            ${isInvalid && "opacity-50"}`}
            >
              Login
            </button>
          </form>
          <p className="text-sm text-gray-middle mb-4">
            Don't have an account?
            <Link
              to={ROUTES.SIGN_UP}
              className="font-bold text-default-first ml-2"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
