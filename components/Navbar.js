import React,{useContext} from 'react';
import Link from 'next/link';
import UserContext from './userContext';

const BlaLogo = './BLAlogo.png';
const NavBackground = './slide1.png';

const styles = {
    navListStyle: {
        "display": "flex",
        "flexDirection": "row",
        "marginBottom": ".50rem",
        "listStyle": "none"
    },
    navItemStyle: {
        "color": "whitesmoke",
        "borderStyle": "none",
        "background": "none",
        "fontStyle": "normal",
        "padding": ".25rem 1rem"
    },
    navTitleStyle: {
        "color": "whitesmoke"
    },
    navBarStyle: {
        "display": "flex",
        "justifyContent": "center",
        "width": "100%"
    },
    navLogoStyle: {
        "marginTop": ".5rem"
    }
}

function Logo () {

    return (
        <Link href="/">
            <a>
                <img 
                    className="nav-logo" 
                    alt="BLA Illustrations"
                    src={BlaLogo}
                    style={styles.navLogoStyle}
                />
            </a>
        </Link>
    )
}

function AdminLink () {
    return (
    <Link href="/admin">
        <a className="nav-item">Admin</a>
    </Link>
    )
}

function Navbar (props) {
    const { isLoggedIn } = useContext(UserContext)

    /* * Style Objects * */
    const navListStyle = styles.navListStyle;
    const navItemStyle = styles.navItemStyle;
    const navTitleStyle = styles.navTitleStyle;
    const navBarStyle = styles.navBarStyle;
    
    const navItems = [
        {
            title: "Gallery",
            value: "gallery",
            url: "/gallery"
        },
        {
            title: "Contact",
            value: "contact",
            url: "/contact"
        },
        {
            title: "About",
            value: "about",
            url: "/about"
        }
    ]

    const navStyle = {
        "backgroundImage": `url(${NavBackground})`,
        "backgroundSize": "cover"
    }

    return (
        <div className="nav-wrapper nav-header" style={navStyle}>
            <Logo/>
            <h1 className="nav-title" style={navTitleStyle}>BLA Illustrations</h1>
            <nav className="navbar" style={navBarStyle}>
                <ul className="nav-list" >
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <Link href={item.url}>
                                <a className="nav-item">{item.title}</a>
                            </Link> 
                        </li>
                    ))}
                    {isLoggedIn ? (<li><AdminLink/></li>) : ""}
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;