import Navbar from './Navbar';
import Footer from './Footer';
import css from '../static/style.css';
const backgroundUrl = "/speckle_background.bmp";

function Layout(props) {

    return (
        <div style={{backgroundImage: `url(${backgroundUrl})`, backgroundSize: "cover"}} className={css.app}>
           
            <Navbar />
            <div className={css.main}>
                {props.children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout;
