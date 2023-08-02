import React, { ReactElement, useEffect } from 'react';
// import matter from 'gray-matter';
import {Carousel,GalleryProps} from '../components/Carousel';
import { Layout } from '@/components/Layout';

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

function GalleryPage (props: GalleryProps) {
    const gallerySections = [
        {
            sectionKey: "portraits",
        }
    ]
    useEffect(() => console.log(props))


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
GalleryPage.getInitialProps = function() {
    // const matter = require('gray-matter')
    const getGallery = (context: __WebpackModuleApi.RequireContext) => {  
        const galleryContext = [] as {document: any, slug: string}[]
        const keys = context.keys();
        const values: any[] = keys.map(context);
        console.log(JSON.stringify(context.keys()))
        // console.log('* * Values:  ' + JSON.stringify(values, null, 2))
        const slugs = keys.map((key, i) => {
            return  key
            .replace(/^.*[\\/]/, "")
            .split(".")
            .slice(0, -1)
            .join(".")
        })
        values.forEach((v, i) => {
            console.log(JSON.stringify(v.default, null, 2))
            let slug = slugs[i]
            // let document: any = matter(v.default)
            galleryContext.push({document: v.default, slug})
        })
        return galleryContext
        /* 
        const data = keys.map((key, index) => {
            // slug: "public/gallery/201912-santa-paws.md" -> "201912-santa-paws"
            const slug = key
              .replace(/^.*[\\/]/, "")
              .split(".")
              .slice(0, -1)
              .join(".")
            console.log(JSON.stringify(values[index].default)) 
            // const document: any = matter(values[index].default);
            const document: any = matter(values[index].default);
            // console.log(JSON.stringify(document, null, 2))
            return {
                document, slug
            }
        })
        */
        // console.log(JSON.stringify(data, null, 2))
    }
    
    return {
        galleryItems: getGallery(require.context("public/gallery", false, /^public[\\/]gallery[\\/].*\.md$/))
    }
}



export default GalleryPage;

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

/* Example content from 'values' 
{
    "default": {
      "content": "\r\n",
      "data": {
        "title": "Santa Paws",
        "date": "2019-12-25T23:45:35.366Z",
        "categories": "Kitty",
        "tags": [
          "christmas",
          "holidayspirit",
          "kitty"
        ],
        "galleryImage": "/images/uploads/untitled_artwork-30-.jpg"
      },
      "isEmpty": false,
      "excerpt": ""
    }
  }
*/