import {gql} from 'graphql-tag'

/** Shopify Product query  * *
 * * * * * * * * * * * * * * *
 * **Variable**(s): 
 * ``` { handle: <unique-id> } ```
 * 
 * **Returns**: 
 * 
 * ```
 * { 
 *  id handle
 *  seo { title description }
 *  title
 *  descriptionHtml
 *  priceRange { minVariantPrice { amount currencyCode }}
 *  featuredImage { url altText width height }
 *  variants { 
 *      edges { 
 *          node { id } 
 *      } 
 *  }
 * } ```
*/
export const getProductByHandle = gql`
  query getProduct($handle: String!) {
    product(handle: $handle) {
      id
      handle
      seo {
        title
        description
      }
      title
      descriptionHtml
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      featuredImage {
        url
        altText
        width
        height
      }
      variants(first: 10) {
        edges {
          node {
            id
            displayName
            availableForSale
            sku
          }
        }
      }
    }
  }
`