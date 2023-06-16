import { CSSProperties } from "react"
import { CartBadge } from "./CartBadge"
import { CartIconBag } from "./CartIconBag"

const cartButtonStyle = {
    position: 'fixed',
    bottom: '0',
    right: '0',
    margin: '0 1rem 1rem 0',
    width: '2rem',
    height: '2rem',
    opacity: '0.9',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'

} as CSSProperties

export function CartButton (props: any) {
    const {onclick} = props
    let placeholder = "Placeholder for actual Shopping Cart Image (probably  SVG)"

    return (
        <button onClick={onclick} style={cartButtonStyle}>
            <CartIconBag />
            <CartBadge />
        </button>
    )
}



  
