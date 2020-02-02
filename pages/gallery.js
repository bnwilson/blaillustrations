import React from 'react';
import matter from 'gray-matter';
import css from '../static/gallery.css';
import Carousel from '../components/Carousel/Carousel';

const gallerySections = [
    {
        name: "gallery",
        title: "Gallery",
        menuText: "Gallery"
    },
    {
        name: "portraits",
        title: "Portraits",
        menuText: "Portraits"
    },
    {
        name: "stickers",
        title: "Stickers",
        menuText: "Stickers"
    }
]

function Gallery (props) {
    const gallerySections = [
        {
            sectionKey: "portraits",
        }
    ]
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
    return {
        galleryItems: gallery
    }
}

export default Gallery;

let blah = []