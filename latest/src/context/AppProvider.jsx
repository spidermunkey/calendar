import { useMemo } from 'react';
import { AppState } from 'context';
import { createAppModel } from 'store';
export const AppProvider = ({children}) => {
  const model = useMemo(() => createAppModel(),[])
  return (
    <AppState.Provider value={model}>
      {children}
    </AppState.Provider>
  );
}
