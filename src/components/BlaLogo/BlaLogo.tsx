import Image from "next/image";
import styles from './BlaLogo.module.css'
import blaImage from '../../../public/blago.png'

export type BlaLogoProps = {
    alt?: string /* alt text (when image file is not present) */
    src: string /* image file name */
} & typeof defaultProps

const defaultProps = {
    alt: "Bla Illustrations",
    src: "/blago.png"
}

export function BlaLogo (props: BlaLogoProps) {
    const {alt, src} = props
    return (
            <Image 
                className={styles['nav-logo']}
                alt={alt || "BLA Illustrations"}
                src={blaImage || src}
            />
        )
}

BlaLogo.defaultProps = defaultProps