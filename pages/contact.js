import React, {useRef} from 'react';
import css from '../static/contact.css';
import {useForm} from 'react-hook-form'

// 12/30 -- Will add function in Netlify that will trigger an email
//          via '@sendgrid/mail'
//  ref: https://github.com/sendgrid/sendgrid-nodejs/tree/master/packages/mail


export default function Contact () {
    // const BLA_EMAIL = 'YmxhaWxsdXN0cmF0aW9uc0BnbWFpbC5jb20='
    const {register, handleSubmit} = useForm({
        defaultValues: {
            firstName: "First",
            lastName: "Last",
        }
    })

    const onSubmit = (data) => {
        console.log(data);
        // const {firstName, lastName, subject, mailBody} = data;
        // let emailCmdStart = 'mailto:' + atob(BLA_EMAIL);
        // let subjetEncoded = `?subject=${encodeURI(
        //     "Hello, I'm " + firstName + lastName + " and I have a " +  subject
        // )}`;
        // let bodyEncoded = `&body=${encodeURI(mailBody)}`;
        // console.log("Email link",  emailCmdStart + subjetEncoded + bodyEncoded)
        // window.location.href = emailCmdStart + subjetEncoded + bodyEncoded;
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
        <div className={css.wrapper}>
            <form className={css.contact_form} onSubmit={handleSubmit(onSubmit)}>
                <input className={css.contact_input} name="firstName" ref={register} />
                <input className={css.contact_input} name="lastName" ref={register} />
                <select className={css.contact_selection} name="subject" ref={register}>
                    <option value="Commission Request">
                        Commission Request
                    </option>
                    <option value="General Question">
                        General Question
                    </option>
                    <option value="Special Order">
                        Special Order
                    </option>
                </select>
                <textarea className={css.contact_body} name="mailBody"></textarea>
                <button className={css.contact_button}>sSubmit</button>
            </form>

            <div className={css.contacts}>
                {contacts.map((item, index) => (
                    <a className={css.contactItem} key={index} href={item.url || "https://google.com"}>{item.title}</a>
                ))}
            </div>
        </div>
    )
}