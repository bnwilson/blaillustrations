import { AddToCartButton } from "@shopify/hydrogen-react";
import { ShopifyProductData } from "@/models/shopifyApiCustomTypes";

interface ShopifyAddToCartProps {
    product?: ShopifyProductData
    productVariantId?: string
    quantity?: number
}

/**
 * 
 * @param props 
 * * **product**: `ShopifyProductData`
 * * **productVariantId**: `string`; _variantId_ of selected variant of product
 * * **quantity**: `number`; _item quantity_
 *  
 * @requires `<CartProvider/>` from `@shopfy/hydrogen-react` as a decendant element
 * @requires module:@shopfy/hydrogen-react
 * 
 * @example <ShopifyAddToCart  
 *  product={{...productData}} 
 *  productVariantId="gid://12345-example-id" 
 *  quantity={1} />
 * @returns 
 */
export function ShopifyAddToCart (props: ShopifyAddToCartProps) {
    const {product, productVariantId, quantity} = props

    return (
        <AddToCartButton 
            quantity={quantity}  
            variantId={productVariantId}
        >
            
        </AddToCartButton>
    )
}

