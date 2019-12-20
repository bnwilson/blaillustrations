import React,{useState,useEffect} from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import netlifyIdentity from 'netlify-identity-widget';
import {loginUser, logoutUser} from '../utils/netlifyIdActions'

// Local Storage User Key
const USER_KEY = "currentBlaUser"

function Main (props) {
    const mainPages = {
        "home": "This is BLA Illustrations Home Page",
        "gallery": "Gallery",
        "about": "About",
        "contact": "Contact"
    }

    const [state, setState] = useState({
        page: "",
        user: {
            isLoggedIn: false,
            id: ""
        },
        userInfo: {}
    });

    useEffect(() => {
        let thisState = state;
        let currentUser = localStorage.getItem(USER_KEY);
        thisState.page = props.stateKey;
        if (currentUser) {
            thisState.userInfo = JSON.parse(currentUser)
            thisState.isLoggedIn = true;
        } else {
            thisState.isLoggedIn = false;
        }
        setState(prevState => ({...prevState, page: mainPages[props.stateKey]}));
        
    },[props])

    const navClick = (event) => {
        const value = event.target.getAttribute('value');
        setState(prevState => ({...prevState, page: mainPages[value]}));
    }

    // Netlify Event Listeners
    netlifyIdentity.on("login", (netlifyUser) => {
        let currentState = state;
        currentState.user.isLoggedIn = true;
        currentState.user.id = netlifyUser.id;
        currentState.userInfo = netlifyUser;
        setState(prevState => ({...prevState, user: {isLoggedIn: true, id: netlifyUser.id}, userInfo: netlifyUser}));
        loginUser();
    })

    netlifyIdentity.on("logout", (netlifyUser) => {
        setState(prevState => ({...prevState, user: {isLoggedIn: false, id: null}, userInfo: null}));
        logoutUser();
    })


    return (
        <div className="main-wrapper">
            <div className="nav">
                <Navbar onclick={navClick} user={state.user.isLoggedIn} />
            </div>
            <div className="main">
                {!state.page ? "Loading Page..." : state.page}
            </div>
            <div className="footer">
                <Footer />
            </div>
        </div>
    )
}

export default Main;