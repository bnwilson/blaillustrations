// Shamelessly copied from --> https://www.netlify.com/blog/2017/10/30/how-to-add-netlify-identity-service-to-react-projects/
// import netlifyIdentity from 'netlify-identity-widget';

const USER_KEY = "currentBlaUser"

export async function loginUser () {
    const {default: netlifyIdentity } = await import('netlify-identity-widget');
        if (netlifyIdentity && netlifyIdentity.currentUser()) {
            const {
                app_metadata, created_at, confirmed_at, email, id, user_metadata 
            } = netlifyIdentity.currentUser();
    
            localStorage.setItem(
                USER_KEY, 
                JSON.stringify({...app_metadata, created_at, confirmed_at, email, id, ...user_metadata})
            )
        }
}
    
export function logoutUser() {
        localStorage.removeItem(USER_KEY)
    }

