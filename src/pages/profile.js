import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserByUsername } from "../services/firebase";
import * as ROUTES from "../constants/routes";
import Header from "../components/header";
import UserProfile from "../components/profile";
import Menu from "../components/menu";

export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    async function checkUserExists() {
      const [user] = await getUserByUsername(username);
      if (user?.userId) {
        setUser(user);
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
    }

    checkUserExists();
  }, [username, history]);

  return user?.username ? (
    <div className="font-fontbasic mobileXL:bg-gray-bgMobile">
      <Header />
      <div className="flex justify-center w-full">
        <div className="mt-24 py-2 flex justify-between mt-32 lptpXS:mt-28 w-full max-w-containerLg lptpXL:px-6 lptpXS:px-8 mobileSM:px-2.5 rselative mobileXL:mt-16 mobileXL:flex-col mobileXL:items-center tabletXL:mt-20">
          <UserProfile profileUser={user} />
        </div>
      </div>
      <Menu />
    </div>
  ) : null;
}
