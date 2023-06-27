import { Drawer, DrawerOverlay, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerBody, 
    FormLabel,
    DrawerFooter } from "@chakra-ui/react"
import { CartCheckoutButton } from "./CartCheckoutButton"
import { useCart, useCartLine } from "@shopify/hydrogen-react"
import { useRef } from "react"
import { CartEmpty } from "./CartEmpty"
import { CartLineItem } from "./CartLineItem"

const HEADER_TEXT_DEFAULT = "Your Blaillustrations Cart"

interface CartDrawerProps {
    isOpen: boolean
    onClose: () => void
    headerText?: string
}

/**
 * 
 * @param props _CartDrawerProps_ - `isOpen`, `onClose` callbacks
 * @returns 
 */
export function CartDrawer (props: CartDrawerProps) {
    const {isOpen, onClose, headerText=HEADER_TEXT_DEFAULT} = props
    const {linesRemove, lines, checkoutUrl} = useCart()
    //const {id: lineId, quantity, merchandise} = useCartLine()
    const closeRef = useRef(null)
    return (
        <>
            <Drawer 
                isOpen={isOpen}
                onClose={onClose}
                placement='right'
                initialFocusRef={closeRef}
                // finalFocusRef={/* nodeRef from React.useRef() */}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton ref={closeRef} />
                    <DrawerHeader>{headerText}</DrawerHeader>
                    <DrawerBody>
                    {lines && lines.length ?
                        lines.map(line => <CartLineItem key={line?.id} />) :
                        <CartEmpty />
                    }
                    </DrawerBody>
                    <DrawerFooter borderTopWidth={'1px'} >
                        <CartCheckoutButton disabled={!!(lines && lines.length)} />
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}