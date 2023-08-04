import {NavBar} from "../NavBar";
import { Footer } from "../Footer";
import styles from './Layout.module.css'

 export function Layout(props: any) {
    /*** Footer Links content ***/
    const contacts = [
        {title: "Instagram", externalUrl: process?.env?.NEXT_PUBLIC_BLA_INSTAGRAM || "https://www.instagram.com", image: ""},
        {title: "Facebook", externalUrl: process?.env?.NEXT_PUBLIC_BLA_FACEBOOK || "https://www.facebook.com", image: ""},
        {title: "Etsy", externalUrl: process?.env?.NEXT_PUBLIC_BLA_ETSY || "https://www.etsy.com/store/blaillustrations", image: ""},
        {title: "TikTok", externalUrl: process?.env?.NEXT_PUBLIC_BLA_TIKTOK || "https://www.tiktok.com", image: ""}
    ]

    return (
        <div className={styles.app}>
            <NavBar />
            <main className={styles.main}>{props.children}</main>
            <Footer contacts={contacts} />
        </div>
    )
}