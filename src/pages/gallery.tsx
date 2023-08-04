import React, { useEffect } from 'react';
// import matter from 'gray-matter';
import {Carousel,GalleryProps} from '../components/Carousel';
import { Layout } from '@/components/Layout';
import { Box, Heading, Text } from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons';

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

// Just a flag to render the message banner instead of the (old) Gallery
const UNDER_CONSTRUCTION = true

function UnderConstructionBanner() {
    const bannerMessage = "   Sorry!  The Gallery is under construction.   "
    const bannerSubMessage = "This page is being actively worked on and will be available soon.  Thanks!"
    
    return (
        <Box pb={"2"} bgColor={"red.300"} color={"gray.700"} textAlign={"center"} minW={"80%"}>
            <Heading mb={"3"} colorScheme={"purple"} >
                <WarningIcon />{bannerMessage}<WarningIcon />
            </Heading>
            <Text fontSize={'xl'}>
                {bannerSubMessage}
            </Text>
        </Box>
    )
}

function GalleryPage (props: GalleryProps) {
    const gallerySections = [
        {
            sectionKey: "portraits",
        }
    ]
    

    return (
        <div className="gallery">
            {props.galleryItems && !UNDER_CONSTRUCTION ? 
                (<Carousel galleryItems={props.galleryItems}/>) :
                (<UnderConstructionBanner />)
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