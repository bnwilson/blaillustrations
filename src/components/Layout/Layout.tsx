import {NavBar} from "../NavBar";
import { Footer } from "../Footer";
import styles from './Layout.module.css'

 export function Layout(props: any) {
    /*** Footer Links content ***/
    const contacts = [
        {title: "Instagram", externalUrl: "", image: ""},
        {title: "Facebook", externalUrl: "", image: ""},
        {title: "Etsy", externalUrl: "", image: ""},
        {title: "Email", externalUrl: "", image: ""}
    ]

    return (
        <div className={styles.app}>
            <NavBar />
            <main className={styles.main}>{props.children}</main>
            <Footer contacts={contacts} />
        </div>
    )
}
          /*   <div className={styles.main}>
                {props.children}
            </div> */