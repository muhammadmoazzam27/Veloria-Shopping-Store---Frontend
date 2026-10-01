import { message } from 'antd';
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react'

const Auth = createContext();

const initialState = { isAuth: false, user: "" };

const AuthContext = ({ children }) => {

  const [state, setState] = useState(initialState);
  const [isAppLoading, setIsAppLoading] = useState(true)

  const readProfile = (token) => {

    const jwt = token || localStorage.getItem("jwtToken")

    let role = ""

    axios.get("http://localhost:8000/api/auth/user", { headers: { Authorization: `Bearer ${jwt}` } })

      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          setState({ isAuth: true, user: data.user })
          role = data.user.role
          console.log("User Profile", data.user)
          console.log("AuthContext User Role : ", role)
        }

      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setIsAppLoading(false)
      })

  }

  useEffect(() => {
    readProfile();
  }, [])


  const handleLogout = () => {
    localStorage.removeItem("jwtToken")
    setState(initialState);
    return message.success("A user successfully logout");
  }

  return (
    <Auth.Provider value={{ ...state, readProfile, isAppLoading, handleLogout }}>
      {children}
    </Auth.Provider>
  )
}

export default AuthContext

export const useAuthContext = () => useContext(Auth);