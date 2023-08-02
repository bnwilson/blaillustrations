import { Box } from "@chakra-ui/react"
import { CSSProperties } from "react"

/**
 * Testing -- fetch + graphQl responses for transparency
 * - For viewing 'collections' response
 * @param data 
 * @returns CollectionsDisplayStoreAPI - `"div"` element with formatted JSON data
 */
export function CollectionsDisplayStoreApi(props: any) {
    const {data} = props
    const responseHeaderStyle = {padding: '2.5px', margin: '5px 0px', fontWeight:'bolder', textAlign: 'center'} as CSSProperties
    
    return (
        <div style={{margin: '0px auto', padding: '1em 1.5em'}}>
            <Box 
                maxW={'lg'}
                maxH={'lg'}
                minH={'md'}
                minW={'1000px'}
                borderWidth={'1px'}
                overflow={'scroll'}
                p={'5'}
                color={'gray.500'}
                fontWeight={'semibold'}
                letterSpacing={'wide'}
                fontFamily={'monospace'}
                margin={'0 auto'}
                background={'ivory'}
            >
                {/* * * * Build & Testing -- Info blocks * * * */}
                {/* Status - Html Response Status Code */}
                <div style={{padding: '5px', margin: '2rem'}}>
                    <h2 style={responseHeaderStyle}>Status</h2>
                    <br/>
                    <span style={{padding: '4px 5px'}}>{data && JSON.stringify(data.status)}</span>
                </div>
                {/* Headers for Fetch request */}
                <div style={{padding: '5px', margin: '2rem'}}>
                    <h2 style={responseHeaderStyle}>Headers</h2>
                    <br/>
                    <span style={{padding: '4px 5px'}}>{data && JSON.stringify(data.headers)}</span>
                </div>
                {/* Fetch response object (JSON) */}
                <pre style={{padding: '5px', margin: '2rem'}}>
                    <h2 style={responseHeaderStyle}>Response</h2>
                    <br/>
                    <span style={{padding: '4px 5px'}}>{data && JSON.stringify(data.response, null, 2)}</span>
                </pre>
                {/* Query (str) used in request */}
                <div style={{padding: '5px', margin: '2rem'}}>
                    <h2 style={responseHeaderStyle}>Query</h2>
                    <br/>
                    <span style={{padding: '4px 5px'}}>{data && JSON.stringify(data.query)}</span>
                </div>
                {/* GraphQLClient Response object (currently used in addition to fetch req) */}
                <div style={{padding: '5px', margin: '2rem'}}>
                    <h2 style={responseHeaderStyle}>GraphQL-Request response</h2>
                    <br/>
                    <pre style={{padding: '4px 5px'}}>{data && JSON.stringify(data.graphQlResponse, null, 2)}</pre>
                </div>
                <br/><br/>
                {/* 'Collections' from response (array of collections, nested in response object) */}
                <div style={{padding: '5px', margin: '2rem'}}>
                    <h2 style={responseHeaderStyle}>Collections</h2>
                    <br/>
                    <pre style={{padding: '4px 5px'}}>{data && JSON.stringify(data.collections, null, 2)}</pre>
                </div>
                <br/><br/>
            </Box>
        </div>
    )
}