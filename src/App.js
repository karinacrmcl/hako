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
import ProtectedRoute from "./utils/protected-route";
import IsUserLoggedIn from "./utils/is-user-logged-in";

import CategoriesProvider from "./provider/categories-provider";
import ProfileCategoriesProvider from "./provider/profile-categories-provider";
import Modals from "./components/modals";

export default function App() {
  const { user } = useAuthListener();

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
        <Modals />
      </UserContext.Provider>
    </div>
  );
}
