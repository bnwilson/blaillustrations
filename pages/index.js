import Main from './components/Main';
import Head from 'next/head';

const Home = () => {
    return (
        <div>
            <div className="app-wrapper">
                <Head>
                    <title>BLA Illustrations</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <link href="/static/style.css" rel="stylesheet" />
                    <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
                </Head>
                <Main stateKey="home" />
            </div>
        </div>
    )
}

export default Home;