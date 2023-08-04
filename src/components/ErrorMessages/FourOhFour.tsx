
import { CSSProperties } from "react"

const FOUR_OH_FOUR_MSG_DEFAULT = "Four Oh Four :("
const FOUR_OH_FOUR_SUBMSG_DEFAULT_= "Sorry! There were no item(s) listed for your selection, please return to the main store page."

interface FourOhFourProps {
    mainErrorMessage?: string
    subErrorMessage?: string
}

export function FourOhFour (props: FourOhFourProps) {
    const {mainErrorMessage, subErrorMessage} = props
    const errorMsgHeaderStyles = {'textAlign': 'center', 'color': 'var(--dark-blue)'} as CSSProperties

    return (
        <>
            <h1 style={errorMsgHeaderStyles}>
                {mainErrorMessage ? mainErrorMessage : FOUR_OH_FOUR_MSG_DEFAULT}
            </h1>
            <h3 style={errorMsgHeaderStyles}>
                {subErrorMessage ? subErrorMessage : FOUR_OH_FOUR_SUBMSG_DEFAULT_}
            </h3>
        </>
    )
}