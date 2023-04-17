import React from 'react';

function Arrow (props: any) {
    return (
        <div
            className={`slide_arrow ${props.direction}`}
            onClick={props.onclick}>
            {props.glyph}
        </div>
    )
}

export default Arrow;