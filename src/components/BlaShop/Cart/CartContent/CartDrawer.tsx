import { Drawer, DrawerOverlay, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerBody, 
    FormLabel,
    DrawerFooter, 
    VStack,
    StackDivider,
    HStack,
    Divider,
    Box} from "@chakra-ui/react"
import { CartCheckoutButton } from "./CartCheckoutButton"
import { CartLineProvider, useCart, useCartLine, Money } from "@shopify/hydrogen-react"
import { useRef, useEffect, useState } from "react"
import { CartEmpty } from "./CartEmpty"
import { CartLineItem } from "./CartLineItem"

const HEADER_TEXT_DEFAULT = "Your BLAillustrations Cart"

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
    const {linesRemove, lines, checkoutUrl, error, status, id: cartID, totalQuantity, cost} = useCart()
    //const {id: lineId, quantity, merchandise} = useCartLine()
    const taxes = cost?.totalTaxAmount && cost.totalTaxAmount.amount
    const closeRef = useRef(null)
    const [subTotal, setSubTotal] = useState("0.00")
    // console.log(JSON.stringify(cost, null, 2))
    useEffect(() => {
        if (lines && lines.length > 0) {
            const newSubTotal = lines.reduce((accumulator, currentLine) => {
                const lineSubTotal = currentLine?.cost?.subtotalAmount?.amount || ""
                return accumulator + Number(lineSubTotal) 
            }, 0)
            const costSubtotal = cost?.subtotalAmount && String(cost.subtotalAmount?.amount)
            setSubTotal(moneyStringFormat(cost?.subtotalAmount ? String(cost.subtotalAmount?.amount) : newSubTotal.toString()))
        }
    }, [lines, cost?.subtotalAmount])
    
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
                <DrawerContent bgColor={"var(--cart_modal_background)"} className="cart_modal_content">
                    <DrawerCloseButton ref={closeRef} />
                    <DrawerHeader>
                        <h2 className="cart_details_header">{headerText}</h2>
                        <p className="cart_details_subheader">
                            {`Cart ID:  ${cartID || "<none>"}`}
                            <br />
                            {`Status:  ${status}`}
                            {/* <br /> {`Error ? --> ${JSON.stringify(error) || "No error"}`} */}
                        </p>
                    </DrawerHeader>
                    <Divider borderColor={"blackAlpha.500"} borderBottomWidth={"medium"}  />
                    <DrawerBody paddingInline={".55rem"} fontFamily={"cursive"} color={"var(--dark-green)"} paddingTop={"0"} bgColor={"var(--cart_modal_background2)"} width={"100%"} >
                        {/* Line Item(s) */}
                        {lines && lines.length ?
                            <VStack width={"100%"} divider={<StackDivider borderStyle={"dotted"} borderColor={"gray.500"} />} >
                                {lines.map((line, i) => 
                                    line !== undefined && 
                                        <CartLineProvider key={i} line={line}>
                                            <CartLineItem key={i} />
                                        </CartLineProvider>)
                                }
                            </VStack> : 
                            <CartEmpty />
                        }
                    </DrawerBody>
                    {/* Checkout */}
                    <DrawerFooter borderTopWidth={'1px'} >
                        <VStack width="100%">
                        {/* Subtotal | Total */}
                        <Box className="cart_details_lines_wrapper" >
                            <HStack alignSelf="end" >
                                <p >Total quantity ...</p>
                                <p >{"x " + totalQuantity}</p>
                            </HStack>
                            <HStack alignSelf="end" >
                                <p style={{"fontWeight": `${taxes ? "normal" : "bold"}`}}>
                                    Subtotal ...
                                </p>
                                {cost?.subtotalAmount  ?
                                <Money style={{"fontWeight": "bold"}} data={cost.subtotalAmount} /> :
                                <p style={{"fontWeight": "bold"}}>{`$ ${subTotal}`}</p>
                                }
                            </HStack>
                            {taxes && 
                            <>
                                <HStack >
                                    <p>Taxes ...</p>
                                    {cost?.totalTaxAmount ? 
                                        <Money data={cost.totalTaxAmount} /> :
                                        <p>{"$ " + taxes}</p>
                                    }
                                </HStack>
                                <HStack >
                                    <p>Total ...</p>
                                    {cost?.totalAmount ? 
                                        <Money data={cost.totalAmount} /> :
                                        <p>{"$ " + moneyStringFormat(String(Number(subTotal) + Number(taxes)))}</p>
                                    }
                                </HStack>
                            </>
                            }
                        </Box>
                        <Divider colorScheme={"blue"}  paddingBottom="0.5" marginBottom={"2"} />
                        <CartCheckoutButton disabled={!(lines && lines.length)} />
                        </VStack>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

/* TODO: 
    - rewrite as recursive func 
    - convert to switch/case
    - add to src/utils/ folder  
*/
const moneyStringFormat = (money: string | undefined) => {
    const oneDecimalRegEx  = /\d+?\.[0-9]$/
    const twoDecimalRegEx  = /\d+?\.[0-9]{2}$/
    const manyDecimalRegEx = /\d+?\.[0-9]{3,}$/
    const noDecimalRegEx   = /\d+$/
    const noIntegerRegEx   = /^\.[0-9]{2}$/

    if (money === undefined) {
        return "0.00"
    }
    if (noDecimalRegEx.test(money)) {
        return money + ".00"
    }
    if (oneDecimalRegEx.test(money)) {
        return money + ".0"
    }
    if (twoDecimalRegEx.test(money)) {
        return noIntegerRegEx.test(money) ?
            "0" + money :
            money
    }
    if (manyDecimalRegEx.test(money)) {
        let slicedMoney = money.split(/(?<=\.[0-9]{2})[0-9]+$/)[0]
        return twoDecimalRegEx.test(slicedMoney) ?
            slicedMoney :
            money
    }
    return money

}