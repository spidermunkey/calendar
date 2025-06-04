import { AppProvider } from "context"
export const App = ({children}) => {
  return (
  <AppProvider>
        <div className="app">{children}</div>
  </AppProvider>
  )
}
