import { AddToCartToast, CartButton, CartDrawer } from "../BlaShop/Cart"
import { useDisclosure } from "@chakra-ui/react"
import { useEffect, useState, useCallback } from "react"
import { getCartId } from "@/utils/cartSession"
import { CartProvider, useCart } from "@shopify/hydrogen-react"

/**
 * @name StoreLayoutProps
 * @description props of StoreLayout (_nested-layout_) component
 */
interface StoreLayoutProps {
    children: any
}

/** StoreLayout
 * @description Nested layout for the store page, for initializing the Cart
 *  - **Must be child of `<ShopifyProvider>` component**
 * @param children page props 
 * @returns 
 */
export function StoreLayout ({children}: StoreLayoutProps ) {
    const {cartCreate, status} = useCart()
    const {isOpen, onClose, onOpen} = useDisclosure()
    // const [cartId, setCartId] = useState('')
    // const [isCartInit, setIsCartInit] = useState(false)
    // const [isCartFetching, setIsCartFetching] = useState(false)
   /*  useEffect(() => {
            const localCartId = getCartId()
            if (!localCartId) {
                setIsCartFetching(true)
                cartCreate({'lines': []})
            } else {
                setCartId(localCartId)
            }
        
    }, [cartCreate]) */
    const onClickCallback = useCallback(onOpen, [onOpen])
    const onCloseCallback = useCallback(onClose, [onClose])
    return (
        <>
            <CartButton onclick={onClickCallback} />
            <CartDrawer onClose={onCloseCallback} isOpen={isOpen} />
            {children}
        </>
    )

    
/*     return (
        <>
            <CartButton onclick={onOpen} />
            <CartDrawer onClose={onClose} isOpen={isOpen} />
            {children}
        </>
    ) */
}