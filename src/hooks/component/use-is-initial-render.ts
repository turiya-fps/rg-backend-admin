import { useEffect, useRef } from 'react';

/**
 * @deprecated This looks to be preventing the double triggering of calls, which is fine as its part of reacts dev mode.
 */
export const useIsInitialRender = () => {
  const isInitRef = useRef(true);
  useEffect(() => {
    isInitRef.current = false;
  }, []);
  return isInitRef.current;
};
