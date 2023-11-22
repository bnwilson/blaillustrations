/* ChakraUI components & hooks */
import { Button, FormHelperTextProps, Image, Modal, ModalBody, ModalOverlay, 
    ModalHeader, ModalFooter, ModalCloseButton, 
    ModalContent, Tag, Flex, Divider, Stack, VStack, Text, 
    Heading, Tooltip, StackDivider, Radio, RadioGroup, useToast, UseToastOptions } from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { ProductModalTag } from "./ProductModalTag";
import { ProductModalInputNumber } from "./ProductModalForm";
/* React - state & context */
import { useState, useContext, FormEvent, useRef, useEffect } from "react";
import { ProductSelectContext } from "./ProductSelectContext";
/* Types */
import { ShopifyProductData, ShopifyProductVariantData } from "@/models/shopifyApiCustomTypes";
import { AddToCartButtonProps, AddToCartButtonPropsBase } from "@shopify/hydrogen-react/dist/types/AddToCartButton";
import { useCart,  } from "@shopify/hydrogen-react";
import { CartLineInput } from "@shopify/hydrogen-react/storefront-api-types";
import { AddToCartToast, AddToCartToastProps } from "../Cart";

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
 * @param {ProductModalProps} props 
 * @returns ProductModal
 */
export function ProductModal (props: ProductModalProps) {
    /* Defaults */
    const defaultTotal        = 25
    const defaultQuantity     = 1
    const defaultVariantIndex = 0
    
    /* Props | Context */
    const {onClose, isOpen} = props
    const product = useContext(ProductSelectContext)
    const productImageUrl = product?.featuredImage?.url || product?.featuredImage?.src

    // const defaultVariant = variants[defaultVariantIndex]
    // Component State - variant, total inv, currentQuantity
    const [currentVariantSelection, setCurrentVariantSelection] = useState<string|undefined>('') // ID of variant
    const [currentVariant, setCurrentVariant] = useState<ShopifyProductVariantData|undefined>(undefined)
    const [currentTotalInventory, setCurrentTotalInventory] = useState(defaultTotal)
    const [isNoInventory, setIsNoInventory] = useState(false)
    const hasDefaultVariants = useRef(true)
    const variants = useRef([] as ShopifyProductVariantData[])

    // const [currentTotalInventory, setCurrentTotalInventory] = useState(defaultVariant?.quantityAvailable || Number(product?.totalInventory) || 99)
    const [currentQuantity, setCurrentQuantity] = useState(defaultQuantity)
    useEffect(() => {
        const productVariantData = getVariantData(product)
        variants.current = productVariantData.variants
        const initialVariant = productVariantData.variants[defaultVariantIndex]
        hasDefaultVariants.current = productVariantData.hasVariantDefaults
        const inventoryTotal = productVariantData.hasVariantDefaults ?
            Number(product?.totalInventory) :
            initialVariant?.quantityAvailable || Number(product?.totalInventory) || Number(product?.totalInventory) === 0 ? 0 : 1
        setCurrentVariantSelection(initialVariant?.id)
        setCurrentVariant(initialVariant)
        setCurrentTotalInventory(inventoryTotal)
        setIsNoInventory(product?.totalInventory === 0)
    }, [product])

    /* State | Hooks */
        const defaultToastOptions = {
            title: "Success!",
            description: "Item added to cart!",
            position: "bottom",
            status: "success",
            duration: 5000
        } as UseToastOptions
        const toast = useToast()
        

    /* ******** TODO ******** 
        State Update should NOT be in the body of the component
        Replace with ref's (i.e. "useRef()" hook)
    */

    // Component Mount - obtain current total inventory
/*     useEffect(() => {
        const defaultVariant = variants[defaultVariantIndex]
        if (defaultVariant) {
            setCurrentVariantSelection(defaultVariant.id)
            setCurrentVariant(defaultVariant)
            setCurrentTotalInventory(defaultVariant?.quantityAvailable || Number(product?.totalInventory) || 15)
        }

    }, [variants, product?.totalInventory]) */
    
    // useCart hook
    const {linesAdd, status, error} = useCart()
    
    const onAddToCartSubmit = async () => {
        // Evaluate data, update state, add to cart (hook)
        const cartLineItems = [
            {merchandiseId: currentVariantSelection, quantity: currentQuantity}
        ] as CartLineInput[]
        linesAdd(cartLineItems)
        // Clone toast option defaults & activate toast with success/error msg
        const toastProps = Object.assign({}, defaultToastOptions)
        setTimeout(() => {
            toastProps.duration = 3000
            if (error) {
                toastProps.status = 'error'
                toastProps.title = 'Sorry :('
                toastProps.description = 'Unfortunately, the product could not be added to the cart.  Please refresh the page and try again.'
            } else {
                toastProps.description = `${product?.title} added to cart!`
            }
            // AddToCartToast(toastProps)
            toast(toastProps)
            onClose()
        }, 350 )
    }

    const onVariantSelection = (val: string) => {
        // currentVariantSelection.current = val
        console.log(val)
        setCurrentVariantSelection(val)
        const selectedVariant = variants.current?.find(v => v.id === val.trim()) || variants.current[Number(val)]
        console.log(`* * Selected Variant ==> \n   ${JSON.stringify(selectedVariant, null, 2)}\n * *`)
        // currentVariant.current = (selectedVariant !== undefined) ? selectedVariant : currentVariant
        setCurrentVariant((selectedVariant !== undefined) ? selectedVariant : currentVariant)
        setCurrentTotalInventory(selectedVariant?.quantityAvailable || currentTotalInventory)
        
        //setCurrentTotalInventory(currentVariant && currentVariant?.quantityAvailable || product?.totalInventory)
    }

    const onCartAddFormSubmit = (e: FormEvent) => {
        const cartLineItems = [
            {merchandiseId: currentVariant?.id, quantity: currentQuantity}
        ] as CartLineInput[]
        linesAdd(cartLineItems)
    }

    /* TODO:  Use 2 Forms:  form #1 - variant selection ----- form #2 - addToCart (form returns only quantity and variant data) */
    return (
        <Modal colorScheme={"cyan"} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent backgroundColor={"chakra-body-bg"} className="store_product_modal">
            
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
                    <Stack divider={<Divider colorScheme={"blue"}  />} direction={"column"} height="250px" p="0.5" marginBottom={"1"}>

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
                        <form onSubmit={onCartAddFormSubmit} id={"add_to_cart_form"} style={{"width":"100%"}}>
                            {/* <RadioGroup onChange={onVariantSelection} id="variant_selection" value={currentVariantSelection} defaultValue={defaultVariant?.id} > */}
                            <RadioGroup onChange={onVariantSelection} id="variant_selection" value={currentVariantSelection} >
                                <Stack direction='row' justifyContent={"space-evenly"} gap={"4"}>
                                {hasDefaultVariants.current ?
                                    <Radio defaultChecked={true} colorScheme={"orange"} isDisabled={hasDefaultVariants.current} value={currentVariantSelection}>
                                        <span color="grey" style={{fontStyle: "italic"}}>No options available</span>
                                    </Radio> :
                                    variants.current.map((v, i) => <Radio defaultChecked={hasDefaultVariants && i===0} key={i} value={v.id  || i.toString()}>{v?.selectedOptions && v.selectedOptions[0]?.value}</Radio>)
                                }
                                </Stack>
                            </RadioGroup>
                            <ProductModalInputNumber handleChangeEnd={setCurrentQuantity} minAmount={1} maxAmount={currentTotalInventory} />
                        </form>
                    
                    </Stack>
                    
                </ModalBody>
                <ModalFooter >
                    <Button leftIcon={<SmallCloseIcon boxSize={"1.5em"} />}  
                        variant={"ghost"} 
                        mr={3} 
                        onClick={onClose}
                        _hover={{'bgColor': 'rgba(100, 150, 100, .5)'}}
                    >
                        Cancel
                    </Button>
                    <Button 
                        isLoading={(status !== "idle" && status !== "uninitialized")} 
                        loadingText={status} 
                        colorScheme={"orange"} 
                        // onClick={onClose}
                        onClick={onAddToCartSubmit}
                        isDisabled={isNoInventory}
                    >
                        Add to Cart
                    </Button>
                </ModalFooter>
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
    let hasVariantDefaults = false

    const variants: ShopifyProductVariantData[] = productVariants.map(variant => {
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
        hasVariantDefaults = hasVariantDefaults || hasDefaultValues ? hasDefaultValues : hasVariantDefaults
        const hasOnlyDefaultVariant = hasDefaultValues && variant?.selectedOptions?.length === 1
        return {
            ...variant,
            hasOnlyDefaultVariant
        }
    })

    const variantData = {
        variants,
        variantCount,
        hasVariantDefaults
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