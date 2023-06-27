import { Image, useCart, useCartLine } from "@shopify/hydrogen-react"

export function CartLineItem () {
    const {linesRemove} = useCart()
    const {id: lineId, quantity, merchandise} = useCartLine()
    return (
        <li key={lineId} className="cart_details_list_item">
            <div className="cart_details_line_thumbnail">
                <Image 
                    data={merchandise && merchandise?.image || undefined}
                    className="cart_details_line_image"
                    alt={merchandise?.image?.altText || "Image unavailable"}
                />
            </div>
        </li>
    )
}