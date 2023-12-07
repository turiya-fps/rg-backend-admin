import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { FunctionComponent } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Footer } from '../components/page/footer/Footer';
import { AuthenticationCredentialStorage } from '../helpers/authentication/credential-storage';
import { useBuildInformation } from '../hooks/use-build-information';
import { AuthenticationStoreContextProvider } from '../stores/authentication/context';
import { GlobalStoreContextProvider } from '../stores/global/context';
import { ApplicationAuthentication } from './ApplicationAuthentication';
import { ApplicationLoading } from './ApplicationLoading';
import { ApplicationRoutes } from './ApplicationRoutes';

const client = new QueryClient();

/**
 * The main application entrypoint.
 */
export const Application: FunctionComponent = () => {
  const build = useBuildInformation();

  return (
    <GlobalStoreContextProvider>
      <AuthenticationStoreContextProvider storage={new AuthenticationCredentialStorage(window.sessionStorage)}>
        <QueryClientProvider client={client}>
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <ApplicationAuthentication>
              <ApplicationLoading />

              <ApplicationRoutes />

              <Footer build={build} />
            </ApplicationAuthentication>
          </BrowserRouter>
        </QueryClientProvider>
      </AuthenticationStoreContextProvider>
    </GlobalStoreContextProvider>
  );
};
