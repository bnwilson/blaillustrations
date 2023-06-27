import { CartLineQuantityAdjustButton, CartLineQuantity } from "@shopify/hydrogen-react";

interface CartLineQuantityAdjustProps {
    lineId: string
    quantity: number
}
export function CartLineQuantityAdjust ({ lineId, quantity }: CartLineQuantityAdjustProps) {

    return (
        <>
            <label htmlFor={`quantity-${lineId}`} className="sr-only">Quantity, {quantity}</label>
            <div className="cart_details_quantity_container">
                <CartLineQuantityAdjustButton 
                    adjust="decrease"
                    aria-label="Decrease quantity"
                    className="cart_details_quantity_button"
                >
                    &#8722;
                </CartLineQuantityAdjustButton>
                <CartLineQuantity as="div" className="cart_details_quantity" />
                <CartLineQuantityAdjustButton 
                    adjust="increase"
                    aria-label="Increase quantity"
                    className="cart_details_quantity_button"
                >
                    &#43;
                </CartLineQuantityAdjustButton>

            </div>
        </>
    )
}