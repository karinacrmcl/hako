import { Fragment, lazy, Suspense } from "react";
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
import CategoriesMobile from "./components/menu/categories-mobile";
import UserProfileSettingsMobile from "./components/settings/settings-mobile-modals/user-profile";
import CustomizationSettingsMobile from "./components/settings/settings-mobile-modals/customization";

export default function App() {
  const { user } = useAuthListener();
  const { openModal } = useModal();

  const modalList = [
    { key: "modalSettings", component: <Settings user={user} /> },
    { key: "modalAddArticle", component: <AddArticleModal user={user} /> },
    { key: "modalAddNews", component: <AddNewsModal user={user} /> },
    { key: "modalAddBook", component: <AddBookModal user={user} /> },
    { key: "modalAddPhoto", component: <AddPhotoModal user={user} /> },
    {
      key: "modalAddDiscussion",
      component: <AddDiscussionModal user={user} />,
    },
    {
      key: "categoriesMobile",
      component: <CategoriesMobile isOpen={true} />,
    },
    {
      key: "settingsUserProfileMobile",
      component: <UserProfileSettingsMobile />,
    },
    {
      key: "settingsCustomizationMobile",
      component: <CustomizationSettingsMobile />,
    },
  ];

  return (
    <div className="overflow-hidden max-w-screen max-h-screen">
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

        {modalList.map(
          (item) =>
            openModal[item.key] && (
              <Fragment key={item.key}>{item.component}</Fragment>
            )
        )}
      </UserContext.Provider>
    </div>
  );
}
