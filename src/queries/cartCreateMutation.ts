import {gql} from 'graphql-tag'

export function cartCreateMutation() {
    return gql`
    mutation {
        cartCreate(
            input: 
            lines: [],
            buyerIdentity: {
                countryCode: US
            }
            attributes: {
                key: "cart_attribute",
                value: "This is a cart attribute"
            }
        ) {
            cart {
                id
                createdAt
                updatedAt
                lines(first: 10) {
                    nodes {
                        id
                        merchandise {
                            ... on ProductVariant {
                                id
                            }
                        }
                    }
                }
                buyerIdentity {
                    deliveryAddressPreferences {
                        __typename
                    }
                }
            }
        }
    }
    `
}