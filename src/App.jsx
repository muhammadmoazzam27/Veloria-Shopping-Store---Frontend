import Routes from "@/pages/Routes";

import './App.scss'
import { useAuthContext } from "./hooks/AuthContext";
import ScreenLoader from "./components/Misc/screenloader";

function App() {
  const { isAppLoading } = useAuthContext()
  return (
    <>
      {
        isAppLoading ?
          <ScreenLoader />
          :
          <Routes />
      }
    </>
  )
}

export default App
