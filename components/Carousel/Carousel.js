import React, {useState, useEffect} from 'react';
import Arrow from './Arrow';
import ImageSlide from './ImageSlide';

// * Data Structure of galleryItems *
//
// data: {…}
//      categories: "Kitty"
//      date: Date Fri Dec 20 2019 18:20:35 GMT-0500 (Eastern Standard Time)
//      galleryImage: "/images/uploads/bla_girl_1.png"
//      tags: Array [ "Freehand Feminism Notreallyfeminism" ]
//      title: "BLA Girl"

function Carousel (props) {
    const [imageState, setImageState] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        let galleryArray = [];
        
        if (props.galleryItems && props.galleryItems.length > 0) {
            props.galleryItems.map(item => {
                const galleryItem = {
                    imgUrl: item.document.data.galleryImage,
                    tags: item.document.data.tags,
                    title: item.document.data.title,
                    published: `${item.document.data.date}`
                } 
                galleryArray.push(galleryItem);
            })
            setImageState(galleryArray);
            setCurrentIndex(0);
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

    return (
        <div className="carousel">
            <Arrow
                direction="left"
                onclick={prevSlide}
                glyph="&#9664;" 
            />
            {imageState.length > 0 ? 
                <ImageSlide imageUrl={imageState[currentIndex].imgUrl} /> :
                <div className="carousel">Loading...</div>
            }

            <Arrow
                direction="right"
                onclick={nextSlide}
                glyph="&#9654;"
            />
        </div>
    )
}

export default Carousel;