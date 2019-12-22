import Navbar from './Navbar';
import Footer from './Footer';
import css from '../static/style.css';
import Head from 'next/head';

function Layout(props) {

    return (
        <div className={css.app}>
            <Head>
                <title>BLA Illustrations</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link href="/static/style.css" rel="stylesheet" />
            </Head>
            <Navbar />
            <div className={css.main}>
                {props.children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout;
