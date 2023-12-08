import { ShopifyProductData } from "@/models/shopifyApiCustomTypes"
import { Money } from "@shopify/hydrogen-react"
import { 
    Card, CardBody, Image as ChakraImage, 
    Stack, Heading, Text,
    Divider, Wrap, Tag, Flex, HStack, StyleProps, CardProps
} from "@chakra-ui/react"
import {styled} from "@chakra-ui/react/dist"
import React, { Attributes, ReactPropTypes } from "react"
    

interface ProductItemProps {
    onClick: React.MouseEventHandler<HTMLDivElement>
    onHover?: (e: any) => void
    productData: ShopifyProductData
    uid?: number
}

type CardStyling = CardProps 
 & {
    className: string;
}

const CardStyles = {
    bg:"whiteAlpha.200",
    className:"store_product_card",
    direction: "column",
    border:"1px rigid",
    borderColor:"blue.800",
    // boxShadow:"dark-lg"
    boxShadow:"1px 1px 10px rgba(10,10,77,.5)"
} as CardStyling

/**
 * @name ProductItem
 * @description Individual product card, assigns `uuid` to _data-product-list-id_ attribute, which should be picked up on the `onClick` callback
 * @param {ProductItemProps} props `onClick`, `onHover?`, `productData`, `uid`
 * @returns 
 */
export function ProductItem (props: ProductItemProps) {
    const {productData, uid} = props
    const { id, images, featuredImage, description, tags, title } = productData
    const imageData = featuredImage || images?.nodes[0]
    
    const hasImageData = !!imageData
    const priceRange = productData?.priceRange
    const isOutOfStock = isProductOutOfStock(productData)

    return (
        <div className='store_item_wrapper__product' onPointerEnter={props?.onHover} onClick={props.onClick} data-product-list-id={uid}>
            <Card 
                // maxHeight={"14.5rem"}
                // maxWidth={["20rem", "17.5rem", "18rem"]}
                // minWidth={["33rem", "22.5rem", "22rem"]}
                {...CardStyles}
                // bg={CardStyles.bg} 
                // className={CardStyles.className}
                // direction={CardStyles.direction}
                // border={CardStyles.border}
                // borderColor={CardStyles.borderColor}
                
            >
                <CardBody padding="0.5rem">
                    <Flex direction={"row"} gap="3" flex-wrap={"wrap"} minWidth="0" >
                        {hasImageData ?
                        <ChakraImage
                            src={imageData?.url || imageData?.src || ""}
                            alt={imageData?.altText || title}
                            borderRadius={"2xl"}
                            padding={"2px 1px"}
                            maxWidth={"150px"}
                            maxHeight={"150px"}
                            flex={"1 1 150px"}
                        /> :
                        <label  className='store_collection_title_text'>
                            {title}
                            
                        </label>
                        }

                        <Stack mt={"1.25"} spacing={".5"} gap="2" flex={"1 2 180px"}>
                            <Heading 
                                fontStyle={"italic"} 
                                fontFamily={"'Gill Sans MT', sans-serif"} 
                                fontWeight="hairline"
                                size="sm" 
                                textAlign={"center"} 
                                color="green.600"
                                padding={"2px 3px 5px 0px"}
                                bgColor="whiteAlpha.800"
                                borderColor={"aliceblue"}
                                border="1px groove deeppink"
                                borderRadius={"md"}
                            >
                                {title}
                            </Heading>
                            <Divider  colorScheme="blue" variant={"dashed"} />
                            {tags && tags?.length ?
                                <Wrap spacing={"1.5"} direction="row" margin="0px auto" overflow="hidden" maxBlockSize={"min-content"} padding={"0 1px 2px 0"}>
                                    {tags.map(
                                        (t,i) => <Tag key={i} textTransform="lowercase" opacity={"70%"} size="sm" colorScheme="green" padding={"2px 6px"} variant="solid">{t}</Tag>).slice(0,4)} 
                                </Wrap> : 
                                <Tag/>
                            }
                            
                        </Stack>

                    </Flex>
                </CardBody> 
                
                <Divider width="95%" alignSelf={"center"} variant={"solid"}  size="md" alignContent={"center"} opacity="0.8" />

                {priceRange?.maxVariantPrice?.amount && priceRange?.minVariantPrice?.amount ? 
                    isOutOfStock ?
                        <Text 
                            textAlign={"center"} 
                            color="red.800" 
                            fontFamily={"heading"} 
                            fontStyle="italic"
                            fontWeight={"semibold"}
                        >
                            Currently Unavailable
                        </Text> 
                    :
                        <HStack fontSize="sm" justifyContent={"space-around"} >
                            <label style={{"fontWeight": "bold"}}>Price range:  </label>
                            <HStack gap={"2"} >
                                <Money as="pre" data={priceRange?.minVariantPrice} /> 
                                <p>{" - "}</p>
                                <Money as="pre" data={priceRange?.maxVariantPrice}  />
                            </HStack>
                        </HStack> 
                : <label/>
                }

                <Divider width="95%"  variant={"solid"}  size="md" alignSelf={"center"} opacity="0.8" />

                {/* Description */}
                <Text textOverflow={"ellipsis"} noOfLines={3} fontWeight="semibold" padding="3px 10px 5px" textColor={"blue.700"} fontSize="sm">
                    {description || ""}
                </Text>
            </Card>
        
    </div>
    )
}

function isProductOutOfStock (productData: ShopifyProductData) {
    let isAvail = productData?.availableForSale && 
        productData.availableForSale === true // actual type of value may differ from documented type def
    let totalInventory = productData?.totalInventory && 
        (typeof productData.totalInventory === "number") ? 
        productData.totalInventory :
            Number(productData.totalInventory) 

    return !(isAvail && (totalInventory && totalInventory > 0))

}