import { 
    Collection as CollectionType,
    Image as ImageType, 
    Product as ProductType, 
    ProductVariant 
} from "@shopify/hydrogen-react/storefront-api-types";

/* * * * * Shopify API Custom Types * * * * *
 -------------------------------------------------
 Note from BlaIllustrations developer:

  The below definitions are mutated from the type bundle privided in the 'hydrogren-react' package,
  which represents Shopify's API response interfaces (via GraphQL).

  Problem:
   The type definitions, as they stand, are kind of tricky to work with in Typescript:
    - Many of the fields (that are optional to query) are 'expected' in the type/interface
    - 'Scalars' and nested objects (i.e. "{edges: nodes [...products/collections/etc.]}}") are 
      tough to utilize without ignoring the type altogether

   Solution:
     These types utilize the original type definitions, but:
      - all high-level fields are converted 'optional' (i.e. {"<field>"?: ..." )
      - references to other used/modified types are replaced with the mutated version in this file

    These custom types should better represent the shape of these items returned from their associated queries.
*/

/*  *  *  *  Collection(s)  *  *  *  */
type ShopifyCollectionDataPrototype = Omit<CollectionType,
    "id" | "image" | "handle" | "title" | "products"
> & {
    id: string
    image: ShopifyImageType
    handle: string
    title: string
    updatedAt: string
    products: {
        nodes: ShopifyProductData[]
    }
}

export type ShopifyCollectionData = {
    [K in keyof ShopifyCollectionDataPrototype]?: ShopifyCollectionDataPrototype[K]
}


/*  *  *  *  Image  *  *  *  */
export type ShopifyImageType = Omit<ImageType, "src" | "url" | "originalSrc"> & {
    src?: string, 
    url?: string, 
    originalSrc?: string
}

/*  *  *  *  Products  *  *  *  */
type ShopifyProductDataPrototype = Omit<ProductType, 
    "featuredImage" | "availableForSale" | "totalInventory" | "variants"
> & {
    featuredImage: ShopifyImageType
    availableForSale: boolean
    totalInventory: number | string
    variants: {
        nodes?: ShopifyProductVariantData[]
    }
}
/**
 * * `featuredImage`, `availableForSale`, and `totalInventory` redefined in **`ShopifyProductDataPrototype`**
 * * Override all fields to be optional (_i.e. `<value> | undefined`_)
 * 
 */
export type ShopifyProductData = {
    [K in keyof ShopifyProductDataPrototype]?: ShopifyProductDataPrototype[K]
}

/*  *  *  *  Variants (of Product)  *  *  *  */
type ShopifyProductVariantDataPrototype = Omit<ProductVariant, "amount" | "availableForSale" | "price" | "selectedOptions" | "image" | "quantityAvailable"> & {
    availableForSale: boolean
    price: {
        amount?: string
    }
    selectedOptions: {
        name?: string
        value?: string
    }[]
    image: ShopifyImageType
    quantityAvailable: number
}

/**
 * **ShopifyProductVariantData** - _Product variant object nested inside_: 
 * * `<ShopifyProduct>?.variants?.nodes[...<Variant>]`
 * 
 * Overridden fields:
 * * `availableForSale`, `price`, `selectedOptions`, `image`
 * * _**all fields**_ redefined as `<original value> | undefined`
 */
export type ShopifyProductVariantData = {
    [K in keyof ShopifyProductVariantDataPrototype]?: ShopifyProductVariantDataPrototype[K]
}

/*  *  *  *  Error(s)  *  *  *  */

/**
 * **Note:** This _Array of Object(s)_ would be found in the `{ errors?: [...] }` field of the response 
 */
export type ShopifyApiResponseErrors = {
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


function testTypeProps (k: ShopifyProductVariantData) {
    // k.product.
}