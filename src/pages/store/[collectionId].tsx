// Import -- Framework | Context | UI
import { GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from "next"
import { useDisclosure } from "@chakra-ui/react"
import { useState, useContext } from "react"
// Import -- Shopify-related
import { shopifyQueryRequest } from "@/utils/shopifyGraphQLRequest"
import {getCollectionProductsById, GetCollectionProductsByIdResponse} from '@/queries/getProductsByCollectionId'
import type { ShopifyProductData } from "@/models/shopifyApiCustomTypes"
/* Import -- Components */
import { Products, ProductItem, ProductModal, ProductSelectContext } from "@/components/BlaShop"
import { FourOhFour } from "@/components/ErrorMessages"

interface GetServerSidePropsData {
    collectionProducts?: GetCollectionProductsByIdResponse
    notFound?: boolean
    redirect?: Redirect
}

const responseHeaderStyle = {
    padding: '2.5px', margin: '5px 0px', 
    fontWeight:'bolder', textAlign: 'center'} as CSSStyleDeclaration
    

export default function CollectionProducts (props: GetServerSidePropsData) {
    /* Props */
    const collection = props?.collectionProducts?.collection
    const productsList = collection?.products?.nodes?.map(p => p)
    const isNoProducts = !productsList?.length

    /* State | Hooks | Context */
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [selectedProduct, setSelectedProduct] = useState<ShopifyProductData | undefined>(undefined)
    const onProductSelection = (event: React.MouseEvent<HTMLDivElement>) => {
        // Product click -> Update state / context of product selection
        const productListIdAttribute = event.currentTarget.dataset["productListId"]
        const productListId = !(typeof productListIdAttribute === "undefined") ?
            Number(productListIdAttribute) : 0
        const currentProductSelection = productsList && productsList[productListId]
        
        setSelectedProduct(currentProductSelection)
        onOpen()
    }
    
    return (
        <div style={{margin: '0px auto', padding: '1em 1.5em'}}>
            <ProductSelectContext.Provider value={selectedProduct}>
                {/* <ProductModal isOpen={isOpen} onClose={onClose} selectedProduct={selectedProduct} /> */}
                <ProductModal isOpen={isOpen} onClose={onClose} />
                
                {isNoProducts ?
                    /* Error 404 - No products for collection */
                    <FourOhFour/> :

                    <Products>
                    {productsList?.map(
                        (productItem, i) => 
                            <ProductItem 
                                onClick={onProductSelection} 
                                productData={productItem} 
                                key={i} 
                                uid={i} 
                            />
                        )
                    }
                    </Products>
                }

                {/* Testing output data */}
                <pre>
                    <h2>Response for {collection?.id}</h2>
                    <br/>
                    <span>{JSON.stringify(props, null, 2)}</span>
                </pre>
            </ProductSelectContext.Provider>
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