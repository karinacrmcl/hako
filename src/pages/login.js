import { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";

export default function Login() {
  const history = useHistory();
  const { Firebase } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await Firebase.auth().signInWithEmailAndPassword(emailAddress, password);
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
      <div className="container flex mx-auto font-fontbasic flex-col justify-center items-center h-screen bg-sign-in ">
        <div className="flex flex-col lptpXL:w-2/6 w-96 items-center bg-white p-4 mb-4 rounded-lg shadow-xl lptpXL:p-2 tabletXL:w-96 mobileXL:h-screen mobileXL:w-screen mobileXL:mb-0">
          <h1 className="flex justify-center w-full mt-6 ">
            <img
              src="/images/logo.svg"
              alt="hako-logo"
              className="mobileXL:mt-20"
            />
          </h1>
          {error && (
            <p className="mt-1 mb-1 text-xs text-red-primary">{error}</p>
          )}
          <form
            onSubmit={handleLogin}
            method="POST"
            className="flex flex-col items-center mt-8 mb-6 w-full mobileXL:mt-20"
          >
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="text-sm placeholder-gray-extralight text-gray-light w-80 lptpXL:w-full h-2  py-5 px-4 lptpXL:py-4.5  border border-gray-inputborder rounded-lg mb-4 lptpXL:mb-3 mobileXL:mb-6"
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-extralight w-80 lptpXL:w-full h-2  py-5 px-4 lptpXL:py-4.5 border border-gray-inputborder rounded-lg mb-6 lptpXL:mb-3 mobileXL:mb-6"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-default-first text-white w-28 rounded h-8 font-bold mobileXL:w-full
            ${isInvalid && "opacity-50"}`}
            >
              Login
            </button>
          </form>
          <p className="text-sm text-gray-middle mb-4 mobileXL:mt-auto">
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
