import {gql} from 'graphql-tag'
import { CountryCode } from '@shopify/hydrogen-react/storefront-api-types'

/**
 * @description `@inContext` directive - provides a way for apps to describe additional options to 
 *   the GraphQl executor (in this case, _currency_).
 * 
 * @param countryCode the country of origin (_default: `"US"`_). 
 *  * _Note: sales will probably be limited to **US only**, so only default will be used_ 
 * * If sales were to be opened to Canada, international product pricing would be obtained through this method
 * - More information can be found here: https://shopify.dev/docs/custom-storefronts/building-with-the-storefront-api/markets/international-pricing
 * 
 */
export const localizationDirective = function(countryCode?: CountryCode) {
    const country = countryCode || 'US'

    return gql`
    query @inContext(country: ${country}) {
        localization {
            availableCountries {
                currency {
                    isoCode
                    name
                    symbol
                }
                isoCode
                name
                unitSystem
            }
            country {
                currency {
                    isoCode
                    name
                    symbol
                }
                isoCode
                name
                unitSystem
            }
        }
    }
    `

} 