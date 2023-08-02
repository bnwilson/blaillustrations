import React, {useState, useEffect} from 'react';
import Arrow from './Arrow';
import {ImageSlide} from './ImageSlide';
import { GrayMatterFile } from 'gray-matter';

// * Data Structure of galleryItems *
//
// data: {…}
//      categories: "Kitty"
//      date: Date Fri Dec 20 2019 18:20:35 GMT-0500 (Eastern Standard Time)
//      galleryImage: "/images/uploads/bla_girl_1.png"
//      tags: Array [ "Freehand Feminism Notreallyfeminism" ]
//      title: "BLA Girl"

/* Public Types */

export interface GalleryMatter {
    document: GrayMatterFile<any>;
    slug: string;
}

export interface GalleryProps {
    galleryItems: GalleryMatter[]
}

/* Local Types */
interface GalleryItem {
    categories: string;
    date: Date;
    galleryImage: string;
    tags: string[]
    title: string;
}

type GalleryItems = GalleryItem[]

interface GalleryState {
    imgUrl: string;
    tags: string[];
    title: string;
    published: string;
}

function Carousel (props: GalleryProps) {
    const [imageState, setImageState] = useState<GalleryState[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const galleryArray: GalleryState[] = [];
        
        if (props.galleryItems && props.galleryItems.length > 0) {
            props.galleryItems.forEach(item => {
                const galleryItem = {
                    imgUrl: item.document.data.galleryImage,
                    tags: item.document.data.tags,
                    title: item.document.data.title,
                    published: `${item.document.data.date}`
                } as GalleryState
                galleryArray.push(galleryItem);
            })
            setImageState(galleryArray);
        }
    }, [props])

    function prevSlide () {
        let lastImageIndex = imageState.length - 1;
        let currentImageIndex = currentIndex;
        const newIndex = (currentImageIndex === 0) ? lastImageIndex : currentImageIndex - 1;
        setCurrentIndex(newIndex);
    }
    
    function nextSlide () {
        let lastImageIndex = imageState.length - 1;
        let currentImageIndex = currentIndex;
        const newIndex = (currentImageIndex === lastImageIndex) ? 0 : currentImageIndex + 1;
        setCurrentIndex(newIndex);
    }

    function handlePictureSelect (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) {
        // Use data attribute (https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes)
        //    Default to 'getAttribute' method for selector value
        let selectionValue = Number(
            event.currentTarget.dataset.carouselNumber ||
            event.currentTarget.getAttribute('value')
        )
        if (currentIndex !== selectionValue) {
            setCurrentIndex(selectionValue)
        }
    }

    return (
        imageState.length > 0 ? 
            (<div className="carousel_wrapper">
                <h2 style={{textAlign: "center", fontStyle: "italic"}}>
                    {imageState[currentIndex].title}
                </h2>
                <div className="carousel">
                    <Arrow
                        direction="left"
                        onclick={prevSlide}
                        glyph="&#9664;" 
                    />
                    <ImageSlide 
                        imageUrl={imageState[currentIndex].imgUrl}
                        imageDate={imageState[currentIndex].published}
                        imageTitle={imageState[currentIndex].title}
                        imageTags={imageState[currentIndex].tags}
                    />
                    <Arrow
                        direction="right"
                        onclick={nextSlide}
                        glyph="&#9654;"
                    />
                </div>
                <div className="carousel_thumbnail_wrapper">
                    {imageState.map((imgItem, i) => {
                        const imgClassName = (i === currentIndex) ? 
                            "carousel_thumbnail_active" :
                            "carousel_thumbnail_inactive";
                        return (<div className={imgClassName}
                                    onClick={handlePictureSelect}
                                    onTouchEnd={handlePictureSelect}
                                    key={i}
                                    style={{
                                        backgroundImage: `url(${imgItem.imgUrl})`,
                                        backgroundSize: "cover",
                                        maxWidth: "100%",
                                        maxHeight: "100%",
                                        minHeight: "90%",
                                        minWidth: "90%"
                                    }}
                                    data-carousel-number={i}
                                />)
                    })}
                </div>
            </div>) :
        <p className="carousel">Loading...</p>
    )
}

export default Carousel;

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