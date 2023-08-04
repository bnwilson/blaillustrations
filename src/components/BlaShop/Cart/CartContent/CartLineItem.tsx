import { Flex, Image, 
    Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { useCart, useCartLine, Money } from "@shopify/hydrogen-react"

interface CartLineItemProps {
    key: number
}

export function CartLineItem (props: CartLineItemProps) {
    const {linesRemove, } = useCart()
    const {id: lineId, quantity, merchandise, cost} = useCartLine()
    // console.log(JSON.stringify(cost, null, 2))
    const isTitleDefaultValue = isDefaultTitle(merchandise?.title)
    const unitPrice = (cost?.totalAmount !== undefined && quantity !== undefined) ? 
        Number(cost?.totalAmount.amount) / quantity : 5
    return (
        <div key={props.key} className="cart_details_list_item" >
            {/* <div className="cart_details_line_thumbnail">
                <Image 
                    src={merchandise && merchandise?.image?.url || undefined}
                    className="cart_details_line_image"
                    alt={merchandise?.image?.altText || "Image unavailable"}
                    height={"2rem"}
                    width={"2rem"}
                    fit={"cover"}
                />
            </div> */}
            
            <TableContainer fontFamily={"var(--store-cart-font-family)"} color={"var(--dark-green)"} minWidth={"95%"} >
                <Table fontFamily={"inherit"} className="cart_details_line_table" size={"sm"} variant={"unstyled"} width={"100%"} >
                    <TableCaption 
                        className="cart_details_line_capture"
                        fontFamily={"inherit"}
                        fontSize={"1rem"}
                        fontWeight={"semibold"}
                        marginBottom={".1rem"}
                        marginTop={".1rem"}
                        paddingBottom={".15rem"}
                        paddingInlineStart={"0"}
                        paddingTop={".1rem"}
                        placement="top" 
                        textAlign={"left"}
                        >
                            {`"${isTitleDefaultValue ? merchandise?.product?.title : merchandise?.title}"`}
                    </TableCaption>
                    {/* <Thead>
                        <Tr>
                            <Th textAlign={"center"}>
                                {isTitleDefaultValue ? merchandise?.product?.title : merchandise?.title}
                            </Th>
                        </Tr>
                    </Thead> */}
                    <Tbody className="cart_details_line_body" >
                        <Tr >
                            {/* Price Per Item */}
                            <Td className="cart_details_table_category">Price per item</Td>
                            {merchandise?.price !== undefined ? 
                                <Td><Money data={merchandise?.price} /></Td> :
                                <Td>{unitPrice.toFixed(2)}</Td>
                            }
                        </Tr>
                        <Tr>
                            {/* Quantity */}
                            <Td className="cart_details_table_category">Quantity</Td>
                            <Td>{`x ${quantity}`}</Td>
                        </Tr>
                        {/* Subtotal */}
                        {cost?.totalAmount !== undefined ?
                            <Tr fontWeight={"semibold"}>
                                <Td className="cart_details_table_category">Subtotal</Td>
                                <Td><Money data={cost?.totalAmount} /></Td>
                            </Tr> :
                            <Tr>
                                <Td fontSize={"2xs"} fontStyle={"italic"}>Sorry, the subtotal could not be determined - please use Checkout to see totals</Td>
                            </Tr>
                        
                        }
                        
                    </Tbody>
                </Table>
                {/* Delete item */}
                <div className="cart_details_line_delete_wrapper">
                    <button 
                        className="cart_details_line_delete_button"
                        onClick={() => linesRemove([lineId || merchandise?.id || String(props.key)])}>
                            Delete
                    </button>
                </div>
            </TableContainer>
        </div>
    )
}

function isDefaultTitle (title?: string) {
    const defaultValRegEx = /(Default ?)?Title$/i
    return title && defaultValRegEx.test(title)
}

/* useCartLine().cost - data structure:
    {
        "totalAmount": {
            "amount": "60.0",
            "currencyCode": "USD"
        },
        "compareAtAmountPerQuantity": null
    }
*/