import { useCallback, useState } from 'react';
import { useIsMounted } from './useIsMounted';

export function useSafeAsyncState(initialData) {
  const [state, setState] = useState(initialData);
  const isMounted = useIsMounted();

  const setSafeAsyncState = useCallback(
    (data) => {
      if (isMounted()) {
        setState(data);
      }
    },
    [isMounted],
  );

  return [state, setSafeAsyncState];
}
