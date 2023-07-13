import React, {ReactElement, useRef, useState} from 'react';
import css from '@/styles/contact.module.css';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import ReCAPTCHA from 'react-google-recaptcha';
import { Layout } from '@/components/Layout';

// TODO:  Replace 'react-hook-form' + 'yup' with ChakraUI components
//  ref: https://github.com/sendgrid/sendgrid-nodejs/tree/master/packages/mail

/*** Iterator for Loading 'animation' ***/
function* loadingIterator() {
    let loadMsg = ""
    let loadCount = 0
    while (loadCount <= 40) {
        loadCount += 1
        loadMsg += " .".repeat(loadCount % 4) // Reset dots every 4 iterations
        yield loadMsg
    }
}

export default function Contact () {
    /*** Global Values ***/
    const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || process.env.RECAPTCHA_SITE_KEY || "";
    const MIN_MESSAGE = 15; // Minimum message char count
    const MAX_MESSAGE = 1000; // Max message char count
    const styles = {
        goodFont: "#4b834b",
        badFont: "#8d1f1f",
        defaultMessage: "Please Enter your message body here..."
    }
    console.log(`* SITE KEY * --=---> ${RECAPTCHA_SITE_KEY}`)
    /*** Contact Form State ***/
    const [loadingText, setLoadingText] = useState("Loading");

    /*** ReCAPTCHA State ***/
    const [captchaSuccess, setCaptchaSuccess] = useState(false);
    const [captchaError, setCaptchaError] = useState({
        isErrored: false, errorMessage: "reCAPTCHA must be validated to submit!"
    });

    // ReCAPTCHA Handlers
    const handleCaptchaChange = (val: string | null) => {
        // null value is passed when token is expired
        if (val === null) {
            setCaptchaSuccess(false);
            setCaptchaError({
                isErrored: true,
                errorMessage: "Sorry, your reCAPTCHA token has expired. Please validate that your are a person again, please :)."
            })
        } else {
            console.log("ReCaptcha success value --->  ", val);
            setCaptchaSuccess(true);
            setCaptchaError({
                errorMessage: "reCAPTCHA must be validated to submit!",
                isErrored: false
            })
        }
    }
    
    const handleCaptchaError = (val: any) => {
        console.log("ReCaptcha error value --->  ", val);
        if (captchaSuccess) { 
            setCaptchaSuccess(false);
        };
        setCaptchaError({
            errorMessage: `${val && val.message || val}`,
            isErrored: true
        })
    }
    
    const handleCaptchaErrorNoMessage = () => {
        console.log("No error captured from ReCaptcha - most likely a connectivity error.")
        if (captchaSuccess) {
            setCaptchaSuccess(false)
        }
        setCaptchaError({
            errorMessage: "Unspecified error occurred, please check connectivity and try again shortly.",
            isErrored: true
        })
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

    const subjectOptions = [
        "Commission Request", "General Question", "Special Order Inquery"
    ]

    const loadingTextAnimation = () => {
        const loadTextIterator = loadingIterator()
        for (let loadCount=0; loadCount<25; loadCount++ ) {
            setTimeout(() => {
                const loadingMsgDots = loadTextIterator.next()
                setLoadingText(loadingText + loadingMsgDots)
            }, 20)
        }
    };
    
    // yup schema for Form input error handling
    const validSchema = yup.object({
        firstName: yup.string().required(),
        lastName: yup.string().notRequired(),
        email: yup.string().email().required(),
        messageBody: yup.string()
            .min(MIN_MESSAGE, (msg => {return `Must be at least ${msg.min} characters.`}))
            .max(MAX_MESSAGE),
        subject: yup.string()
    });

    // react-hook-form
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(validSchema)
    });

    // Form Input and Submit handlers
    const handleMessageInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        let textValue = event.target.value;
        let textCount = textValue.length;
        setCharLength(textCount);
    };

    const onSubmit = (data: any) => {
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
            } catch(error: any) {
                console.warn(error);
                if (!formState.isFormLoading && !formState.isFormComplete) {
                    setFormState({isFormLoading: false, isFormComplete: true});
                    throw new Error(`${error.message || error}`);
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
                        {errors.firstName || errors.lastName || errors.email || errors.messageBody || captchaError.isErrored ? 
                            (<span className={css.form_errors}>
                                <ul>
                                    {errors.firstName && <li className={css.contact_error}>{`${errors?.firstName?.message}`}</li>}
                                    {errors.lastName && <li className={css.contact_error}>{`${errors.lastName.message}`}</li>}
                                    {errors.email && <li className={css.contact_error}>{`${errors.email.message}`}</li>}
                                    {errors.messageBody && <li className={css.contact_error}>{`${errors.messageBody.message}`}</li>}
                                    {captchaError.isErrored && <li className={css.contact_error}>{`${captchaError.errorMessage}`}</li>}
                                </ul>
                            </span>)
                            : ""
                        }
                    <form className={css.contact_form} onSubmit={handleSubmit(onSubmit)}>
                        <ul style={{listStyle: "none"}}>
                            <li>
                                <label htmlFor="first_name">First Name: </label>
                                <input id={css.first_name} className={css.contact_input} {...register("firstName")} />
                            </li>
                            <li>
                                <label htmlFor="last_name">Last Name: </label>
                                <input id={css.last_name} className={css.contact_input} {...register("lastName")} />
                            </li>
                            <li>
                                <label htmlFor="email">Email Address: </label>
                                <input className={css.contact_input} {...register("email")} />
                            </li>
                            <li>
                                <label htmlFor="subject">Select a Subject: </label>
                                <select id={css.subject} className={css.contact_selection} {...register("subject")}>
                                    {subjectOptions.map((item, index) => (
                                        <option value={item} key={index}>{item}</option>
                                        ))}
                                </select>
                            </li>
                            <li className={css.contact_message}>
                                <label style={{display: "inline-block", textAlign: "center", width: "100%"}} htmlFor="message_body">
                                    Please enter your message below 
                                    <p style={{fontSize: ".7rem", textAlign: "center", padding: ".5rem 0", opacity: ".8"}}>Must be more than {MIN_MESSAGE} characters</p>
                                    <p  className={css["contact_charcount"]}
                                        style={{
                                            color: (charLength >= MIN_MESSAGE && charLength <= MAX_MESSAGE ? styles.goodFont : styles.badFont)
                                        }}>
                                        Chars: {charLength}
                                    </p>
                                    <textarea id={css["message_body"]} 
                                        className={css.contact_body}
                                        {...register("messageBody")}
                                        placeholder={styles.defaultMessage}
                                        onChange={handleMessageInput}
                                        // readOnly={false}
                                    />
                                </label>
                            </li>
                            <li>
                                {captchaSuccess ? 
                                    (<button className={css.contact_button}>Submit</button>) :
                                    (<div className={css.captcha_wrapper}>
                                        <ReCAPTCHA
                                            sitekey={RECAPTCHA_SITE_KEY}
                                            size="normal"
                                            onChange={handleCaptchaChange}
                                            onErrored={handleCaptchaErrorNoMessage}
                                            theme="dark"
                                            onErrorCapture={handleCaptchaError}
                                        
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
        </div>
    )
}