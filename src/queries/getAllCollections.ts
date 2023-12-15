import {gql} from 'graphql-request'
import {Product, Image} from '@shopify/hydrogen-react/storefront-api-types'
import { CollectionConnection, Collection } from '@shopify/hydrogen-react/storefront-api-types'

/**
 * ### **Does not work** !!!
 * 
 * * `products_count` query arg is only valid for the _"Shopify **Admin** API"_ **not** the _"Shopify **Storefront** API"_
 */
export const getCollectionsWithProducts = gql`
{
  shop {
      name
      id
  }
  collections(first:20, query:"products_count:>0") {
      edges {
          node {
            id
            title
            handle
            updatedAt
            description
            productsCount
          }
      }
  }
}
`

/**
 * **graphQL query** 
 * 
 * `getAllCollections` - Retrieves first (_currently_) `20` collections
 * * returns `collections { edges [...nodes] }`
 *   * the `nodes[]` items contain the `collection` object
 * * each `collection`contains `1` _`or less`_ `product`
 * 
 */
export const getAllCollections = gql`
{
    shop {
        name
        id
    }
    collections(first:20,sortKey: TITLE) {
        edges {
            node {
                id
                title
                handle
                updatedAt
                description
                # product - alias to retrieve featured img and tags
                product: products(first: 1) {
                    nodes {
                        tags
                        featuredImage {
                            url
                            altText
                            id
                        }
                    }
                }
                products(first: 25) {
                    nodes {
                        totalInventory
                    }
                }
                image {
                    url
                    altText
                }
            }
        }
    }
}`

 export const getAllCollectionsQuery = gql`
    {
        shop {
            name
            id
        }
        collections(first:20) {
            edges {
                node {
                    id
                    title
                    handle
                    updatedAt
                    description
                    products(first: 20) {
                        nodes {
                            totalInventory
                        }
                    }
                    image {
                        url
                        altText
                    }
                }
            }

        }
    }
 `

