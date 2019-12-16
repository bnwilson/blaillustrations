import Main from './components/Main';
import Head from 'next/head';

const Home = () => {
    return (
        <div className="app-wrapper">
            <style jsx global>{`
                \* {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }
                
                /* Default 20pixels to 1ine-height with default sans-serif font of user’s Browser */
                html {
                    font: 20px/1 sans-serif;
                    background-color: rgba(228, 242, 246, 0.651);
                }
                
                .app-wrapper {
                    min-height: 100vh;
                    max-width: 65rem;
                    min-width: 45rem;
                }
                
                .main-wrapper {
                    width: 80%;
                    margin: 0 auto;
                }
                
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
                }
            `}

            </style>
            <Head>
                <title>BLA Illustrations</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Main />
        </div>
    )
}

export default Home;