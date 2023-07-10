import { CSSProperties } from "react"
import { CartBadge } from "./CartBadge"
import { CartIconBag } from "./CartIconBag"

const cartButtonStyle = {
    position: 'fixed',
    top: '2rem',
    right: '2rem',
    margin: '0 1rem 1rem 0',
    width: '2.5rem',
    height: '2.5rem',
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
        <button onClick={onclick} style={cartButtonStyle}>
            <CartIconBag />
            <CartBadge />
        </button>
    )
}



  
