import React, {useRef} from 'react';
import css from '../static/contact.css';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';

// 12/30 -- Will add function in Netlify that will trigger an email
//          via '@sendgrid/mail'
//  ref: https://github.com/sendgrid/sendgrid-nodejs/tree/master/packages/mail


export default function Contact () {
    const validSchema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().notRequired(),
        email: yup.string().email().required(),
        messageBody: yup.string()
            .min(15, (msg => {console.log("min-->  ",msg); return `Must be at least ${msg.min} characters.`}))
            .max(1000),
        subject: yup.string()
    })

    const {register, handleSubmit, errors} = useForm({
        validationSchema: validSchema
    })

    const onSubmit = async (data) => {
        console.log(data);
        const res = await fetch("/.netlify/functions/form_email");
        const resData = await res.json();
        console.log(resData);
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
    const subjectOptions = [
        "Commission Request", "General Question", "Special Order Inquery"
    ]

    return (
        <div className={css.wrapper}>
            <form className={css.contact_form} onSubmit={handleSubmit(onSubmit)}>
                <h1 style={{textAlign: "center"}}> Contact Form for Brittany</h1>
                <ul style={{listStyle: "none"}}>
                    <li>
                        <label htmlFor="first_name">First Name: </label>
                        <input id="first_name" className={css.contact_input} name="firstName" ref={register} />
                        {errors.firstName && <p className={css.contact_error}>{errors.firstName.message}</p>}
                    </li>
                    <li>
                        <label htmlFor="last_name">Last Name: </label>
                        <input id="last_name" className={css.contact_input} name="lastName" ref={register} />
                        {errors.lastName && <p className={css.contact_error}>{errors.lastName.message}</p>}
                    </li>
                    <li>
                        <label htmlFor="email">Email Address: </label>
                        <input className={css.contact_input} name="email" ref={register} />
                        {errors.email && <p className={css.contact_error}>{errors.email.message}</p>}
                    </li>
                    <li>
                        <label htmlFor="subject">Select a subject: </label>
                        <select id="subject" className={css.contact_selection} name="subject" ref={register}>
                            {subjectOptions.map((item, index) => (
                                <option value={item} key={index}>{item}</option>
                                ))}
                        </select>
                    </li>
                    <li>
                        <label htmlFor="message_body">Enter your message: </label>
                        <textarea id="message_body" className={css.contact_body} name="messageBody" ref={register}>
                            Please Enter your message body here...
                        </textarea>
                        {errors.messageBody && <p className={css.contact_error}>{errors.messageBody.message}</p>}
                    </li>
                    <button className={css.contact_button}>sSubmit</button>
                </ul>
            </form>

            <div className={css.contacts}>
                {contacts.map((item, index) => (
                    <a className={css.contactItem} key={index} href={item.url || "https://google.com"}>{item.title}</a>
                    ))}
            </div>
        </div>
    )
}