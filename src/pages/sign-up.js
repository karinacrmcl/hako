import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Link, useHistory } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { doesUsernameExist } from "../services/firebase";

export default function SignUp() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailAdress, setEmailAdress] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid = password == "" || emailAdress == "";

  const handleSignUp = async (event) => {
    event.preventDefault();

    const usernameExists = await doesUsernameExist(username);
    if (!usernameExists) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAdress, password);

        // authentication
        // -> emailAddress & password & username (displayName)
        await createdUserResult.user.updateProfile({
          displayName: username,
        });

        // firebase user collection (create a document)
        await firebase
          .firestore()
          .collection("users")
          .add({
            userId: createdUserResult.user.uid,
            username: username.toLowerCase(),
            fullName,
            emailAdress: emailAdress.toLowerCase(),
            following: [],
            followers: [],
            avatarUrl: {
              basic: "https://i.ibb.co/4M613tB/avatar-default.png",
              min: "https://i.ibb.co/7CtDXPD/Group-109.png",
            },
            dateCreated: Date.now(),
            pinnedPublications: [],
            likedPublications: [],
          });

        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setFullName("");
        setEmailAdress("");
        setPassword("");
        setError(error.message);
      }
    } else {
      setUsername("");
      setError("That username is already taken, please try another.");
    }
  };

  useEffect(() => {
    document.title = "HAKO | Sign up ";
  }, []);

  return (
    <div
      style={{ backgroundImage: "url(" + "/images/bg.jpg" + ")" }}
      className="bg-cover bg-no-repeat"
    >
      <div className="container flex mx-auto font-fontbasic flex-col justify-center items-center h-screen bg-sign-in">
        <div className="flex flex-col w-1/4 items-center bg-white p-4 mb-4 rounded-lg shadow-xl">
          <h1 className="flex justify-center w-full">
            <img src="/images/logo.svg" className="mt-2 w-6/12 mb-2" />
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
          <form
            onSubmit={handleSignUp}
            method="POST"
            className="flex flex-col items-center mt-8 mb-6"
          >
            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-extralight w-80 py-5 px-4 h-2 border border-gray-inputborder rounded-lg mb-4"
              onChange={({ target }) => {
                setUsername(target.value);
              }}
              value={username}
            />
            <input
              aria-label="Enter your full name"
              type="text"
              placeholder="Full Name"
              className="text-sm text-gray-extralight w-80 py-5 px-4 h-2 border border-gray-inputborder rounded-lg mb-4"
              onChange={({ target }) => {
                setFullName(target.value);
              }}
              value={fullName}
            />
            <input
              aria-label="Enter your email"
              type="text"
              placeholder="Email"
              className="text-sm text-gray-extralight w-80 py-5 px-4 h-2 border border-gray-inputborder rounded-lg mb-4"
              onChange={({ target }) => {
                setEmailAdress(target.value);
              }}
              value={emailAdress}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-extralight w-80 py-5 px-4 h-2 border border-gray-inputborder rounded-lg mb-4"
              o
              onChange={({ target }) => {
                setPassword(target.value);
              }}
              value={password}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-default-first text-white w-28 rounded-lg h-8 font-bold
            ${isInvalid && "opacity-50"}`}
            >
              Sign Up
            </button>
          </form>
          <p className="text-sm text-gray-middle mb-4">
            Have an account?{`  `}
            <Link
              to={ROUTES.LOGIN}
              className="font-bold text-default-first ml-2"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
