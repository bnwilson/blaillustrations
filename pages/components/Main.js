import React,{useState,useEffect} from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Head from 'next/head';


function Main (props) {
    const mainPages = {
        "home": "This is BLA Illustrations Home Page",
        "gallery": "Gallery",
        "about": "About",
        "contact": "Contact"
    }
    const [state, setState] = useState("");
    useEffect(() => {
        setState(props.stateKey);
    },[props])

    const navClick = (event) => {
        const value = event.target.getAttribute('value');
        setState(mainPages[value]);
    }

    return (
        <div className="main-wrapper">
            <div className="nav">
                <Navbar onclick={navClick} />
            </div>
            <div className="main">
                {!state ? "Loading Page..." : state}
            </div>
            <div className="footer">
                <Footer />
            </div>
        </div>
    )
}

export default Main;