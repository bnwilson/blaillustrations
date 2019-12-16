import '../../public/styles/style.css';
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
            <Navbar onclick={navClick} />
            {!state ? "loading" : state}
        </div>
    )

}