/* ChakraUI components & Hooks */
import { Button, FormHelperTextProps, Image, Modal, ModalBody, ModalOverlay, 
    ModalHeader, ModalFooter, ModalCloseButton, useDisclosure, 
    ModalContent, Tag, Flex } from "@chakra-ui/react";
import { useState, useContext } from "react";
import { ProductSelectContext } from "./ProductSelectContext";
/* Types */
import { ShopifyProductData } from "@/models/shopifyApiCustomTypes";
import { AddToCartButtonProps, AddToCartButtonPropsBase } from "@shopify/hydrogen-react/dist/types/AddToCartButton";
import {useForm, FormProvider, useFormContext } from 'react-hook-form';

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

interface ProductModalProps {
    onClose: () => void
    isOpen: boolean
    selectedProduct?: ShopifyProductData & {[key: string]: any}
    // Note: 
    //     addToCart - may not need to pass props to AddToCartComponent with Product Data present
    addToCart?: AddToCartButtonProps | AddToCartButtonPropsBase | any
}


export function ProductModal (props: ProductModalProps) {
    /* Init */
    const initialProductProps = {name: '', title: '', id: ''}
    const {onClose, isOpen} = props
    /* Props */
    //const product = props.selectedProduct
    const product = useContext(ProductSelectContext)
    const {name, title, id} = props?.selectedProduct || initialProductProps
    const productImageUrl = product?.featuredImage?.url || product?.featuredImage?.src
    const variants = product && getVariantData(product)

    /* State | Context | Hooks */
    // const {isOpen, onClose, onOpen} = useDisclosure()
    const useFormMethods = useForm()
    const [currentVariantSelection, setCurrentVariantSelection] = useState('')
    
    const onAddToCartSubmit = async (cartItemData: CartItemFormData) => {
        // Evaluate data, update state, add to cart (hook)
    }
    

    /* TODO:  Use 2 Forms:  form #1 - variant selection ----- form #2 - addToCart (form returns only quantity and variant data) */
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
            <FormProvider {...useFormMethods}>
                <ModalHeader padding={".5rem"} textAlign="center">{product?.title || product?.handle}</ModalHeader>
                <ModalCloseButton/>
                <ModalBody className="store_product_modal_body">
                    <Image alt={title} src={productImageUrl} margin="0px auto"  />
                    {product?.tags && 
                        <Flex overflowWrap={"normal"} gap={"2px"}>
                            {product?.tags?.map((tag, i) => <Tag key={i}  size="md" className="store_product_modal_body_tags">{tag}</Tag>)}
                        </Flex>
                    }
                    <p>{product?.description}</p>
                </ModalBody>
                <ModalFooter>
                    <Button variant={"ghost"} mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme={"orange"}>
                        Add to Cart
                    </Button>
                </ModalFooter>

            </FormProvider>
            </ModalContent>
        </Modal>
    )
}

const getVariantData = (product: ShopifyProductData) => {
    // May be used for more business logic, but for now it's just getting the nested variants
    return product.variants?.nodes || []
}