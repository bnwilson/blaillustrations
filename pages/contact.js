import React, {useRef} from 'react';
import css from '../static/contact.css';
import {useForm} from 'react-hook-form'


export default function Contact () {
    const BLA_EMAIL = 'YmxhaWxsdXN0cmF0aW9uc0BnbWFpbC5jb20='
    const {register, handleSubmit} = useForm()
    const onSubmit = (data) => {
        let emailStart = 'mailto:' + atob(BLA_EMAIL)
        window.location.href()
    }

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