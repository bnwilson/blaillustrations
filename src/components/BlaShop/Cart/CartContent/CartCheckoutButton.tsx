import { CartCheckoutButton as ShopifyCheckoutButton } from "@shopify/hydrogen-react";
import {ExternalLinkIcon} from "@chakra-ui/icons"
import { CSSProperties } from "react";

interface CartCheckoutButtonProps {
    disabled?: boolean
}

/* const disabledButtonStyle = {
    borderColor: "darkslateblue",
    borderStyle: "inset",
    backgroundColor: "darkgray",
    color: "darkslategray",
    

} as CSSProperties */

export function CartCheckoutButton (props: CartCheckoutButtonProps) {
    const {disabled=false} = props

    return (
        disabled === true ?
            <button disabled={disabled}  
                className="cart_details_checkout_button checkout_disabled" 
            >
                Continue to Checkout 
            </button> :
            <ShopifyCheckoutButton className="cart_details_checkout_button">
                Continue to Checkout <ExternalLinkIcon margin={"0 0.5em"} color={"teal.200"} boxSize={"4"} />
            </ShopifyCheckoutButton> 
    )
}