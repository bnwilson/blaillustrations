import React, {useEffect} from 'react';
import Link from 'next/link';
// import netlifyIdentity from 'netlify-identity-widget';

const Home = () => {
    // useEffect(() => {
    //     if (window.netlifyIdentity) {
    //         window.netlifyIdentity.on("init", user => {
    //         if (!user) {
    //             window.netlifyIdentity.on("login", () => {
    //             document.location.href = "/admin/";
    //             });
    //         }
    //     })
    //     }}

    //     netlifyIdentity.init();
    // },[])

    return (
        <div>
            <div className="app-wrapper">
                <section className="home-wrapper">
                    <h2 className="home-title">
                        Thank you for visiting BLAIllustrations!
                    </h2>
                    <br/><br/>
                    <h4 className="home-body">
                        The site is currently a work in progress, but feel free to check out the 
                        <Link href="/gallery">
                            <a > Gallery </a>
                        </Link>
                        or drop Brittany a line in the 
                        <Link href="/contact">
                            <a > Contact Page </a>
                        </Link>
                        !
                    </h4>
                </section>
            </div>
        </div>
    )
}

export default Home;