import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import UserContext from "../../context/user";
import useUser from "../../hooks/use-user";
import AddButton from "./add-button";
import FirebaseContext from "../../context/firebase";
import { useModal } from "../../hooks/use-modal";
import { useMediaQuery } from "react-responsive";

export function Links() {
  const { user } = useContext(UserContext);
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();
  const {
    user: { fullName },
  } = useUser();

  const { openModal, setOpenModal } = useModal();
  const isMobile = useMediaQuery({ maxWidth: "971px" });

  return (
    <div className="flex w-full justify-between lptpXS:items-center mobileXL:px-10 mobileXL:justify-center">
      <div className="flex lptpXS:justify-between lptpXS:items-center ">
        <Link
          to={ROUTES.DASHBOARD}
          className="mr-6 flex flex-col items-center lptpXS:mr-4 "
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 lptpXS:w-4 lptpXS:h-4"
          >
            <path
              d="M1 6L6.8983 1L13 6"
              stroke={`${isMobile ? "#b6b6b6" : "#D8D8D8"}`}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 7V13H5.69565V9.35714C5.69565 9.35714 5.69915 8.77313 5.91304 8.5C6.14504 8.20375 6.40944 8.1404 6.78261 8.07143C7.03294 8.02516 7.18445 8.02516 7.43478 8.07143C7.80795 8.1404 8.07235 8.20375 8.30435 8.5C8.51824 8.77313 8.52174 9.35714 8.52174 9.35714V13H12V7"
              stroke={`${isMobile ? "#b6b6b6" : "#D8D8D8"}`}
              strokeLinecap="round"
            />
          </svg>

          <p className="text-xxs text-gray-link tabletXL:text-gray-menuButton">
            Home
          </p>
        </Link>
        <Link
          to={`/p/${user.displayName}`}
          className=" flex flex-col items-center mr-2 lptpXS:mr-1"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 lptpXS:w-4 lptpXS:h-4"
          >
            <path
              d="M9.5 4C9.5 4.66089 9.13972 5.41664 8.5448 6.02047C7.95089 6.62329 7.19678 7 6.5 7C5.80322 7 5.04911 6.62329 4.4552 6.02047C3.86028 5.41664 3.5 4.66089 3.5 4C3.5 3.33911 3.86028 2.58336 4.4552 1.97953C5.04911 1.37671 5.80322 1 6.5 1C7.19678 1 7.95089 1.37671 8.5448 1.97953C9.13972 2.58336 9.5 3.33911 9.5 4ZM6.5 8.625C7.17146 8.625 7.81148 8.48969 8.39188 8.25H8.7C10.2679 8.25 11.5 9.45875 11.5 10.9V11.875C11.5 12.1095 11.4301 12.4371 11.2992 12.6921C11.1572 12.9686 11.0368 13 11 13H2C1.96322 13 1.84276 12.9686 1.70083 12.6921C1.56993 12.4371 1.5 12.1095 1.5 11.875V10.9C1.5 9.45875 2.73209 8.25 4.3 8.25H4.60847C5.19012 8.48944 5.82791 8.625 6.5 8.625Z"
              stroke={`${isMobile ? "#b6b6b6" : "#D8D8D8"}`}
            />
          </svg>

          <p className="text-xxs text-gray-link tabletXL:text-gray-menuButton">
            Profile
          </p>
        </Link>
      </div>
      <AddButton />
      <div className="flex w-full justify-between lptpXS:items-center mobileXL:w-auto ">
        <button
          type="button"
          title="Sign Out"
          className="flex flex-col items-center mobileXL:mr-2"
          onClick={() => {
            firebase.auth().signOut();
            history.push(ROUTES.LOGIN);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              firebase.auth().signOut();
              history.push(ROUTES.LOGIN);
            }
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 lptpXS:w-4 lptpXS:h-4 "
          >
            <path
              d="M4 7H12.5001"
              stroke={`${isMobile ? "#b6b6b6" : "#D8D8D8"}`}
              strokeLinecap="round"
            />
            <path
              d="M8.50009 4.65217V3C8.50009 1.89543 7.60466 1 6.50009 1H3C1.89543 1 1 1.89543 1 3V11C1 12.1046 1.89543 13 3 13H6.50009C7.60466 13 8.50009 12.1046 8.50009 11V9.34783"
              stroke={`${isMobile ? "#b6b6b6" : "#D8D8D8"}`}
              strokeLinecap="round"
            />
            <path
              d="M10.9999 4.65234L12.4475 6.3517C12.7658 6.72541 12.7658 7.27493 12.4475 7.64864L10.9999 9.348"
              stroke={`${isMobile ? "#b6b6b6" : "#D8D8D8"}`}
              strokeLinecap="round"
            />
          </svg>

          <p className="text-xxs text-gray-link tabletXL:text-gray-menuButton">
            Log Out
          </p>
        </button>

        <button
          className=" flex flex-col items-center lptpXS:-ml-5 mobileXL:ml-0"
          onClick={() => {
            setOpenModal({ ...openModal, ["modalSettings"]: true });
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 lptpXS:w-4 lptpXS:h-4"
          >
            <ellipse
              cx="6.88659"
              cy="6.99995"
              rx="2.26415"
              ry="2.30769"
              stroke={`${isMobile ? "#b6b6b6" : "#D8D8D8"}`}
            />
            <path
              d="M5.75472 1.82801V1.84988C5.75472 2.17323 5.55898 2.46442 5.25955 2.58649L5.11682 2.64468C4.83305 2.76037 4.50737 2.65034 4.35191 2.38626C4.14589 2.03628 3.66385 1.97723 3.37944 2.26711L2.51986 3.14322C2.19016 3.47926 2.2205 4.02594 2.58535 4.32344C2.85488 4.54321 2.95154 4.91194 2.82449 5.23567L2.80364 5.2888C2.67169 5.62501 2.34735 5.84615 1.98617 5.84615H1.94239C1.42192 5.84615 1 6.26808 1 6.78854V7.37623C1 7.93315 1.45147 8.38462 2.00838 8.38462H2.04967C2.38131 8.38462 2.68819 8.56007 2.85643 8.84587L2.93872 8.98564C3.12591 9.30363 3.05296 9.71066 2.76698 9.94385C2.42617 10.2217 2.39783 10.7324 2.7058 11.0463L3.14124 11.4901C3.46741 11.8226 3.99316 11.8517 4.35412 11.5574C4.65063 11.3156 5.06748 11.2874 5.39387 11.487L5.61593 11.6228C5.83545 11.7571 5.94825 12.0137 5.8987 12.2662C5.82411 12.6463 6.11512 13 6.50249 13H7.41727C7.87457 13 8.24528 12.6293 8.24528 12.172C8.24528 11.8354 8.44903 11.5323 8.7607 11.4053L8.88273 11.3555C9.18192 11.2335 9.52517 11.3045 9.75145 11.5351C10.049 11.8384 10.5324 11.8545 10.8495 11.5717L11.3966 11.0838C11.7889 10.734 11.8416 10.1396 11.5171 9.72616L11.4996 9.70383C11.3053 9.4563 11.2474 9.12813 11.3452 8.82905L11.4541 8.49605C11.5573 8.18067 11.8981 8.01026 12.2123 8.117C12.5988 8.24832 13 7.96093 13 7.5527V6.70397C13 6.20859 12.6427 5.78546 12.1543 5.70249L12.067 5.68766C11.7998 5.64228 11.5708 5.47121 11.4514 5.22793L11.4274 5.17888C11.2843 4.88732 11.3408 4.53726 11.5682 4.30545C11.8604 4.00767 11.8604 3.5308 11.5682 3.23301L10.8096 2.45973C10.5204 2.16501 10.0456 2.16501 9.75649 2.45973C9.53086 2.6897 9.18208 2.74664 8.89503 2.60035L8.88379 2.59462C8.63091 2.46575 8.4717 2.20592 8.4717 1.9221V1.85854C8.4717 1.38438 8.08732 1 7.61316 1H6.58273C6.12543 1 5.75472 1.37071 5.75472 1.82801Z"
              stroke={`${isMobile ? "#b6b6b6" : "#D8D8D8"}`}
              strokeLinecap="round"
            />
          </svg>

          <p className="text-xxs text-gray-link tabletXL:text-gray-menuButton ">
            Settings
          </p>
        </button>
      </div>
    </div>
  );
}
