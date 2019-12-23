import React from 'react';
import css from '../static/contact.css';

export default function Contact () {
    const contacts = [
        {
            title: "Instagram",
            url: "",
            image: ""
        },
        {
            title: "Facebook",
            url: "",
            image: ""
        },
        {
            title: "Etsy",
            url: "",
            image: ""
        },
        {
            title: "Email",
            url: "",
            image: ""
        }
    ]


    return (
        <div className={css.contacts}>
            {contacts.map((item, index) => (
                <a className={css.contactItem} key={index} href={item.url || "https://google.com"}>{item.title}</a>
            ))}
        </div>
    )
}