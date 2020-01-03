import React, {useRef, useState} from 'react';
import css from '../static/contact.css';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';

// 12/30 -- Will add function in Netlify that will trigger an email
//          via '@sendgrid/mail'
//  ref: https://github.com/sendgrid/sendgrid-nodejs/tree/master/packages/mail


export default function Contact () {
    const [loadingText, setLoadingText] = useState("Loading")
    const [formState, setFormState] = useState({
        isFormComplete: false,
        isFormLoading: false
    })

    const loadingTextAnimation = () => {
        let loaderText = setTimeout(() => {
            setLoadingText("Loading .")
            loaderText = setTimeout(() => {
                setLoadingText("Loading . .");
                loaderText = setTimeout(() => {
                    setLoadingText("Loading . . .")
                }, 40)
            }, 40)
        }, 10)
    }

    const formSubmitText = {
        loading: <h2 className={css.form_header}>{loadingText}</h2>,
        complete: <h2 className={css.form_header}>Thank you for your submission!</h2>
    }

    const validSchema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().notRequired(),
        email: yup.string().email().required(),
        messageBody: yup.string()
            .min(15, (msg => {return `Must be at least ${msg.min} characters.`}))
            .max(1000),
        subject: yup.string()
    })

    const {register, handleSubmit, errors} = useForm({
        validationSchema: validSchema
    })

    const onSubmit = (data) => {
        loadingTextAnimation();
        setFormState(prevState => {
            return {...prevState, isFormLoading: true}
        })
        fetch("/.netlify/functions/form_email", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            console.log(res);
            try {
                setFormState({isFormLoading: false, isFormComplete: true});
                return res.json();
            } catch(error) {
                console.warn(error);
                if (!formState.isFormLoading && !formState.isFormComplete) {
                    setFormState({isFormLoading: false, isFormComplete: true});
                    throw new Error(error);
                }
            }
        })
        .catch(err => {
            setFormState({isFormLoading: false, isFormComplete: true});
            console.log(err);
        })
    }

    const contacts = [
        {title: "Instagram", url: "", image: ""},
        {title: "Facebook", url: "", image: ""},
        {title: "Etsy", url: "", image: ""},
        {title: "Email", url: "", image: ""}
    ]

    const subjectOptions = [
        "Commission Request", "General Question", "Special Order Inquery"
    ]

    return (
        <div className={css.wrapper}>
            {!formState.isFormLoading && !formState.isFormComplete ?
                (<form className={css.contact_form} onSubmit={handleSubmit(onSubmit)}>
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
                            <textarea id="message_body" 
                                className={css.contact_body} 
                                name="messageBody" 
                                ref={register}
                                value="Please Enter your message body here..."
                            />
                            {errors.messageBody && <p className={css.contact_error}>{errors.messageBody.message}</p>}
                        </li>
                        <button className={css.contact_button}>sSubmit</button>
                    </ul>
                </form>)
                // Render Loading or Success banner after submit
                : formState.isFormComplete ? 
                    (formSubmitText.complete) : (formSubmitText.loading)
            }
            <div className={css.contacts}>
                {contacts.map((item, index) => (
                    <a className={css.contactItem} key={index} href={item.url || "https://google.com"}>{item.title}</a>
                    ))}
            </div> 
        </div>
    )
}