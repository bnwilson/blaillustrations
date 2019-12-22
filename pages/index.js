import React, {useEffect} from 'react';
import Main from '../components/Main';
import Head from 'next/head';
import netlifyIdentity from 'netlify-identity-widget';

const Home = () => {
    useEffect(() => {
        // if (window.netlifyIdentity) {
        //     window.netlifyIdentity.on("init", user => {
        //     if (!user) {
        //         window.netlifyIdentity.on("login", () => {
        //         document.location.href = "/admin/";
        //         });
        //     }
        // })
        // }}

        netlifyIdentity.init();
    },[])

    return (
        <div>
            <div className="app-wrapper">
                <Head>
                    <title>BLA Illustrations</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <link href="/static/style.css" rel="stylesheet" />
                </Head>
                <label className="main-body">
                    Dis is the Home page!
                </label>
            </div>
        </div>
    )
}

export default Home;