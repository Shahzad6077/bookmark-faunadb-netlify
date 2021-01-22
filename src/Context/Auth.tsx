import React, { createContext, useContext, useEffect, useState } from "react"

import {
  User,
  AuthContextType,
  AUTH_CONTEXT_INITIAL_STATE,
} from "./../Types/auth.interface"
import netlifyIdentity from "netlify-identity-widget"

const AuthContext = createContext<AuthContextType>(AUTH_CONTEXT_INITIAL_STATE)

export const useAuthContext = () => useContext<AuthContextType>(AuthContext)

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    netlifyIdentity.init({})
    netlifyIdentity.on("login", user => {
      checkHasUser(user)
      netlifyIdentity.close()
    })
    netlifyIdentity.on("logout", () => {
      setUser(null)
      netlifyIdentity.close()
    })
    netlifyIdentity.on("init", user => console.log("init", user))

    const getuser = netlifyIdentity.currentUser()
    checkHasUser(getuser)
  }, [])

  const checkHasUser = user => {
    if (user && user?.token?.access_token) {
      setUser({
        uid: user.id,
        email: user.email,
        full_name: user?.user_metadata?.full_name,
        token: user?.token?.access_token || null,
      })
    }
  }
  const onLogin = () => {
    netlifyIdentity.open("login")
  }
  const onSignup = () => {
    netlifyIdentity.open("signup")
  }
  const onLogout = () => {
    netlifyIdentity.logout()
  }

  const isAuthenticated = !!user?.uid
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, onLogin, onLogout, onSignup }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
