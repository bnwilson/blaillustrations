/* ChakraUI components & hooks */
import { Button, FormHelperTextProps, Image, Modal, ModalBody, ModalOverlay, 
    ModalHeader, ModalFooter, ModalCloseButton, useDisclosure, 
    ModalContent, Tag, Flex, Divider, Stack, VStack, Text, 
    Heading, Tooltip, StackDivider, Radio, RadioGroup } from "@chakra-ui/react";
import { ProductModalTag } from "./ProductModalTag";
import { ProductModalInputNumber } from "./ProductModalForm";
/* React - state & context */
import { useState, useContext } from "react";
import { ProductSelectContext } from "./ProductSelectContext";
/* Types */
import { ShopifyProductData } from "@/models/shopifyApiCustomTypes";
import { AddToCartButtonProps, AddToCartButtonPropsBase } from "@shopify/hydrogen-react/dist/types/AddToCartButton";
import {useForm, FormProvider, useFormContext } from 'react-hook-form';

/* Interfaces - local types */
interface CartItemFormData {
    product: {
        id: string
        title: string
        productKey?: number
        quantity?: number
        availableForSale?: boolean
        price?: string
    }
    variation: {
        id?: string
        optionName?: string
        optionValue?: string
        quantityAvailable?: number
    }
}

/**
 * **ProductModalProps** - props of `ProductModal` component
 * 
 * Notes: 
 *  - `addToCart` - may not need to pass props to AddToCartComponent with Product Data present
 *  - `selectedProduct` - keeping as optional arg, but the state of the _selected product_ 
 *                       will be obtained through `useContext()`
 */
interface ProductModalProps {
    onClose: () => void
    isOpen: boolean
    selectedProduct?: ShopifyProductData & {[key: string]: any}
    addToCart?: AddToCartButtonProps | AddToCartButtonPropsBase | any
}

/** **`ProductModal`** - _Component_; utilizes `useContext()` for 'selected' product state
 * @description Modal that displays product/product variant info & provides "Add To Cart" functionality
 * @param props 
 * @returns ProductModal
 */
export function ProductModal (props: ProductModalProps) {
    /* Init */
    const initialProductProps = {name: '', title: '', id: ''}
    const {onClose, isOpen} = props

    /* Props */
    //const product = props.selectedProduct
    const product = useContext(ProductSelectContext)
    const productImageUrl = product?.featuredImage?.url || product?.featuredImage?.src
    const productVariantData = getVariantData(product)
    const {variants, variantCount, hasDefaultVariants} = productVariantData


    /* State | Context | Hooks */
    // const {isOpen, onClose, onOpen} = useDisclosure()
    const useFormMethods = useForm()
    const [currentVariantSelection, setCurrentVariantSelection] = useState('0')
    const [currentTotalInventory, setCurrentTotalInventory] = useState(Number(product?.totalInventory))
    
    const onAddToCartSubmit = async (cartItemData: CartItemFormData) => {
        // Evaluate data, update state, add to cart (hook)
    }

    const onVariantSelection = (val: string) => {
        setCurrentVariantSelection(val)
        setCurrentTotalInventory(Number(val))
    }

    /* TODO:  Use 2 Forms:  form #1 - variant selection ----- form #2 - addToCart (form returns only quantity and variant data) */
    return (
        <Modal colorScheme={"cyan"} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent backgroundColor={"orange.300"} className="store_product_modal">
            <FormProvider {...useFormMethods}>
                <ModalHeader fontFamily={"cursive"} className="store_product_modal_title" padding={"5px 5px 2px"} >
                    {product?.title || product?.handle}
                </ModalHeader>
                <ModalCloseButton/>
                <ModalBody className="store_product_modal_body">
                    <Image alt={product?.title} src={productImageUrl} margin="0px auto"  />
                    {product?.tags && 
                    <Flex justifyContent={"center"} overflowWrap={"normal"} gap={"5px"} >
                        {product?.tags?.map((tag, i) => <ProductModalTag key={i} >{tag}</ProductModalTag>)}
                    </Flex>
                    }
                    <Divider colorScheme={"blue"} />
                    <Stack divider={<Divider colorScheme={"blue"}  />} direction={"column"} height="250px" p="0.5">
                        {/* Product Info -- Description | Category */}
                        <VStack>
                            <Heading size="sm" style={{textAlign: "center"}} color="blue.800"> Description </Heading>
                            <Tooltip label={product?.description}>
                                <Text lineHeight={"short"} noOfLines={3} minHeight={"1"} textOverflow={"ellipsis"} fontSize={"medium"} fontFamily="fantasy" color={"green.700"} >{product?.description}</Text>
                            </Tooltip>
                        </VStack>
                        {/* Category */}
                        <Flex alignContent={"start"} width="95%" direction={"row"}>
                            <Heading fontWeight={"semibold"} flex="30%" size="sm"  color="blue.800"> Category </Heading>
                            <Text fontWeight={"bold"} textAlign={"right"} flex="70%" fontSize={"medium"} fontFamily="fantasy" color={"green.700"}>{product?.productType}</Text>
                        </Flex>
                        {/* Total Inventory */}
                        <Flex alignContent={"start"} width="95%" direction={"row"}>
                            <Heading fontWeight={"semibold"} flex="30%" size="sm"  color="blue.800"> Total Inventory </Heading>
                            <Text fontWeight={"bold"} textAlign={"right"} flex="70%" fontSize={"medium"} fontFamily="fantasy" color={"green.700"}>{product?.totalInventory}</Text>
                        </Flex>
                        
                            
                        {/* Variant info --  */}
                        <form style={{"width":"100%"}}>
                            <RadioGroup onChange={onVariantSelection} value={currentVariantSelection}>
                                <Stack direction='row' justifyContent={"space-evenly"} gap={"4"}>
                                {hasDefaultVariants ?
                                    <Radio disabled={hasDefaultVariants} isDisabled value={currentVariantSelection}>
                                        No option available
                                    </Radio> :
                                    variants.map((v, i) => <Radio key={i} value={i.toString()}>{v?.selectedOptions && v.selectedOptions[0]?.value}</Radio>)
                                }
                                </Stack>
                            </RadioGroup>
                            <ProductModalInputNumber minAmount={1} maxAmount={currentTotalInventory} />
                        </form>

                        
                        
                    </Stack>
                    <Divider colorScheme={"blue"} />
                </ModalBody>
                <ModalFooter >
                    <Button  variant={"ghost"} mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme={"orange"} onClick={onClose}>
                        Add to Cart
                    </Button>
                </ModalFooter>

            </FormProvider>
            </ModalContent>
        </Modal>
    )
}

/**
 * **`getVariantData`** _function_ - local function to extract variant data from the given `product`:: _`ShopifyProductData`_
 * 
 * **Note**: 
 *  * May be used for more business logic, but for now it's just getting the nested variants
 */
const getVariantData = (product?: ShopifyProductData) => {
    const productVariants = product?.variants?.nodes || []
    const variantCount    = productVariants.length
    const defaultValRegEx = /(Default ?)?Title$/i
    let hasDefaultVariants = false

    const variants = productVariants.map(variant => {
        const hasDefaultValues = !!(
            variant?.title?.match(defaultValRegEx) || 
            (
                variant?.selectedOptions && 
                variant.selectedOptions.some(sOption => {
                    sOption?.name?.match(defaultValRegEx) || 
                    sOption?.value?.match(defaultValRegEx)
                })
            )
        )
        hasDefaultVariants = hasDefaultVariants || hasDefaultValues ? hasDefaultValues : hasDefaultVariants
        const hasOnlyDefaultVariant = hasDefaultValues && variant?.selectedOptions?.length === 1
        return {
            ...variant,
            hasOnlyDefaultVariant
        }
    })

    const variantData = {
        variants,
        variantCount,
        hasDefaultVariants
    }

    return variantData
}


/* Variant obj structure
 variants (first: 10) {
    nodes [
        {
            id
            quantityAvailable
            title
            availableForSale
            sku
            image {
                url
            }
            selectedOptions {
                name
                value
            }
        }

    ]
} 
*/