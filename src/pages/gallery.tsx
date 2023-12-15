import React, { useEffect, useState } from 'react';
// import matter from 'gray-matter';
import {Carousel} from '../components/Carousel';
import { Layout } from '@/components/Layout';
import { Box, Button, Heading, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, SimpleGrid, Text, useDisclosure } from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons';
import { GrayMatterFile } from 'gray-matter';
import type { 
    GetStaticProps, GetStaticPropsContext, 
    GetStaticPropsResult, InferGetStaticPropsType 
} from 'next';
import { ScriptProps } from 'next/script';

// UnderConstructionBanner - to be removed... was ugly, anyways.
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

// Interfaces - GalleryMatter, GalleryPageProps
interface GalleryMatter {
    document: GrayMatterFile<any>; 
    slug: string;
}
interface GalleryPageProps {
    galleryItems: GalleryMatter[];
}

/** GalleryPage
 * 
 * @param {GalleryPageProps} props Generated from NextJS's `getInitialProps` and `require.context`
 *  - `galleryItems`- `[...GalleryMatter]`
 * @returns `{{url}}/gallery` page
 */
export default function GalleryPage (props: GalleryPageProps): InferGetStaticPropsType<typeof getStaticProps> {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [clickedItemIndex, setClickedItemIndex] = useState<number | undefined>()

    const handlePictureSelect = (pictureIndex: number) => {
        setClickedItemIndex(pictureIndex)
        onOpen()
    }

    const gallerySections = [
        {
            sectionKey: "portraits",
        }
    ]
    

    return (
        <>
        <Modal isOpen={isOpen} onClose={onClose} >
            <ModalOverlay />
            <ModalCloseButton />
            <ModalContent height={["800px", "800px", "700px"]}>
                <Carousel galleryItems={props.galleryItems} activeItemIndex={clickedItemIndex} />
                {/* <ModalBody paddingInlineEnd={0} paddingInlineStart={0} >
                    
                    </ModalBody> 
                */}
            </ModalContent>
        </Modal>
        <SimpleGrid className='gallery' columns={[1, 2, 3]} spacing='10px' gap={1}  >
            {
            props?.galleryItems?.length && 
                props.galleryItems.map((gItem, gIndx) =>
                    <Image boxSize={['350px', '375px', '300px']}
                        className='gallery_item'
                        alt={gItem.document.data.title} 
                        key={gItem?.slug} 
                        objectFit='cover'
                        onClick={() => handlePictureSelect(gIndx)}
                        src={gItem.document.data.galleryImage} 
                    />
                )
            }
        </SimpleGrid>
        </>
    )
}


// ** Legacy API ** 
//    GalleryPage.getInitialProps = function() {
// export function getStaticProps() {
    
/* Load files in '/public/gallery/*.md' into context */
export const getStaticProps: GetStaticProps = () => {
    // const matter = require('gray-matter')
    const getGallery = (requireContext: __WebpackModuleApi.RequireContext) => {  
        const galleryContext = [] as {document: any, slug: string}[]
        const keys = requireContext.keys();
        const values: any[] = keys.map(requireContext);
        const slugs = keys.map((key, i) => {
            return  key
                .replace(/^.*[\\/]/, "")
                .split(".")
                .slice(0, -1)
                .join(".")
        })
        values.forEach((v, i) => {
            // console.log(JSON.stringify(v.default, null, 2))
            let slug = slugs[i]
            // let document: any = matter(v.default)
            galleryContext.push({document: v.default, slug})
        })
        return galleryContext
    }
    
    return {
        props: {
            galleryItems: getGallery(require.context("public/gallery", false, /^public[\\/]gallery[\\/].*\.md$/))
        }
    }
}

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