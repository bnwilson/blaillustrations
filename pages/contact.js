import React, {useRef, useState} from 'react';
import css from '../static/contact.css';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import ReCAPTCHA from 'react-google-recaptcha';

// 12/30 -- Will add function in Netlify that will trigger an email
//          via '@sendgrid/mail'
//  ref: https://github.com/sendgrid/sendgrid-nodejs/tree/master/packages/mail

/*** Global Values ***/
const RECAPTCHA_SITE_KEY = process.env.RECAPTCHA_SITE_KEY;
const MIN_MESSAGE = 15; // Minimum message char count
const MAX_MESSAGE = 1000; // Max message char count
const styles = {
    goodFont: "#4b834b",
    badFont: "#8d1f1f",
    defaultMessage: "Please Enter your message body here..."
}

export default function Contact () {
    /*** Contact Form State ***/
    const [loadingText, setLoadingText] = useState("Loading");

    /*** ReCAPTCHA State ***/
    const [captchaSuccess, setCaptchaSuccess] = useState(false);
    const [captchaError, setCaptchaError] = useState({
        iseErrored: false, errorMessage: "reCAPTCHA must be validated to submit!"
    });

    // ReCAPTCHA Handlers
    const handleCaptchaChange = (val) => {
        // null value is passed when token is expired
        if (val === null) {
            setCaptchaSuccess(false);
            setCaptchaError({
                iseErrored: true,
                errorMessage: "Sorry, your reCAPTCHA token has expired. Please validate that your are a person again, please :)."
            })
        } else {
            console.log("ReCaptcha success value --->  ", val);
            setCaptchaSuccess(true);
            setCaptchaError({
                errorMessage: "reCAPTCHA must be validated to submit!",
                iseErrored: false
            })
        }
    }
    
    const handleCaptchaError = (val) => {
        console.log("ReCaptcha error value --->  ", val);
        if (!captchaSuccess) { 
            setCaptchaSuccess(false);
            setCaptchaError(prevCaptchaState => setCaptchaError({
                ...prevCaptchaState,
                iseErrored: true
            }))
        };

    }

    /*** Form Completion State ***/
    const [formState, setFormState] = useState({
        isFormComplete: false,
        isFormLoading: false
    });
    const [charLength, setCharLength] = useState(0);
    const formSubmitText = {
        loading: <h2 className={css.form_header}>{loadingText}</h2>,
        complete: <h2 className={css.form_header}>Thank you for your submission!</h2>
    };

    /*** Social Media Content ***/
    const contacts = [
        {title: "Instagram", url: "", image: ""},
        {title: "Facebook", url: "", image: ""},
        {title: "Etsy", url: "", image: ""},
        {title: "Email", url: "", image: ""}
    ]

    const subjectOptions = [
        "Commission Request", "General Question", "Special Order Inquery"
    ]

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
    };
    
    // yup schema for Form input error handling
    const validSchema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().notRequired(),
        email: yup.string().email().required(),
        messageBody: yup.string()
            .min(MIN_MESSAGE, (msg => {return `Must be at least ${msg.min} characters.`}))
            .max(MAX_MESSAGE),
        subject: yup.string()
    });

    // react-hook-form
    const {register, handleSubmit, errors} = useForm({
        validationSchema: validSchema
    });

    // Form Input and Submit handlers
    const handleMessageInput = (event) => {
        let textValue = event.target.value;
        let textCount = textValue.length;
        setCharLength(textCount);
    };

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

    return (
        <div className={css.wrapper}>
            {!formState.isFormLoading && !formState.isFormComplete ?
                (<div style={{display: "flex", justifyContent: "center", alignContent: "center", flexDirection: "column"}}>
                    <h1 className={css.form_header}> Contact Form for Brittany</h1>
                        {errors.firstName || errors.lastName || errors.email || errors.messageBody || captchaError.iseErrored ? 
                            (<span className={css.form_errors}>
                                <ul>
                                    {errors.firstName && <li className={css.contact_error}>{errors.firstName.message}</li>}
                                    {errors.lastName && <li className={css.contact_error}>{errors.lastName.message}</li>}
                                    {errors.email && <li className={css.contact_error}>{errors.email.message}</li>}
                                    {errors.messageBody && <li className={css.contact_error}>{errors.messageBody.message}</li>}
                                    {captchaError.iseErrored && <li className={css.contact_error}>{captchaError.errorMessage}</li>}
                                </ul>
                            </span>)
                            : ""
                        }
                    <form className={css.contact_form} onSubmit={handleSubmit(onSubmit)}>
                        <ul style={{listStyle: "none"}}>
                            <li>
                                <label htmlFor="first_name">First Name: </label>
                                <input id="first_name" className={css.contact_input} name="firstName" ref={register} />
                            </li>
                            <li>
                                <label htmlFor="last_name">Last Name: </label>
                                <input id="last_name" className={css.contact_input} name="lastName" ref={register} />
                            </li>
                            <li>
                                <label htmlFor="email">Email Address: </label>
                                <input className={css.contact_input} name="email" ref={register} />
                            </li>
                            <li>
                                <label htmlFor="subject">Select a Subject: </label>
                                <select id="subject" className={css.contact_selection} name="subject" ref={register}>
                                    {subjectOptions.map((item, index) => (
                                        <option value={item} key={index}>{item}</option>
                                        ))}
                                </select>
                            </li>
                            <li className={css.contact_message}>
                                <label style={{display: "inline-block", textAlign: "center", width: "100%"}} htmlFor="message_body">
                                    Please enter your message below 
                                    <p style={{fontSize: ".7rem", textAlign: "center", padding: ".5rem 0", opacity: ".8"}}>Must be more than {MIN_MESSAGE} characters</p>
                                    <p  className="contact_charcount"
                                        style={{
                                            color: (charLength >= MIN_MESSAGE && charLength <= MAX_MESSAGE ? styles.goodFont : styles.badFont)
                                        }}>
                                        Chars: {charLength}
                                    </p>
                                    <textarea id="message_body" 
                                        className={css.contact_body} 
                                        name="messageBody" 
                                        ref={register}
                                        placeholder={styles.defaultMessage}
                                        onChange={handleMessageInput}
                                        // readOnly={false}
                                    />
                                </label>
                                
                            </li>
                            <li>
                                {captchaSuccess ? 
                                    (<button className={css.contact_button}>Submit</button>) :
                                    (<div className="captcha_wrapper">
                                        <ReCAPTCHA
                                            sitekey={RECAPTCHA_SITE_KEY}
                                            size="normal"
                                            onChange={handleCaptchaChange}
                                            onErrored={handleCaptchaError}
                                            theme="dark"
                                        />
                                    </div>)
                                }
                            </li>
                        </ul>
                    </form>
                </div>)
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