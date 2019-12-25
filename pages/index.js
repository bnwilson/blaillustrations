import React, {useEffect} from 'react';
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
                <label className="main-body">
                    Dis is the Home page!
                </label>
            </div>
        </div>
    )
}

export default Home;