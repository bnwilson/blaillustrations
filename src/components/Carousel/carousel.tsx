import React, {useState, useEffect} from 'react';
import Arrow from './arrow';
import {ImageSlide} from './imageSlide';
import { GrayMatterFile } from 'gray-matter';
import styles from './carousel.module.css'

/* galleryItems -- structure of .md file read by webpack.context
    data: {
        categories: "Kitty"
        date: Date Fri Dec 20 2019 18:20:35 GMT-0500 (Eastern Standard Time)
        galleryImage: "/images/uploads/bla_girl_1.png"
        tags: Array [ "Freehand Feminism Notreallyfeminism" ]
        title: "BLA Girl" 
    }
*/

/* Public Types */
export interface GalleryMatter {
    document: GrayMatterFile<any>; 
    slug: string;
}

export interface GalleryProps {
    activeItemIndex?: number;
    galleryItems: GalleryMatter[];
}

/* Local Types */
interface GalleryItem {
    categories: string;
    date: Date;
    galleryImage: string;
    tags: string[]
    title: string;
}

interface GalleryState {
    imgUrl: string;
    tags: string[];
    title: string;
    published: string;
}

/** **`Carousel`** component - container that includes _next_ + _prev_ slideshow UI
 * 
 * **component state** 
 *  - **`imageState`**: `GalleryState[]` 
 *  - **`currentIndex`**: `number` _`default=0`_
 * @param {GalleryProps} props 
 *  {**`galleryItems:`** _`GrayMatterFile[]`_ 
 *  **`activeItemIndex:`** _`number | undefined`_}
 * @returns Carousel
 */
function Carousel (props: GalleryProps) {
    // Props - galleryItems, activeItemIndex?
    const {galleryItems, activeItemIndex} = props;
    // State - `imageState`: `GalleryState[]`, `currentIndex`: `number` _`default=0`_
    const [imageState, setImageState] = useState<GalleryState[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    
    useEffect(() => {
        const galleryArray: GalleryState[] = [];
        
        if (galleryItems && galleryItems.length > 0) {
            galleryItems.forEach(item => {
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
        setCurrentIndex(typeof activeItemIndex == 'number' ? activeItemIndex : 0)
    }, [galleryItems, activeItemIndex])

    function prevSlide () {
        const lastImageIndex = imageState.length - 1;
        setCurrentIndex(currentImageIndex => currentImageIndex === 0 ? 
            lastImageIndex : currentImageIndex - 1
        )
    }
    
    function nextSlide () {
        const lastImageIndex = imageState.length - 1;
        setCurrentIndex(currentImageIndex => currentImageIndex === lastImageIndex ? 
            0 : currentImageIndex + 1
        )
    }

    /* Notes:  
        - Keeping in case of isolated usage
        - this logic will be abstracted to props.activeItemIndex initialized by gallery picture click
    */
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
    <>
        {imageState.length > 0 ? 
            <div className={styles.carousel_wrapper}>
                <div className={styles.carousel_footer}>{imageState[currentIndex].title}</div>
                <a className={styles.prev} onClick={prevSlide} >&lt;</a>
                <a className={styles.next} onClick={nextSlide} >&gt;</a>
                <div className={styles.carousel_counter}>{`${currentIndex + 1} / ${imageState.length}`}</div>
                <ImageSlide 
                    imageUrl={imageState[currentIndex].imgUrl}
                    imageDate={imageState[currentIndex].published}
                    imageTitle={imageState[currentIndex].title}
                    imageTags={imageState[currentIndex].tags}
                />
            </div> :
            <div >Loading...</div>
        }
    </>
    )
}

export default Carousel;

/*  Old html structure, keeping for (mostly css) reference for cleanup later
<div className="carousel_wrapper">
    <h2 style={{textAlign: "center", fontStyle: "italic"}}>
        {imageState[currentIndex].title}
    </h2>
    <div className="carousel">
        <Arrow />
        <ImageSlide 
            imageUrl={imageState[currentIndex].imgUrl}
            imageDate={imageState[currentIndex].published}
            imageTitle={imageState[currentIndex].title}
            imageTags={imageState[currentIndex].tags}
        />
        <Arrow />
    
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
</div> */