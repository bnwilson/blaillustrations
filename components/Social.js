import React from 'react';

const blaImage = "/bla_logo.png";

function Social () {
    const socialItems = [
        {
            title: "Facebook",
            url: "https://www.facebook.com/blaillustrations",
            logoUrl: "/icons/fb_logo.png",
            bgColor: "#555"
        },
        {
            title: "Instagram",
            url: "",
            logoUrl: "",
            bgColor: "#555"
        },
        {
            title: "Etsy",
            url: "",
            logoUrl: "",
            bgColor: "#555"
        },
        {
            title: "Imgrum",
            url: "",
            logoUrl: "",
            bgColor: "#555"
        },
    ]

    return (
        <div className="social_wrapper">
            <img className="social_logo" src={blaImage}></img>
            <label onMouse className="social_item">
                <img style={}></img>
            </label>

        </div>
    )
}