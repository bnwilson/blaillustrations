import '@/styles/globals.css'
import '@/styles/gallery.css'
import { ChakraProvider } from '@chakra-ui/react'
import { loginUser, logoutUser } from '@/utils/netlifyIdActions'
import UserContext, {NetlifyLoginContext} from '@/components/userContext'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import * as netlifyIdentity from 'netlify-identity-widget'
import { useState, useEffect, useReducer } from 'react'
import { Layout } from '@/components/Layout'
netlifyIdentity.currentUser()
// Local-Storage user key
const USER_KEY_DEFAULT = "currentBlaUser"

/*  Types  */
interface AdminLoginState {
  user: {
    isLoggedIn: boolean
    id: string
  },
  userInfo: {[key: string]: any} | netlifyIdentity.User
}

type ReducerAdminLoginType = "login" | "logout"

interface ReducerLoginAction {
  type: ReducerAdminLoginType
  payload?: netlifyIdentity.User | {[key: string]: any}
}


// Initial state
const initialLoginState: AdminLoginState = {
  user: {
    isLoggedIn: false,
    id: ""
  },
  userInfo: {}
}

// Initialize | Reset - login state
function initLoginState(initialAdminLoginState: AdminLoginState):AdminLoginState {
  return initialAdminLoginState
}

// Reducer - handle 'login'|'logout' events
function loginReducer (netlifyLoginState: AdminLoginState, loginAction: ReducerLoginAction): AdminLoginState {
  // localStorageKey - Local-Storage key value (defaults to local var at the top)
  const localStorageKey = process.env.BLA_ADMIN_USER_KEY || USER_KEY_DEFAULT
  
  switch (loginAction.type) {
    case "login":
      loginUser()
      const currentUser = localStorage.getItem(localStorageKey)
      // Read, parse, assign info from localData ( populated from loginUser() )
      if (currentUser) {
        const parsedCurrentUser: netlifyIdentity.User = JSON.parse(currentUser)
        return {
          user: {
            isLoggedIn: true,
            id: parsedCurrentUser.id || loginAction?.payload?.id || netlifyLoginState.user.id
          },
          userInfo: parsedCurrentUser
        }
      // No localStorage data? -> assign state from netlify middleware 
      } else {
        return {
          user: {
            isLoggedIn: true, 
            id: loginAction?.payload?.id || netlifyLoginState.user.id
          }, 
          userInfo: loginAction.payload || netlifyLoginState.userInfo}

      }
    case "logout":
      logoutUser()
      return initialLoginState
    default:
      throw new Error("login type must be 'login' or 'logout'")
  }
}

export default function App({ Component, pageProps }: AppProps) {
  // State
  const [adminLoginState, dispatch] = useReducer(loginReducer, initialLoginState, initLoginState)

  useEffect(() => {
    // Netlify Event Listeners
    netlifyIdentity.init()
  
    // Netlify - login event
    netlifyIdentity.on("login", (netlifyUser) => {
      loginUser();
      dispatch({type: "login", payload: netlifyUser})
    })
  
    // Netlify - logout event
    netlifyIdentity.on("logout", () => {
      logoutUser();
      dispatch({type: "logout"})
    })
  },[])
  
  
  return (
    <UserContext.Provider value={{isLoggedIn: adminLoginState.user.isLoggedIn, userId: adminLoginState.user.id} as NetlifyLoginContext}>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </UserContext.Provider>
  )
}
