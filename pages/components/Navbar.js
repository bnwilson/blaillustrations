import '../../public/styles/style.css';
import BlaLogo from '../../public/BLAlogo.png';
import NavBackground from '../../public/slide1.png'

function Logo () {
    const navLogoStyle = {
        "marginTop": ".5rem"
    }

    return (
        <a href="/">
            <img 
                className="nav-logo" 
                alt="BLA Illustrations"
                src={BlaLogo}
                style={navLogoStyle}
            />
        </a>
    )
}

function Navbar (props) {

    /* * Style Objects * */

    const navListStyle = {
        "display": "flex",
        "flexDirection": "row",
        "marginBottom": ".50rem",
        "listStyle": "none"
    }

    const navItemStyle = {
        "color": "whitesmoke",
        "borderStyle": "none",
        "background": "none",
        "fontStyle": "normal",
        "padding": ".25rem 1rem"
    }

    const navTitleStyle = {
        "color": "whitesmoke"
    }

    /* * * * * * * * * * * * */

    
    
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

                </ul>
            </nav>
        </div>
    )
}

export default Navbar;