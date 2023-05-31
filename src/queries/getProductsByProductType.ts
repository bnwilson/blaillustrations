import {gql} from 'graphql-request'

/** Shopify Product query  * *
 * * * * * * * * * * * * * * *
 * **Variable**(s): 
 * 
 * ``` { productType: <product_type|String!> } ```
 * 
 * */
export const getProductsByProductType = gql`
  query ProductByType ($productType: String!){
    shop {
      name
    }
    products (first: 40,query:"product_type:$productType") {
      edges {
        node {
          id
          title
          description
          productCategory {
            productTaxonomyNode {
              name
              fullName
            }
          }
          productType
        }
      }
    }
  }
`