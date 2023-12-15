/* Framework modules */
import { useDisclosure } from "@chakra-ui/react"
import { useEffect, useState, useCallback, useReducer } from "react"
import { getCartId } from "@/utils/cartSession"
/* State | Context */
import { CartProvider, useCart } from "@shopify/hydrogen-react"
/* Components | UI */
import { AddToCartToast, CartButton, CartDrawer } from "../BlaShop/Cart"

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
       
    const onClickCallback = useCallback(onOpen, [onOpen])
    const onCloseCallback = useCallback(onClose, [onClose])
    
    return (
        <>
            <CartButton onclick={onClickCallback} />
            <CartDrawer onClose={onCloseCallback} isOpen={isOpen} />    
            {children}
        </>
    )
}