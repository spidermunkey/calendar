import { useMemo } from 'react';
import { AppState } from 'context';
import { createAppModel } from 'model';
export const AppProvider = ({children}) => {
  const model = useMemo(() => createAppModel(),[])
  window.addEventListener('beforeunload', () => {
    console.log('Page is unloading!');
    return
  });
  return (
    <AppState.Provider value={model}>
      {children}
    </AppState.Provider>
  );
}
