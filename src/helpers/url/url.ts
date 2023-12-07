export const APP_HOSTNAME = import.meta.env.VITE_HOST_WEB_APP;

export const composeProxySignInUrl = (
  admin: string,
  actor: string,
  hostname: string = APP_HOSTNAME,
): string => {
  const path = `/login/sso/${encodeURI(btoa(admin))}/${encodeURI(btoa(actor))}`;
  const url = new URL(path, hostname);
  return url.toString();
};
