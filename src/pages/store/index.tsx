/* Framework Imports */
import React, { CSSProperties, MouseEventHandler, ReactElement, ReactEventHandler, useState } from "react";
import { useRouter } from "next/router";
import { Box, Spinner } from "@chakra-ui/react"
/* Shopify */
import {getPrivateTokenHeaders, getStorefrontApiUrl} from '../../utils/shopifyClient'
import {shopifyQueryRequest} from '../../utils/shopifyGraphQLRequest'
import {getAllCollectionsQuery, getAllCollections} from '../../queries/getAllCollections'
/* Local Components */
import {Collections} from '../../components/BlaShop/Collections'
import {CollectionItem} from '../../components/BlaShop/CollectionItem'
import { StoreBanner } from "@/components/BlaShop/StoreBanner";
import { Layout, StoreLayout } from "@/components/Layout";
/* Import -- Disabled; used for testing locally
    import { CollectionsDisplayStoreApi } from "@/components/BlaShop/Testing/collectionsDisplayStoreApi";
*/

let serverSidePropsExample = {
    "shop": {
        "name": "BLAillustrations",
        "id": "gid://shopify/Shop/42078896279"
    },
    "collections": {
        "edges": [
            {
                "node": {
                    "id": "gid://shopify/Collection/203483611287",
                    "title": "Home page",
                    "handle": "frontpage",
                    "updatedAt": "2023-04-27T00:04:03Z",
                    "description": ""
                }
            },
            {
                "node": {
                    "id": "gid://shopify/Collection/203663179927",
                    "title": "art prints",
                    "handle": "human-bean-collection",
                    "updatedAt": "2023-04-27T00:04:03Z",
                    "description": ""
                }
            }
        ]
    }
}

interface StorePageProps {
    shop?: {
        name?: string // "BLAillustrations"
        id?: string // "gid://shopify/Shop/xxxxxxxxxx"
        [key: string]: any
    }
    collections?: {
        edges: {
            node: {
                id?: string  // "gid://shopify/Collection/xxxxxxxxxxxx"
                title?: string  // "art prints"
                handle?: string // "human-bean-collection"
                updatedAt?: string // "2023-04-27T00:04:03Z"
                description?: string
                [key: string]: any
            }
        }[]
    }
    errors?: {
        message: string
        locations?: {
            line: number 
            column: number
        }[]
        path?: string[]
        extensions?:{
            code: string
            typeName: string
            fieldName: string
        }
    }[]
    [key: string]: any
}

/** #### **StorePage**
 * 
 * _Utilizes NextJs `getServerSideProps` functionality to query Shopify collections prior to render._
 * - **styles** -- global stylesheet can be found in `/styles/store.css`
 * 
 * @param {StorePageProps} props - Generated from `getServerSideProps`
 * @returns 
 */
function StorePage (props: any) {
    // State
    //      __TO_DO__: 
    //      - possibly replace with useReducer hook, instead of useState()
    //      - ^ only if it's determined that the collections/products listing should be state-ful
    const [selectedCollectionId, setSelectedCollectionId] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // Filter to only collections with associated products
    const allCollections: any[] = props?.collections
    const collections = allCollections.filter(collectionItem => collectionItem?.products?.nodes?.length)
    const router = useRouter()

    // collectionClickEvent - handle collection selection from initial listing
    const collectionOnClick = (collectionClickEvent?: React.MouseEvent<HTMLDivElement> ) => {
        let clickedCollectionShopifyId = collectionClickEvent?.currentTarget.dataset['collectionId']
        if (clickedCollectionShopifyId) {
            // setIsLoading(true)
            setSelectedCollectionId(clickedCollectionShopifyId)
            // ... navigate to collection (dynamic) page
            router.push({
                pathname: '/store/[collectionId]',
                query: { collectionId: encodeURIComponent(clickedCollectionShopifyId)}
            })
        }
    }
    
    return (
        /* Wrapper */
        <div style={{margin: '0px auto', minWidth: '80%'}}>
            <StoreBanner/>
            {collections && collections.length ? 
                <Collections>
                    {...collections.map((cItem: any, i: number) => {
                        return <CollectionItem
                            key={i}
                            title={cItem.title}
                            id={cItem.id}
                            description={cItem.description || ""}
                            onclick={collectionOnClick}
                            imageData={cItem?.image || cItem?.products?.nodes[0]?.featuredImage || undefined}
                            tags={cItem?.products?.nodes[0]?.tags || undefined}
                        />

                    })}
                        
                </Collections>
            : <div/>
            }
            
            {/* Testing -- fetch + graphQl responses for transparency */}
            {/* <CollectionsDisplayStoreApi data={props} /> */}
            
        </div>
        
    )
}

export async function getServerSideProps(context: any) {
    const response = await fetch(getStorefrontApiUrl(), {
        body: JSON.stringify({
            query: getAllCollectionsQuery
        }),
        // When possible, add the 'buyerIp' param
        headers: getPrivateTokenHeaders(),
        method: 'POST'
    })

    const responseJson = await response.json()
    const responseStatus = JSON.stringify(response.status)
    const responseHeaders = JSON.stringify(response.headers)

    const shopifyQueryResponse: any = await shopifyQueryRequest(getAllCollections)
    

    return {
        props: {
            response: responseJson,
            status: responseStatus,
            headers: responseHeaders,
            query: JSON.stringify(getAllCollectionsQuery),
            graphQlResponse: shopifyQueryResponse,
            collections: [...shopifyQueryResponse?.collections?.edges?.map((edge: any) => edge?.node)]
        }
    }
}

StorePage.getLayout = function getLayout(page: ReactElement) {
    return (
        <StoreLayout>
            {page}
        </StoreLayout>
    )
}

/** __ToDo's__ 
 * 1. Simple components:
 *   a. Toast -- "Item added to cart!"
 *   b. Spinner (Loading screen) -- rendered while waiting for storefront API response
 * 2. Medium-Complex components:
 *   a. Product View | Modal -- responsive (modal for desktop/large screen?)
 *   b. Cart | Drawer or on Navbar -- contains 'checkout' and context/shopify business-logic
 */

export default StorePage