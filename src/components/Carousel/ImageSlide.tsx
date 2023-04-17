import React, {useState} from 'react';
import { Tags } from './Tags';
// data: {…}
//      categories: "Kitty"
//      date: Date Fri Dec 20 2019 18:20:35 GMT-0500 (Eastern Standard Time)
//      galleryImage: "/images/uploads/bla_girl_1.png"
//      tags: Array [ "Freehand Feminism Notreallyfeminism" ]
//      title: "BLA Girl"

/*   props   */
// imageUrl
// imageDate
// imageTitle
// imageTags

interface ImageSlideProps {
    imageUrl: string
    imageDate: string
    imageTitle: string
    imageTags: string[]
}

export function ImageSlide (props: ImageSlideProps) {
    const [isHover, setIsHover] = useState(false);

    function handleHover () {
        toggleHover();
    }

    function toggleHover () {
        setIsHover(!isHover)
    }

    // const styles = {
    //     backgroundImage: `url(${props.imageUrl})`,
    //     backgroundSize: 'cover',
    //     backgroundPosition: 'center'
    // }

    const styles = {
        backgroundImage: `url(${props.imageUrl})`,
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        overflow: 'hidden',
        margin: '.5rem .25rem'

    }

    return (
        isHover ? 
            (
                <div 
                    className="image_slide image_hover" 
                    style={styles}
                    onMouseOver={handleHover}
                    onMouseOut={toggleHover}
                    onTouchStart={handleHover}
                    onTouchEnd={toggleHover}
                >
                    <div className="image_info">
                        <h2 className="image_hover_title">
                            {props.imageTitle}
                        </h2>
                        {/* <p className="image_body">
                            {props.imageTags && props.imageTags.join(" ")}
                        </p> */}
                        <p className="image_body">
                            {props.imageTags ? 
                                <Tags tags={props.imageTags} isUpperCase={false} /> :
                                ""
                            }
                        </p>
                    </div>
                </div>
            ) :
            (
                <div 
                    className="image_slide" 
                    style={styles}
                    onMouseOver={handleHover}
                    onTouchStart={handleHover}
                    onTouchEnd={toggleHover}
                />
            )


        
    )
}