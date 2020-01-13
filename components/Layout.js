import Navbar from './Navbar';
import Footer from './Footer';
import css from '../static/style.css';

function Layout(props) {

    return (
        <div className={css.app}>
           
            <Navbar />
            <div className={css.main}>
                {props.children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout;
