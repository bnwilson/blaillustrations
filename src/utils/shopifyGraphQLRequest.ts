import {GraphQLClient} from 'graphql-request'
import {getPrivateTokenHeaders, getStorefrontApiUrl} from './shopifyClient'
import {TypedDocumentNode} from '@graphql-typed-document-node/core'

type QueryArg = TypedDocumentNode | any
interface VariablesArg {[key: string]: string}

export async function shopifyQueryRequest (query: QueryArg, variables?: VariablesArg) {
    const gqlClient = new GraphQLClient(
        getStorefrontApiUrl(), 
        { 
            headers: getPrivateTokenHeaders() 
        })
    
    const response = await gqlClient.request(query, variables)

    return response as Promise<any>
}