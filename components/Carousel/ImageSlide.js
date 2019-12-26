import React from 'react';

function ImageSlide (props) {
    const styles = {
        backgroundImage: `url(${props.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }

    return (
        <div className="image_slide" style={styles}></div>
    )
}

export default ImageSlide;