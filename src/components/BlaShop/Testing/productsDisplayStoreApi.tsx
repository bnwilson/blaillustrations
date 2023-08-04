/* Testing output data */

import { CSSProperties } from "react"

interface expectedProductsDisplayProps {
    data: any
    collectionId: string
}
export function ProductsDisplayStoreApi (props: any) {
    const {collectionId, data} = props
    const preStyleConfig = {paddingLeft: "5px",maxWidth: "100vw", maxHeight:"50vh", overflow: "scroll", backgroundColor: "rgba(130,180,130,.6)", color: "rgb(40,40,50)"} as CSSProperties
    const spanStyleConfig = {wordWrap: "normal", overflowWrap: "break-word"} as CSSProperties
    return (
            <pre  style={preStyleConfig}>
                <h2>Response for {collectionId}</h2>
                <br/>
                <span style={spanStyleConfig}>{JSON.stringify(data, null, 2)}</span>
            </pre>
    )
}