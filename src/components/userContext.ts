import {createContext} from 'react';

export interface NetlifyLoginContext {
    isLoggedIn: boolean
    userId?: string
}

// false-null assertion to bypass 'Default' value type-error
const UserContext = createContext({isLoggedIn: false} as NetlifyLoginContext);

export default UserContext;