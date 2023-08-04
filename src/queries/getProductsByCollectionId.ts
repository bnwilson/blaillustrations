import {gql} from 'graphql-tag'
import type { Collection } from '@shopify/hydrogen-react/storefront-api-types'
import type { ShopifyCollectionData, ShopifyApiResponseErrors } from '@/models/shopifyApiCustomTypes'

interface CollectionFromResponse extends ShopifyCollectionData {
    [key: string]: any
}

export interface GetCollectionProductsByIdResponse {
    errors?: ShopifyApiResponseErrors
    collection?: CollectionFromResponse
}

/**
 * Get (_currently_ first 15) **products** connected to **collection** by `id`
 * 
 * **variables** - (_input as 2nd param to GraphQlRequest_):
 *  
 *     { "id":  "xxxxxxxxx" }
 */
export const getCollectionProductsById = gql`
    query ProductsByCollectionId($id: ID!) {
        collection(id: $id) {
            id
            title
            handle
            updatedAt
            description
            descriptionHtml
            products (first: 25) {
                nodes {
                    availableForSale
                    id
                    title
                    description
                    descriptionHtml
                    handle
                    productType
                    tags
                    totalInventory
                    options {
                        name
                        values
                    }
                    priceRange {
                        minVariantPrice {
                            amount
                            currencyCode
                        }
                        maxVariantPrice {
                            amount
                            currencyCode
                        }
                    }
                    featuredImage {
                        altText 
                        id 
                        url
                    }
                    variants (first: 10) {
                        nodes {
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
                    }
                }

            }
        }
    }
`