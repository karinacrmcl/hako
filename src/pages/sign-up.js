import { Link, useHistory } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { doesUsernameExist } from "../services/firebase";
import { useForm } from "react-hook-form";

export default function SignUp() {
  const { Firebase } = useContext(FirebaseContext);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const usernameExists = await doesUsernameExist(data.username);
    if (!usernameExists) {
      try {
        const createdUserResult =
          await Firebase.auth().createUserWithEmailAndPassword(
            data.email,
            data.password
          );

        await createdUserResult.user.updateProfile({
          displayName: data.username,
        });

        await Firebase.firestore()
          .collection("users")
          .add({
            userId: createdUserResult.user.uid,
            username: data.username.toLowerCase(),
            fullName: data.fullName,
            emailAdress: data.email.toLowerCase(),
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
        window.location.reload();
      } catch (error) {
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    document.title = "HAKO | Sign up ";
  }, []);

  return (
    <div
      style={{ backgroundImage: "url(/images/bg.jpg)" }}
      className="bg-cover bg-no-repeat"
    >
      <div className="container flex mx-auto font-fontbasic flex-col justify-center items-center h-screen bg-sign-in">
        <div className="flex flex-col w-1/4 items-center bg-white py-10 mb-4 rounded-lg shadow-xl lptpXL:w-2/6 lptpXL:p-2 tabletXL:w-96 mobileXL:h-screen mobileXL:w-screen mobileXL:mb-0">
          <h1 className="flex justify-center w-full">
            <img
              src="/images/logo.svg"
              alt="hako-logo"
              className="w-18 mobileXL:mt-20"
            />
          </h1>
          {error && (
            <p className="mt-1 text-xs font-medium text-red-primary">{error}</p>
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            method="POST"
            className="flex flex-col items-center mt-4 mb-6 w-full mobileXL:mt-20"
          >
            <input
              className="text-sm placeholder-gray-extralight text-gray-light w-80 lptpXL:w-full h-2  py-5 px-4 lptpXL:py-4.5  border border-gray-inputborder rounded-lg  mb-2 lptpXL:mb-2 mobileXL:mb-2"
              placeholder="Username"
              type="text"
              id="username"
              name="username"
              aria-label="Enter your username"
              {...register("username", {
                validate: (value) => value.length > 1 && value.length < 30,
              })}
            />
            {errors.username && (
              <p className="mb-1 text-xs font-medium text-red-primary">
                Enter a valid username
              </p>
            )}
            <input
              className="text-sm placeholder-gray-extralight text-gray-light w-80 lptpXL:w-full h-2  py-5 px-4 lptpXL:py-4.5  border border-gray-inputborder rounded-lg  mb-2 lptpXL:mb-2 mobileXL:mb-2"
              placeholder="Full Name"
              type="text"
              id="fullName"
              name="fullName"
              aria-label="Enter your full name"
              {...register("fullName", {
                validate: (value) => value.length > 1 && value.length < 50,
              })}
            />
            {errors.fullName && (
              <p className=" mb-1 text-xs font-medium text-red-primary">
                Enter a valid full name
              </p>
            )}

            <input
              className="text-sm placeholder-gray-extralight text-gray-light w-80 lptpXL:w-full h-2  py-5 px-4 lptpXL:py-4.5  border border-gray-inputborder rounded-lg  mb-2 lptpXL:mb-2 mobileXL:mb-2"
              placeholder="Email Adress"
              type="email"
              id="email"
              name="email"
              aria-label="Enter your email adress"
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
            />
            {errors.email && (
              <p className="mb-1 text-xs font-medium text-red-primary">
                Enter a valid email adress
              </p>
            )}
            <input
              className="text-sm placeholder-gray-extralight text-gray-light w-80 lptpXL:w-full h-2  py-5 px-4 lptpXL:py-4.5  border border-gray-inputborder rounded-lg  mb-2 lptpXL:mb-2 mobileXL:mb-2"
              placeholder="Password"
              type="password"
              id="password"
              name="password"
              aria-label="Enter your password"
              {...register("password", {
                required: true,
                minLength: 6,
              })}
            />
            {errors.password && (
              <p className="mb-1 text-xs font-medium text-red-primary">
                Enter a valid password, should be at least 6 characters long
              </p>
            )}

            <button
              type="submit"
              className="bg-default-first text-white w-28 mt-1 rounded-lg h-8 font-bold  mobileXL:w-full"
            >
              Sign Up
            </button>
          </form>
          <p className="text-sm text-gray-middle mb-4  mobileXL:mt-auto">
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
