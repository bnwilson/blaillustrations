import { ShopifyProviderProps } from "@shopify/hydrogen-react/dist/types/ShopifyProvider"

/** `getShopifyProviderProps` - func to initialize `<ShopifyProvider>` props
 * 
 * @returns {ShopifyProviderProps}
 */
export const getShopifyProviderProps = () => {
    return {
        storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_URL || '',
        storefrontToken: process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN || '',
        storefrontApiVersion: process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || '2023-10',
        countryIsoCode: 'US',
        languageIsoCode: 'EN'
    } satisfies ShopifyProviderProps
}