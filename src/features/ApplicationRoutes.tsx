import type { FunctionComponent } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ApplicationLayout } from '../components/layout/application/ApplicationLayout';
import { EmptyLayout } from '../components/layout/empty/EmptyLayout';
import { withAuthentication } from '../hocs/authentication/with-authentication';
import { withoutAuthentication } from '../hocs/authentication/without-authentication';
import { ApplicationRouteIndex } from './ApplicationRouteIndex';
import { LoginPageScreen } from './authentication/pages/login/LoginPage.screen';
import { PageNotFound } from './core/errors/PageNotFound';
import { Dashboard } from './dashboard/pages/dashboard/Dashboard';
import { UserCreatePage } from './users/pages/users/CreateUserPage';
import { ViewUserPage } from './users/pages/users/ViewUserPage';
import { ListUsersPageScreen } from './users/pages/users/list/ListUsersPage.screen';

/**
 * An component containing all the application routing.
 *
 * @see https://reactrouter.com/en/main
 */
export const ApplicationRoutes: FunctionComponent = () => {
  return (
    <Routes>
      {/* -- */}
      {/* -- Authentication */}
      {/* -- */}

      <Route
        path={'/login'}
        element={
          withoutAuthentication(
            <EmptyLayout>
              <LoginPageScreen />
            </EmptyLayout>,
          )
        }
      />

      {/* -- */}
      {/* -- Dashboard */}
      {/* -- */}

      <Route
        path={'/dashboard'}
        element={
          withAuthentication(
            <ApplicationLayout>
              <Dashboard />
            </ApplicationLayout>,
          )
        }
      />

      {/* -- */}
      {/* -- UsersPage */}
      {/* -- */}

      <Route
        path={'/users'}
        element={
          withAuthentication(
            <ApplicationLayout>
              <ListUsersPageScreen />
            </ApplicationLayout>,
          )
        }
      />

      {/* -- */}
      {/* -- UserProfilePage */}
      {/* -- */}

      <Route
        path={'/users/:userId'}
        element={
          withAuthentication(
            <ApplicationLayout>
              <ViewUserPage />
            </ApplicationLayout>,
          )
        }
      />

      {/* -- */}
      {/* -- UserCreatePage */}
      {/* -- */}

      <Route
        path={'/users/create'}
        element={
          withAuthentication(
            <ApplicationLayout>
              <UserCreatePage />
            </ApplicationLayout>,
          )
        }
      />

      {/* -- */}
      {/* -- Core */}
      {/* -- */}

      <Route index element={<ApplicationRouteIndex />} />
      <Route path={'*'} element={<PageNotFound />} />
    </Routes>
  );
};
