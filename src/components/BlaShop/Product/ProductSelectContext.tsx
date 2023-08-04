import { createContext } from "react";
import { ShopifyProductData, ShopifyImageType } from "@/models/shopifyApiCustomTypes";

export const productSelectContextDefault = {
    title: '',
    id: '',
    featuredImage: undefined,
    description: 'This is awkward... no product selected.',
    variants: {
        nodes: []
    }
} as ShopifyProductData | undefined

export const ProductSelectContext = createContext(productSelectContextDefault)