import React from 'react';
import Head from 'next/head';
import matter from 'gray-matter';
import css from '../static/gallery.css';
import Carousel from '../components/Carousel/Carousel';

function Gallery (props) {
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

    // const galleryTempItems = ["One", "Two", "Three", "Four", "Fivers", "Sixers", "Se7en", "Eight", "Nine"]

    // return (
    //     <div>
    //         {/* <Head>
    //             <link rel="stylesheet" href="/static/gallery.css" key="gallery"/>
    //         </Head> */}
    //         <div className={css.gallery}>
    //             {galleryTempItems.map((item, index) => (
    //                 <label key={index} className={css.gallery_item}>
    //                     {item}
    //                 </label>
    //             ))}
    //         </div>
    //         <div className={css.gallery}>
    //             {props.galleryItems.map((item, index) => (
    //                 <img 
    //                     src={item.document.data.galleryImage} 
    //                     className={css.gallery_item} 
    //                     alt="Couldn't load, sorry!"
    //                     key={index}
    //                 />
    //             ))}
    //         </div>
    //     </div>
    // )
    return (
        <div className={css.gallery}>
            {props.galleryItems ? 
                (<Carousel galleryItems={props.galleryItems}/>) :
                (
                    <p className={css.gallery_loading}>
                        "Loading Gallery..."
                    </p>
                )
            }
        </div>
    )
}


Gallery.getInitialProps = async function() {
    const gallery = (context => {
        const keys = context.keys();
        const values = keys.map(context);
        const data = keys.map((key, index) => {
            const slug = key
              .replace(/^.*[\\\/]/, "")
              .split(".")
              .slice(0, -1)
              .join(".")
            const value = values[index]
            const document = matter(value.default);
            return {
                document, slug
            }
        })
        return data
    })(require.context("../public/gallery", true, /\.md$/))
    console.log(gallery);
    return {
        galleryItems: gallery
    }
}

export default Gallery;

let blah = []