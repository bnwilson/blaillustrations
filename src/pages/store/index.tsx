/* Framework Imports */
import React, { ReactElement, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
/* Shopify */
import {getPrivateTokenHeaders, getStorefrontApiUrl} from '../../utils/shopifyClient'
import {shopifyQueryRequest} from '../../utils/shopifyGraphQLRequest'
import {getAllCollectionsQuery, getAllCollections} from '../../queries/getAllCollections'
/* Local Components */
import {Collections} from '../../components/BlaShop/Collections'
import {CollectionItem} from '../../components/BlaShop/CollectionItem'
import { StoreBanner } from "@/components/BlaShop/StoreBanner";
import { StoreLayout } from "@/components/Layout";
import { CollectionsContext, 
         CollectionsDispatchContext, 
         CollectionsContextState 
} from "@/components/BlaShop/collections.context";

interface StorePageProps {
    shop?: {
        name?: string // "BLAillustrations"
        id?: string // "gid://shopify/Shop/xxxxxxxxxx"
        [key: string]: any
    }
    collections?: {
        id?: string  // "gid://shopify/Collection/xxxxxxxxxxxx"
        title?: string  // "art prints"
        handle?: string // "human-bean-collection"
        updatedAt?: string // "2023-04-27T00:04:03Z"
        description?: string
        product?: {nodes: any[]} // product.nodes -> should only have 1 item: [{featuredImage: {url,altText,id}}]
        products?: {nodes: any[]} 
        [key: string]: any
    }[]
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
 *   * _**Note:  TS does not like `interface StorePageProps`, using `any` type for now**_
 * 
 * @param {StorePageProps} props - Generated from `getServerSideProps`
 * @returns {ReactNode}
 */
function StorePage (props: InferGetServerSidePropsType<typeof getServerSideProps>) {
    // State
    //      __TO_DO__: 
    //      - possibly replace with useReducer hook, instead of useState()
    //      - ^ only if it's determined that the collections/products listing should be state-ful
    // const [isLoading, setIsLoading]                       = useState(false)
    const [selectedCollectionId, setSelectedCollectionId] = useState('')
    
    // Filter to only collections with associated products
    const allCollections: any[]      = props?.collections
    const collections                = allCollections.filter(collectionItem => collectionItem?.products?.nodes?.length)
    const router                     = useRouter()
    const collectionsContext         = useContext(CollectionsContext)
    const collectionsDispatchContext = useContext(CollectionsDispatchContext)
    const collectionsMemo            = useMemo(() => collections, [collections])
    // console.log(JSON.stringify(collectionsMemo, null, 2))
    useEffect(() => {
        
        if (collectionsDispatchContext !== null) {
            const collectionsToAdd = collectionsMemo.map(item => {
                return {
                    collectionId: item.id, 
                    collectionTitle: item.title, 
                    productCount: item?.products?.nodes?.length || 0
                }
            })
            collectionsDispatchContext({
                type: 'init', 
                newCollections: collectionsToAdd
            })
        } else {
            throw new Error("collectionsContextDispatch is not rendering under <CollectionsContextDispatch.Provider>")
        }
        console.log(`'/store' page --> collectionContext: ${JSON.stringify(collectionsContext, null, 2)}`)
    // empty-array dep -- prevent re-render as props are created via SSR
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    // collectionClickEvent - handle collection selection from initial listing
    const collectionOnClick = (collectionClickEvent?: React.MouseEvent<HTMLDivElement> ) => {
        let clickedCollectionShopifyId = collectionClickEvent?.currentTarget.dataset['collectionId']
        if (clickedCollectionShopifyId) {
            // setIsLoading(true)
            // setSelectedCollectionId(clickedCollectionShopifyId)
            collectionsDispatchContext !== null && 
                collectionsDispatchContext({type: 'updateActive', newActiveCollectionId: clickedCollectionShopifyId})
            // ... navigate to collection (dynamic) page
            router.push({
                pathname: '/store/[collectionId]',
                query: { collectionId: encodeURIComponent(clickedCollectionShopifyId)}
            })
        }
    }
    
    return (
        <>
            <StoreBanner/>
            <div style={{margin: '0px auto', minWidth: '80%'}}>
            {collections && collections.length ? 
                <Collections>
                {...collections.map((cItem: any, i: number) => {
                    return <CollectionItem
                        key={i}
                        title={cItem.title}
                        id={cItem.id}
                        description={cItem.description || ""}
                        onclick={collectionOnClick}
                        imageData={cItem?.image || cItem?.product?.nodes[0]?.featuredImage || undefined}
                        tags={cItem?.products?.nodes[0]?.tags || undefined}
                    />
                })}
                </Collections>

                : <div/>
            }
            </div>
        </>
    )
}

type ShopServerSideProps = {
        response?: string;
        status?: string;
        headers?: string;
        error?: any;
        query: string;
        graphQlResponse: any;
        collections: any[];
}

export const getServerSideProps = (async (context: any) => {
    const serverSideProps = {props: {} as ShopServerSideProps}
    try {
        const shopifyQueryResponse: any       = await shopifyQueryRequest(getAllCollections)
        serverSideProps.props.graphQlResponse = shopifyQueryResponse
        serverSideProps.props.collections     = [...shopifyQueryResponse?.collections?.edges?.map((edge: any) => edge?.node)]
    } 
    catch (shopifyQueryError) {    
        const response = await fetch(getStorefrontApiUrl(), {
            body: JSON.stringify({
                query: getAllCollectionsQuery
            }),
            // When possible, add the 'buyerIp' param
            headers: getPrivateTokenHeaders(),
            method: 'POST'
        })
    
        const responseJSON                = await response.json()

        serverSideProps.props.response    = responseJSON
        serverSideProps.props.status      = JSON.stringify(response.status)
        serverSideProps.props.headers     = JSON.stringify(response.headers)
        serverSideProps.props.error       = JSON.stringify(shopifyQueryError)
        serverSideProps.props.collections = [...responseJSON?.data?.collections?.edges?.map((edge: any) => edge?.node)]
    }
    return serverSideProps
}) satisfies GetServerSideProps<ShopServerSideProps>


StorePage.getLayout = function getLayout(page: ReactElement) {
    return (
        <StoreLayout>
            {page}
        </StoreLayout>
    )
}

export default StorePage