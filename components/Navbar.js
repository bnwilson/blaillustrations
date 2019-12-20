import React,{useEffect} from 'react';
import Link from 'next/link';

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
        <a style={styles.navItemStyle}>Admin</a>
    </Link>
    )
}


function Navbar (props) {
    /* * Style Objects * */
    const navListStyle = styles.navListStyle;
    const navItemStyle = styles.navItemStyle;
    const navTitleStyle = styles.navTitleStyle;
    const navBarStyle = styles.navBarStyle;
    
    const navItems = [
        {
            title: "Gallery",
            onclick: props.onclick,
            value: "gallery",
        },
        {
            title: "Contact",
            onclick: props.onclick,
            value: "contact"
        },
        {
            title: "About",
            onclick: props.onclick,
            value: "about"
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
                <ul className="nav-list" style={navListStyle}>
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <button className="nav-item" 
                                    value={item.value}
                                    name={item.value}
                                    onClick={item.onclick}
                                    style={navItemStyle}
                            >
                                {item.title}
                            </button>
                                    
                        </li>
                    ))}
                    {props.user ? <AdminLink/> : ""}
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;