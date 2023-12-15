// Import -- Framework | Context | UI
import { GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from "next"
import { useState, useContext, ReactElement, useRef } from "react"
import { useRouter } from "next/router"
// Import -- Shopify-related
import { shopifyQueryRequest } from "@/utils/shopifyGraphQLRequest"
import {getCollectionProductsById, GetCollectionProductsByIdResponse} from '@/queries/getProductsByCollectionId'
import type { ShopifyProductData } from "@/models/shopifyApiCustomTypes"
/* Import -- Components | UI */
import { Products, ProductItem, ProductModal, ProductSelectContext, productSelectContextDefault } from "@/components/BlaShop"
import { FourOhFour } from "@/components/ErrorMessages"
import { Layout, StoreLayout } from "@/components/Layout"
import { InfoIcon } from "@chakra-ui/icons"
import { Box, Heading, useDisclosure, Tooltip, Select } from "@chakra-ui/react"
import { CollectionsContext, CollectionsContextState, CollectionsDispatchContext } from "@/components/BlaShop/collections.context"
/* Import -- Disabled; used for testing locally
    import { ProductsDisplayStoreApi } from "@/components/BlaShop/Testing/productsDisplayStoreApi"
*/

/**
 * **GetServerSidePropsData** - describes expected output from `getServerSideProps()` func
 * * output is passed as `props` in `CollectionProducts`
 */
interface GetServerSidePropsData {
    collectionProducts?: GetCollectionProductsByIdResponse
    notFound?: boolean
    redirect?: Redirect
}

function CollectionProductsPage (props: GetServerSidePropsData) {
    /* Props */
    const collection                            = props?.collectionProducts?.collection
    const productsList                          = collection?.products?.nodes?.map(p => p)
    const isNoProducts                          = !productsList?.length

    /* State | Hooks | Context */
    const {isOpen, onOpen, onClose}             = useDisclosure()
    const tooltipDisclosure                     = useDisclosure()
    const collectionsContext                    = useContext(CollectionsContext)
    const collectionsDispatchContext            = useContext(CollectionsDispatchContext)
    const [selectedProduct, setSelectedProduct] = useState<ShopifyProductData | undefined>(undefined)
    // const selectedProduct = useRef(productSelectContextDefault)

    /* Router */
    const router = useRouter()
    
    /* Handlers */
    const handleClickProductSelect: React.MouseEventHandler<HTMLDivElement> = (event: React.MouseEvent<HTMLDivElement>) => {
        // Product click -> Update state / context of product selection
        const productListIdAttribute  = event.currentTarget.dataset["productListId"]
        const productListId           = 
            !(typeof productListIdAttribute === "undefined") ? 
                Number(productListIdAttribute) : 0
        const currentProductSelection = productsList && productsList[productListId]
        setSelectedProduct(currentProductSelection)
        // console.log(JSON.stringify(currentProductSelection, null, 2))
        onOpen()
    }

    const handleClickProductHover = (event: React.PointerEvent<HTMLDivElement>) => {
        // Product click -> Update state / context of product selection
        const productListIdAttribute = event.currentTarget.dataset["productListId"]
        const productListId = !(typeof productListIdAttribute === "undefined") ?
            Number(productListIdAttribute) : 0
        const currentProductSelection = productsList && productsList[productListId]
        setSelectedProduct(currentProductSelection)
        // console.log(selectedProduct)
        onOpen()
    }

    const handleDiffCollectionSelection = (collectionOnChangeEvent?: React.FormEvent<HTMLSelectElement> ) => {
        // let selectedCollectionShopifyId = collectionOnChangeEvent?.currentTarget.dataset['collectionId']
        const selectedCollectionShopifyId = collectionOnChangeEvent?.currentTarget.value
        if (selectedCollectionShopifyId && collectionsDispatchContext) {
            collectionsDispatchContext({type: 'updateActive', newActiveCollectionId: selectedCollectionShopifyId})
            // ... navigate to collection (dynamic) page
            router.push({
                pathname: '/store/[collectionId]',
                query: { collectionId: encodeURIComponent(selectedCollectionShopifyId)}
            })
        }
    }
    
    return (
        <div className="store-products__wrapper" 
            // style={{margin: '0px auto', padding: '.1em 1.5em'}}
        >
            {/* Collections banner message */}
            
            {/* <Heading 
                bg={"blackAlpha.600"} 
                color={"whiteAlpha.900"}
                padding={".15em 0"}
                fontWeight={"hairline"} 
                letterSpacing={"wide"} 
                fontFamily={"var(--store-cart-font-family)"} lineHeight={"normal"} 
                paddingInlineStart={".45em"} 
                size="md"
                textAlign={"center"}
                mb={"1"}  
            >
                {`Products from the '${collection?.title}' collection `} 
                <Tooltip isOpen={tooltipDisclosure.isOpen} 
                    
                    closeDelay={400} 
                    aria-label={headingInfoTooltip} 
                    label={headingInfoTooltip} 
                    maxWidth={["350px", "425px", "500px"]}
                    
                    direction={"rtl"}
                    >
                    <InfoIcon 
                        onMouseEnter={tooltipDisclosure.onOpen}
                        onMouseLeave={tooltipDisclosure.onClose}
                        onTouchStart={tooltipDisclosure.onToggle}
                        paddingTop={".15em"} 
                        verticalAlign={"center"} 
                    />
                </Tooltip>
            </Heading>
             */}
            <ProductSelectContext.Provider value={selectedProduct}>
                <ProductModal isOpen={isOpen} onClose={onClose} />
             </ProductSelectContext.Provider>   
             <div style={{margin: ".25rem auto .5rem", maxWidth: "80%", textAlign:"center"}}>
                <Select 
                    // maxHeight={"200px"} 
                    bg={"whiteAlpha.800"}
                    
                    boxShadow={"md"}
                    onChange={handleDiffCollectionSelection} 
                    margin={".25rem auto"}
                    textAlign={"center"}
                    fontFamily="'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
                    // fontFamily="var(--store-font-family)"
                    letterSpacing={"wide"}
                    // fontWeight={"bold"}
                    fontSize={"xl"}
                    variant="outline"
                    colorScheme={"blackAlpha"}
                >
                    {collectionsContext?.collections.map((cItem, i) => {
                        const isActiveCollectionId = !!(cItem.collectionId && (cItem.collectionId === collection?.id))
                        const c = cItem.productCount
                        return (
                            <option key={i} value={cItem.collectionId} 
                                selected={isActiveCollectionId} 
                                style={{fontSize: ".9rem", fontWeight:"normal", paddingLeft:"1.25rem"}} 
                            >
                                {isActiveCollectionId ?
                                    `${cItem.collectionTitle}` :
                                    `${cItem.collectionTitle}  (${c})`
                                }
                                {/* {` (${c} item${c === 1 ? '' : 's'})`} */}
                                {/* {`${cItem.collectionTitle} (${c} item${c === 1 ? '' : 's'})`} */}
                            </option>
                        )
                    })}
                </Select>

             </div>
            {isNoProducts ?
                /* Error 404 - No products for collection */
                <FourOhFour/> :

                <Products>
                {productsList?.map(
                    (productItem, i) => 
                        <ProductItem 
                            // onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                            //     handleClickProductSelect(e)
                            //     onToggle()
                            // }} 
                            onClick={handleClickProductSelect}
                            // onHover={handleClickProductSelect}
                            productData={productItem} 
                            key={i} 
                            uid={i} 
                        />
                    )
                }
                </Products>
            }
                               
        </div>

    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    // 'collectionId' should not be an Array of strings OR falsey... adding to make typescript happy
    let urlParamCollectionId = context.query.collectionId || ""
    if (urlParamCollectionId instanceof Array) {
        urlParamCollectionId = urlParamCollectionId.join('')
    } 

    const collectionId = decodeURIComponent(urlParamCollectionId)

    const graphQlQueryVariables = {
        id: collectionId
    }

    const shopifyQueryResponse: GetCollectionProductsByIdResponse = 
        await shopifyQueryRequest(
            getCollectionProductsById, 
            graphQlQueryVariables
        )
    
    return {
        props: {collectionProducts:  shopifyQueryResponse}
    }
}

/** StoreLayout
 * @description Nested layout for the store page, for initializing the Cart
 * @param children page props 
 * @returns 
 */
CollectionProductsPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <StoreLayout>
            {page}
        </StoreLayout>
    )
}
export default CollectionProductsPage

const headingInfoTooltip = 
    "This section is still under construction; to navigate back to the list of collections: " +
    "select other collections from the drop-down below, or just hit 'back' in your browser, or click 'Store' in the nav menu above."