import {useState} from 'react';
import Navbar from './Navbar';
import Footer from './Footer';


function Main () {
    const mainPages = {
        "gallery": "Gallery",
        "about": "About",
        "contact": "Contact"
    }
    const [state, setState] = useState("");

    const navClick = (event) => {
        const value = event.target.getAttribute('value');
        setState(mainPages[value]);
    }

    return (
        <div className="main-wrapper">
            <style jsx global>{`
            .nav-item:hover {
                color: yellow;
                cursor: pointer;
            }
            
            .nav-header {
                display: flex;
                flex-direction: column;
                align-items: center;
                max-height: 10rem;
                margin: 0 2rem 5rem;
            }`}</style>
            <Navbar onclick={navClick} />
            {!state ? "This is BLA Illustrations Home Page" : state}
            <Footer/>
        </div>
    )
}

export default Main;