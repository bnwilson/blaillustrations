import React from 'react';
import matter from 'gray-matter';
import {Carousel,GalleryProps} from '../components/Carousel';

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

function Gallery (props: GalleryProps) {
    const gallerySections = [
        {
            sectionKey: "portraits",
        }
    ]


    return (
        <div className="gallery">
            {props.galleryItems ? 
                (<Carousel galleryItems={props.galleryItems}/>) :
                (
                    <p className="gallery_loading">
                        Loading Gallery...
                    </p>
                )
            }
        </div>
    )
}


/* Load files in '/public/gallery/*.md' into context */
Gallery.getInitialProps = async function() {
    const gallery = (context => {
        
        const keys = context.keys();
        const values: any[] = keys.map(context);
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
    })(require.context("../../public/gallery", true, /\.md$/))
    return {
        galleryItems: gallery
    }
}

export default Gallery;

/* Example content from 'matter' 
> matter
{
  content: '\r\n',
  data: {
    title: 'Winter Mittens',
    date: 2019-12-25T23:46:42.716Z,
    categories: 'Kitty',
    tags: [ 'warm', 'kitty', 'cat', 'happy' ],
    galleryImage: '/images/uploads/bla_cats_3.png'
  },
  isEmpty: false,
  excerpt: ''
}
 */