import { useMemo } from 'react';
import { AppState } from 'context';
import { createAppModel } from 'model';
export const AppProvider = ({children}) => {
  const model = useMemo(() => createAppModel(),[])
  return (
    <AppState.Provider value={model}>
      {children}
    </AppState.Provider>
  );
}
