function FooterContacts ({contacts}) {
    const DEFAULT_LINK = "https://google.com";
    return (
        <div>
            <ul className="footer__list">
                {contacts.map((item, index) => (
                    <li key={index} className="footer__item">
                        <a className="footer__link" 
                            href={item.url || DEFAULT_LINK}
                        >
                            {item.title}
                        </a>

                    </li>
                    ))}

            </ul>
        </div> 
    )
}

function Footer () {
    /*** Social Media Content ***/
    const contacts = [
        {title: "Instagram", url: "", image: ""},
        {title: "Facebook", url: "", image: ""},
        {title: "Etsy", url: "", image: ""},
        {title: "Email", url: "", image: ""}
    ]


    return (
        <footer className="footer" >
            {contacts && (<FooterContacts contacts={contacts}/>)}
            <br/>
            BLA Illustrations&copy;
        </footer>    
    )
}

export default Footer;