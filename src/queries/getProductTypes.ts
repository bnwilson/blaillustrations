import {gql} from 'graphql-tag'
/**
 * **returns**:
 * 
 * ``` 
 * { "shop": 
 *  { "name": "Bla Illustrations", 
 *   "productTypes": 
 *      { "edges": [... 
 *        { "node": <product_type> } 
 *      ]} 
 *  }
 * }
 * ```
 */
export const getProductTypes = gql`
  {
    shop {
      name
      productTypes(first:30) {
        edges {
          node
        }
      }
    }
  }
`