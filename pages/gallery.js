import React from 'react';
import Head from 'next/head';

function Gallery () {
    // const galleryStyle = {
    //     "display": "grid",
    //     "grid-template-columns": "1fr 1fr 1fr",
    //     "grid-template-rows": "1fr auto",
    //     "gap": ".5rem",
    //     "margin": "5rem 1rem"
    // }

    // const galleryItemStyle = {
    //     "backgroundColor": "rgba(233, 235, 222, .4)",
    //     "border": "2px solid gray",
    //     "padding": "1px"
    // }

    const galleryTempItems = ["One", "Two", "Three", "Four", "Fivers", "Sixers", "Se7en", "Eight", "Nine"]

    return (
        <div>
            <Head>
                <link rel="stylesheet" href="/static/gallery.css" key="gallery"/>
            </Head>
            <div className="main-gallery">
                {galleryTempItems.map((item, index) => (
                    <label key={index} className="gallery-item">
                        {item}
                    </label>
                ))}
            </div>
        </div>
    )
}

export default Gallery;