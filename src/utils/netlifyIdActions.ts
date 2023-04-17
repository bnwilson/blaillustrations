import * as netlifyIdentity from 'netlify-identity-widget'

const USER_KEY_DEFAULT = "currentBlaUser"

/** Netlify Identity Action (headless) - 
 * `loginUser`
 * 
 * _Saves login state to localStorage_
 * 
 * @param {string} [userKey=currentBlaUser] - localStorage key, default: _"currentBlaUser"_
 */
const loginUser = (userKey?: string) => {
    const localStorageUserKey = userKey || USER_KEY_DEFAULT
    
    if (netlifyIdentity && netlifyIdentity.currentUser() && netlifyIdentity.currentUser() !== null) {
        const netlifyCurrentUser = netlifyIdentity.currentUser()
        if (netlifyCurrentUser) {
            const {app_metadata, created_at, confirmed_at, email, id, user_metadata} = netlifyCurrentUser
            
            localStorage.setItem(
                localStorageUserKey,
                JSON.stringify({...app_metadata, created_at, confirmed_at, email, id, ...user_metadata})
                )
            }
        }
    }
    
/** 
 * Netlify Identity Action (headless) - 
 * `logoutUser`
 * 
 * _Removes login data from localStorage_
 * 
 * @param {string} [userKey=currentBlaUser] - localStorage key, default: _"currentBlaUser"_
 */
const logoutUser = (userKey?: string) => {
    const localStorageUserKey = userKey || USER_KEY_DEFAULT

    localStorage.getItem(localStorageUserKey) ?
        localStorage.removeItem(localStorageUserKey) :
        null
}

export {
    loginUser,
    logoutUser
}