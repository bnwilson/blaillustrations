import React, {useState} from 'react';
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

function ImageSlide (props) {
    const [isHover, setIsHover] = useState(false);

    function handleHover () {
        toggleHover();
    }

    function toggleHover () {
        setIsHover(!isHover)
    }

    const styles = {
        backgroundImage: `url(${props.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
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
                        <p className="image_body">
                            {props.imageTags && props.imageTags.join(" ")}
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

export default ImageSlide;