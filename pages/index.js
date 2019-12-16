import Main from './components/Main';
import Head from 'next/head';

const Home = () => {
    return (
        <div className="app-wrapper">
            <Head>
                <title>BLA Illustrations</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link href="/styles/style.css" rel="stylesheet" />
            </Head>
            <Main />
        </div>
    )
}

export default Home;