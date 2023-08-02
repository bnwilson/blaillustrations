// Import -- Framework | Context | UI
import { GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from "next"
import { useDisclosure } from "@chakra-ui/react"
import { useState, useContext, ReactElement, useRef } from "react"
// Import -- Shopify-related
import { shopifyQueryRequest } from "@/utils/shopifyGraphQLRequest"
import {getCollectionProductsById, GetCollectionProductsByIdResponse} from '@/queries/getProductsByCollectionId'
import type { ShopifyProductData } from "@/models/shopifyApiCustomTypes"
/* Import -- Components */
import { Products, ProductItem, ProductModal, ProductSelectContext, productSelectContextDefault } from "@/components/BlaShop"
import { FourOhFour } from "@/components/ErrorMessages"
import { Layout, StoreLayout } from "@/components/Layout"
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

export default function CollectionProducts (props: GetServerSidePropsData) {
    /* Props */
    const collection = props?.collectionProducts?.collection
    const productsList = collection?.products?.nodes?.map(p => p)
    const isNoProducts = !productsList?.length

    /* State | Hooks | Context */
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [selectedProduct, setSelectedProduct] = useState<ShopifyProductData | undefined>(undefined)
    // const selectedProduct = useRef(productSelectContextDefault)
    const handleClickProductSelect: React.MouseEventHandler<HTMLDivElement> = (event: React.MouseEvent<HTMLDivElement>) => {
        // Product click -> Update state / context of product selection
        const productListIdAttribute = event.currentTarget.dataset["productListId"]
        const productListId = !(typeof productListIdAttribute === "undefined") ?
            Number(productListIdAttribute) : 0
        const currentProductSelection = productsList && productsList[productListId]
        setSelectedProduct(currentProductSelection)
        // console.log(JSON.stringify(currentProductSelection, null, 2))
        onOpen()
    }
    const handleClickProductHover = (event: React.PointerEvent<HTMLDivElement>) => {
        // Product click -> Update state / context of product selection
        //const productListIdAttribute = event.currentTarget.dataset["productListId"]
        const productListIdAttribute = event.currentTarget.dataset["productListId"]
        const productListId = !(typeof productListIdAttribute === "undefined") ?
            Number(productListIdAttribute) : 0
        const currentProductSelection = productsList && productsList[productListId]
        setSelectedProduct(currentProductSelection)
        // console.log(selectedProduct)
        onOpen()
    }
    
    return (
        <div style={{margin: '0px auto', padding: '1em 1.5em'}}>
            <ProductSelectContext.Provider value={selectedProduct}>
                {/* <ProductModal isOpen={isOpen} onClose={onClose} selectedProduct={selectedProduct} /> */}
                <ProductModal isOpen={isOpen} onClose={onClose} />
             </ProductSelectContext.Provider>    
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
            {/* Testing output data */}
            {/* <ProductsDisplayStoreApi collectionId={collection?.id} data={props} /> */}
                       
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

    const shopifyQueryResponse: GetCollectionProductsByIdResponse = await shopifyQueryRequest(getCollectionProductsById, graphQlQueryVariables)
    
    return {
        props: {collectionProducts:  shopifyQueryResponse}
    }
}

/** StoreLayout
 * @description Nested layout for the store page, for initializing the Cart
 * @param children page props 
 * @returns 
 */
CollectionProducts.getLayout = function getLayout(page: ReactElement) {
    return (
        <StoreLayout>
            {page}
        </StoreLayout>
    )
}