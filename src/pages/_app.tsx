// Stylesheets (global)
import '@/styles/globals.css'
import '@/styles/gallery.css'
import '@/styles/store.css'
// Providers
import { ChakraProvider, useDisclosure } from '@chakra-ui/react'
import { CartProvider, ShopifyProvider } from '@shopify/hydrogen-react'
// Netlify + CMS login context
import * as netlifyIdentity from 'netlify-identity-widget'
import { loginUser, logoutUser } from '@/utils/netlifyIdActions'
import UserContext, {NetlifyLoginContext} from '@/components/userContext'
import type { AppProps } from 'next/app'
// React | NextJS
import { useEffect, useReducer } from 'react'
import { Layout } from '@/components/Layout'
// Components
import { CartButton, CartDrawer, AddToCartToast } from '@/components/BlaShop/Cart'

/* TODO:  implement 'reconciliation'
 * - - - - - - - - - - - - - - - - - - - - -
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
 */

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
/* TODO:  implement 'reconciliation' for state persistence
 * - - - - - - - - - - - - - - - - - - - - -
type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
}; */

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
  const {isOpen, onClose, onOpen} = useDisclosure()
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
  
  // TODO -- implement 'reconciliation' 
  //    (https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts)
  // const getLayout = Component?.getLayout ?? ((page: any) => page)
  
  return (
    <UserContext.Provider value={{isLoggedIn: adminLoginState.user.isLoggedIn, userId: adminLoginState.user.id} as NetlifyLoginContext}>
      <ChakraProvider>
        <ShopifyProvider
          storeDomain={process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || ''}
          storefrontToken={process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN || ''}
          storefrontApiVersion={process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || '2023-04'}
          countryIsoCode='US'
          languageIsoCode='EN'
        >
          <CartProvider onLineAdd={() => {}} onLineAddComplete={() => {AddToCartToast}}>
            <Layout>
              <CartButton onclick={onOpen} />
              <CartDrawer onClose={onClose} isOpen={isOpen} />
              <Component {...pageProps} />
            </Layout>
          </CartProvider>
        </ShopifyProvider>
      </ChakraProvider>
    </UserContext.Provider>
  )
}
