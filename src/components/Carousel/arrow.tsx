import React, { MouseEventHandler } from 'react';

interface ArrowProps {
    direction: "left" | "right";
    onclick: () => void;
    glyph?: string; // 'prev' = &#9664;  'next' = &#9654;
}
/** Arrow - clickable (_'prev'_ or _'next'_ ) interaction with slideshow
 * 
 *  'left' = `&#9664;`  
 *  'right' = `&#9654;`
 * @param {ArrowProps} props  
 * @returns 
 */
function Arrow (props: ArrowProps) {
    const {direction, onclick, glyph} = props
    return (
        <div
            className={`slide_arrow ${direction}`}
            onClick={onclick}>
            {`${glyph || direction === "left" ? "&#9664;" : "&#9654;"}`}
        </div>
    )
}

export default Arrow;