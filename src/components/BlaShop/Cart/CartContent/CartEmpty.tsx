
interface CartEmptyProps {
    onClose?: () => {}
}

/**
 * 
 * @param onClose _optional_; callback to close Shopping Cart Drawer.  Will not render button if this isn't passed.
 * @returns 
 */
export function CartEmpty (props: CartEmptyProps) {
    const {onClose} = props
    return (
        <>
            <h2 className="cart_details_empty_text">
                Your cart is empty
            </h2>
            {onClose &&
                <button 
                    onClick={onClose}
                    className="cart_details_continue_button"
                >
                    Continue Shopping
                </button>
            }
        </>
    )
}