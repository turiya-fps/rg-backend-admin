import type { TokenData, TokenPair } from '@project-rouge/service-core/authentication/token';
import { decode } from '@project-rouge/service-core/authentication/token';
import type { TokenForAdmin } from '@project-rouge/service-core/authentication/token/admin';
import { fromIsoString } from '@project-rouge/service-core/data/date';
import { isHttpResponseIdentifier } from '@project-rouge/service-core/http/endpoint';
import type { UserHttpResource, UserProfile } from '@project-rouge/service-user-client/resource/user';
import type { FunctionComponent } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../../../components/button/Button';
import { Card } from '../../../../components/card/Card';
import { Toggle } from '../../../../components/toggle/Toggle';
import { composeFullName, sanitiseUserProfileInputData } from '../../../../helpers/data/data';
import { formatDate } from '../../../../helpers/date/date';
import { composeProxySignInUrl } from '../../../../helpers/url/url';
import { useDeleteUserIsActiveQuery } from '../../../../hooks/api/user/delete-user-is-active';
import { useDeleteUserIsMasterAdminQuery } from '../../../../hooks/api/user/delete-user-is-master-admin';
import { useGetUserQuery } from '../../../../hooks/api/user/get-user';
import { usePatchUserProfileQuery } from '../../../../hooks/api/user/patch-user-profile';
import { usePostSessionProxyQuery } from '../../../../hooks/api/user/post-session-proxy';
import { usePutUserIsActiveQuery } from '../../../../hooks/api/user/put-user-is-active';
import { usePutUserIsMasterAdminQuery } from '../../../../hooks/api/user/put-user-is-master-admin';
import { useIsInitialRender } from '../../../../hooks/component/use-is-initial-render';
import { useAuthenticationStoreCredentials } from '../../../../stores/authentication/context';

export const ViewUserPage: FunctionComponent = () => {
  const authenticationStoreCredentials = useAuthenticationStoreCredentials();
  const isInitialRender = useIsInitialRender();
  const navigate = useNavigate();
  const getUserQuery = useGetUserQuery();
  const putUserIsActiveQuery = usePutUserIsActiveQuery();
  const deleteUserIsActiveQuery = useDeleteUserIsActiveQuery();
  const putUserIsMasterAdminQuery = usePutUserIsMasterAdminQuery();
  const deleteUserIsMasterAdminQuery = useDeleteUserIsMasterAdminQuery();
  const postSessionProxyQuery = usePostSessionProxyQuery();
  const patchUserProfileQuery = usePatchUserProfileQuery();
  const [user, setUser] = useState<UserHttpResource | undefined>();
  const [isActiveToggle, setIsActiveToggle] = useState<boolean>(false);
  const [isMasterAdminToggle, setIsMasterAdminToggle] = useState<boolean>(false);
  const [awaitSessionProxyResponse, setAwaitSessionProxyResponse] = useState<boolean>(false);
  const [awaitPatchUserProfileResponse, setAwaitPatchUserProfileResponse] = useState<boolean>(false);
  const [sessionProxyURL, setSessionProxyURL] = useState<string | undefined>();
  const [userProfileInput, setUserProfileInput] = useState<Partial<UserProfile>>({
    company_job_title: user?.profile.company_job_title,
    company_name: user?.profile.company_name,
  });

  const params = useParams();
  const { userId } = params as UserProfilePageParams;

  const fetchUser = async () => {
    const response = await getUserQuery.make({ id: userId });

    if (!isHttpResponseIdentifier(response, 'success:data:user')) {
      throw Error();
    }

    setUser(response.body);
    setIsActiveToggle(response.body.is_active);
    setIsMasterAdminToggle(response.body.is_master_admin);
  };

  useEffect(() => {
    // eslint-disable-next-line no-void
    void fetchUser();
  }, []);

  useEffect(() => {
    if (isInitialRender === false) {
      const updateUserIsActive = async () => {
        if (isActiveToggle === true) {
          const response = await putUserIsActiveQuery.make({ id: userId });

          if (!isHttpResponseIdentifier(response, 'success:updated:user')) {
            throw Error();
          }

          user && setUser({ ...user, is_active: true });
        } else if (isActiveToggle === false) {
          const response = await deleteUserIsActiveQuery.make({ id: userId });

          if (!isHttpResponseIdentifier(response, 'success:updated:user')) {
            throw Error();
          }

          user && setUser({ ...user, is_active: false });
        }
      };

      // eslint-disable-next-line no-void
      void updateUserIsActive();
    }
  }, [isActiveToggle]);

  useEffect(() => {
    if (isInitialRender === false) {
      const updateUserIsMasterAdmin = async () => {
        if (isMasterAdminToggle === true) {
          const response = await putUserIsMasterAdminQuery.make({ id: userId });

          if (!isHttpResponseIdentifier(response, 'success:updated:user')) {
            throw Error();
          }

          user && setUser({ ...user, is_master_admin: true });
        } else if (isMasterAdminToggle === false) {
          const response = await deleteUserIsMasterAdminQuery.make({ id: userId });

          if (!isHttpResponseIdentifier(response, 'success:updated:user')) {
            throw Error();
          }

          user && setUser({ ...user, is_master_admin: false });
        }
      };

      // eslint-disable-next-line no-void
      void updateUserIsMasterAdmin();
    }
  }, [isMasterAdminToggle]);

  useEffect(() => {
    if (awaitSessionProxyResponse === true && user !== undefined) {
      const createSessionProxy = async () => {
        const admin = authenticationStoreCredentials?.admin;
        if (admin === undefined) {
          throw Error('credential store error');
        }

        const token: TokenPair<TokenData> | undefined = decode<TokenForAdmin>(admin);

        if (token === undefined) {
          throw Error('token error');
        }

        const sessionId = token.data.sid as string;

        const response = await postSessionProxyQuery.make({
          userId: user?.id,
          token: admin,
          sessionId,
        });

        if (!isHttpResponseIdentifier(response, 'success:created:session-proxy')) {
          throw Error();
        }

        const { actor } = response.body.tokens;
        const url = composeProxySignInUrl(admin, actor);
        setSessionProxyURL(url);
        setAwaitSessionProxyResponse(false);
      };

      // eslint-disable-next-line no-void
      void createSessionProxy();
    }
  }, [awaitSessionProxyResponse]);

  useEffect(() => {
    if (awaitPatchUserProfileResponse === true && user !== undefined) {
      const patchUserProfile = async () => {
        const sanitisedProfile = sanitiseUserProfileInputData(userProfileInput);
        const composedFullName = composeFullName(sanitisedProfile.name_first, sanitisedProfile.name_last); // @todo: temporary, remove
        const response = await patchUserProfileQuery.make({
          userId: user?.id,
          profile: {
            ...sanitisedProfile,
            ...(composedFullName !== undefined && { name: composedFullName }), // @todo: temporary, remove
          },
        });

        if (!isHttpResponseIdentifier(response, 'success:updated:user')) {
          throw Error();
        }

        setAwaitPatchUserProfileResponse(false);

        // eslint-disable-next-line no-void
        void fetchUser();
      };

      // eslint-disable-next-line no-void
      void patchUserProfile();
    }
  }, [awaitPatchUserProfileResponse]);

  const navigateToCollection = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    navigate('/users');
  };

  const handleActiveToggleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsActiveToggle(!isActiveToggle);
  };

  const handleAdminToggleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsMasterAdminToggle(!isMasterAdminToggle);
  };

  return (
    <>
      {user &&
        <Card heading='User Profile' onClose={navigateToCollection} groups={
          [
            {
              items: [
                {
                  property: 'ID',
                  value: user.id,
                },
                {
                  property: 'Email',
                  value: user.email,
                },
              ],
            },
            {
              title: 'USER INFORMATION',
              onSubmitForm: () => setAwaitPatchUserProfileResponse(true),
              items: [
                {
                  property: 'First Name',
                  value: user.profile.name_first === undefined ? '' : user.profile.name_first,
                  onInputChange: (input: string) => setUserProfileInput({ ...userProfileInput, name_first: input }),
                },
                {
                  property: 'Last Name',
                  value: user.profile.name_last === undefined ? '' : user.profile.name_last,
                  onInputChange: (input: string) => setUserProfileInput({ ...userProfileInput, name_last: input }),
                },
                {
                  property: 'Company',
                  value: user.profile.company_name,
                  onInputChange: (input: string) => setUserProfileInput({ ...userProfileInput, company_name: input }),
                },
                {
                  property: 'Job Title',
                  value: user.profile.company_job_title,
                  onInputChange: (input: string) => setUserProfileInput({ ...userProfileInput, company_job_title: input }),
                },
              ],
            },
            {
              title: 'Account Controls',
              items: [
                {
                  property: 'Admin',
                  value: (
                    <Toggle toggleValue={isMasterAdminToggle} onToggleChange={handleAdminToggleClick}/>
                  ),
                },
                {
                  property: 'Active',
                  value: (
                    <Toggle toggleValue={isActiveToggle} onToggleChange={handleActiveToggleClick}/>
                  ),
                },
                {
                  property: 'Login as User',
                  value: (
                    <>
                      <div className='text-sm pb-2'>Login to TESSA as {user.email}</div>
                      <div className='flex flex-row'>
                        <Button type={'button'} label={'Login'} disabled={false} onButtonClick={() => setAwaitSessionProxyResponse(true)} />
                        {(awaitSessionProxyResponse === true || sessionProxyURL !== undefined) &&
                    <div className='flex flex-row'>
                      {awaitSessionProxyResponse === true && <span className='text-sm pl-4 pr-2 py-2 align-middle'>loading...</span>}
                      {sessionProxyURL !== undefined && awaitSessionProxyResponse === false &&
                      <>
                        <span className='text-sm px-4 py-2.5'>✓ Session created: </span>
                        <a className='font-bold text-sm py-2.5 cursor-pointer text-teal-500' href={sessionProxyURL} target='_blank'>
                      Launch →
                        </a>
                      </>
                      }
                    </div>
                        }
                      </div>
                    </>
                  ),
                },
              ],
            },
            {
              title: 'Metadata',
              items: [
                {
                  property: 'Last Login',
                  value: user.last_active_at === null ? 'Never' : formatDate(fromIsoString(user?.last_active_at)),
                },
                {
                  property: 'Account Created',
                  value: formatDate(fromIsoString(user.created_at)),
                },
                {
                  property: 'Last Updated',
                  value: formatDate(fromIsoString(user?.updated_at)),
                },
              ],
            },
          ]
        } />
      }
    </>
  );
};

export type UserProfilePageParams = {
  userId: string;
};
