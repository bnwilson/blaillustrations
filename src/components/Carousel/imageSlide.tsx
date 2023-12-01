import React, {useState} from 'react';
// import { Tags } from './Tags';
import styles from './imageSlide.module.css'
import { Image } from '@chakra-ui/react';

/* Structure of .md file read by webpack.context
    data: {
        categories: "Kitty"
        date: Date Fri Dec 20 2019 18:20:35 GMT-0500 (Eastern Standard Time)
        galleryImage: "/images/uploads/bla_girl_1.png"
        tags: Array [ "Freehand Feminism Notreallyfeminism" ]
        title: "BLA Girl" 
    }
*/

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

/**
 * 
 * @param {ImageSlideProps} props `imgUrl=''`, `imgDate=''`, `imgTitle=''`, `imgTags=[...'']`
 * @returns 
 */
export function ImageSlide (props: ImageSlideProps) {
    const [isHover, setIsHover] = useState(false);

    return (
        <>
            <Image 
                src={props.imageUrl} 
                className={styles['image-slide']} 
                alt={props.imageTitle} 
            />
            {/* <div className={styles.overtext}>{props.imageTitle}</div>
            <div className={styles.overlay} > </div> */}
        </>
        
    )
}   
            
        /* <div className="image_info">
                <h2 className="image_hover_title">
                    {props.imageTitle}
                </h2>
                <p className="image_body">
                    {props.imageTags ? 
                        <Tags tags={props.imageTags} isUpperCase={false} /> :
                        ""
                    }
                </p>
            </div>     
        */