import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/login";
import SignUp from "./pages/sign-up";
import Profile from "./pages/profile";

import useAuthListener from "./hooks/use-auth-listener";

import Dashboard from "./pages/dashboard";
import NotFound from "./pages/not-found.js";
import * as ROUTES from "./constants/routes";
import UserContext from "./context/user";

import ProtectedRoute from "./helpers/protected-route";
import IsUserLoggedIn from "./helpers/is-user-logged-in";

import Settings from "../src/components/settings";
import AddPhotoModal from "../src/components/add-posts/photography";
import AddArticleModal from "../src/components/add-posts/article";
import AddNewsModal from "../src/components/add-posts/news";
import AddBookModal from "../src/components/add-posts/book";
import AddDiscussionModal from "../src/components/add-posts/discussion";
import { useModal } from "./hooks/use-modal";

import CategoriesProvider from "./provider/categories-provider";
import ProfileCategoriesProvider from "./provider/profile-categories-provider";

export default function App() {
  const { user } = useAuthListener();
  const { openModal } = useModal();
  const isModalOpened = Object.values(openModal).some((x) => x == true);

  if (isModalOpened) {
    document
      .querySelector("body")
      .classList.add("w-screen", "h-screen", "overflow-hidden");
  } else {
    document
      .querySelector("body")
      .classList.remove("w-screen", "h-screen", "overflow-hidden");
  }
  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>Loading..</p>} />
        <Switch>
          <IsUserLoggedIn
            user={user}
            loggedInPath={ROUTES.DASHBOARD}
            path={ROUTES.LOGIN}
          >
            <Login />
          </IsUserLoggedIn>
          <IsUserLoggedIn
            user={user}
            loggedInPath={ROUTES.DASHBOARD}
            path={ROUTES.SIGN_UP}
          >
            <SignUp />
          </IsUserLoggedIn>
          <Route path={ROUTES.PROFILE}>
            <ProfileCategoriesProvider>
              <Profile />
            </ProfileCategoriesProvider>
          </Route>

          <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
            <CategoriesProvider>
              <Dashboard />
            </CategoriesProvider>
          </ProtectedRoute>

          <Route component={NotFound} />
        </Switch>
      </Router>

      {openModal.modalSettings && <Settings user={user} />}
      {openModal.modalAddArticle && <AddArticleModal user={user} />}
      {openModal.modalAddNews && <AddNewsModal user={user} />}
      {openModal.modalAddBook && <AddBookModal user={user} />}
      {openModal.modalAddPhoto && <AddPhotoModal user={user} />}
      {openModal.modalAddDiscussion && <AddDiscussionModal user={user} />}
    </UserContext.Provider>
  );
}
