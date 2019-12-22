import App from 'next/app';
import Layout from '../components/Layout';
import netlifyIdentity from 'netlify-identity-widget';
import {loginUser, logoutUser} from '../utils/netlifyIdActions'
import UserContext from '../components/userContext';

// Local Storage User Key
const USER_KEY = "currentBlaUser"


export default class thisApp extends App {
    
    state = {
        user: {
            isLoggedIn: false,
            id: ""
        },
        userInfo: {}
    }

    componentDidMount = () => {
        netlifyIdentity.init();
        let currentUser = localStorage.getItem(USER_KEY);
        if (currentUser) {
            this.setState({userInfo: JSON.parse(currentUser), user: {isLoggedIn: true}})
        } else {
            this.setState({user: {isLoggedIn: false}})
        }

        // Netlify Event Listeners
        netlifyIdentity.on("login", (netlifyUser) => {
            this.setState({user: {isLoggedIn: true, id: netlifyUser.id}, userInfo: netlifyUser})
            loginUser();
        })
    
        netlifyIdentity.on("logout", (netlifyUser) => {
            this.setState({user: {isLoggedIn: false, id: ""}, userInfo: {}})
            logoutUser();
        })
    }

    render () {
        const { Component, pageProps } = this.props;
        return (
            <UserContext.Provider value={{isLoggedIn: this.state.user.isLoggedIn, userId: this.state.user.id}}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </UserContext.Provider>
        )

    }

}