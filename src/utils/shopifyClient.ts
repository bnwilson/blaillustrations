import { createStorefrontClient } from "@shopify/hydrogen-react";

/**
 * Utility for Shopify API access
 *   for more info --> https://shopify.dev/docs/custom-storefronts/hydrogen-react#get-started-with-hydrogen-react
 */
const client = createStorefrontClient({
    privateStorefrontToken: process.env.SHOPIFY_PRIVATE_ACCESS_TOKEN || '',
    storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_URL || '',
    storefrontApiVersion: process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || ''
})

export const getStorefrontApiUrl = client.getStorefrontApiUrl
export const getPrivateTokenHeaders = client.getPrivateTokenHeaders