import { CSSProperties } from "react"
import { CartBadge } from "./CartBadge"
import { CartIconBag } from "./CartIconBag"
import styles from "./CartButton.module.css"

const cartButtonStyle = {
    position: 'fixed',
    top: '2rem',
    right: '2rem',
    margin: '0 1.25rem 1.25rem 0',
    width: '2.75rem',
    height: '2.75rem',
    opacity: '0.9',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '9999px',
    backgroundColor: 'rgba(238, 157, 243,0.8)',
    zIndex: 999

} as CSSProperties

interface CartButtonProps {
    onclick: () => void
}

export function CartButton (props: CartButtonProps) {
    const {onclick} = props

    return (
        <button onClick={onclick} className={styles.cart_button} >
            <CartIconBag />
            <CartBadge />
        </button>
    )
}



  
