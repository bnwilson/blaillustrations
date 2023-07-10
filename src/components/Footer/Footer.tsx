import styles from './Footer.module.css'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import Link from 'next/link'

/**
 * @property {string} title - Mouseover value | Default string (when image is unavailable)
 * @property {string} externalUrl - External link to page
 * @property {string} image - Path to image/icon file
 */
export interface FooterContact {
    title: string
    externalUrl: string
    image: string
}

export interface FooterProps {
    contacts: FooterContact[]
}

export function Footer (props: FooterProps) {
    const {contacts} = props
    return (
        <footer className={styles.footer}>
            {contacts && contacts.length &&
                <div>
                    <ul className={styles.footer__list}>
                        {contacts.map((contact, index) => (
                            <li key={index} className={styles.footer__item}>
                                <a className={styles.footer__link}
                                    href={contact.externalUrl || ""}
                                >
                                    {contact.title}<ExternalLinkIcon className='superscript' />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            }
            BLA Illustrations&copy;
        </footer>
    )
}