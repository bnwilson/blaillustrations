import { Heading } from "@chakra-ui/react";

interface StoreBannerProps {
    bgColor?: string
    message?: string
    subMessage?: string
}

export function StoreBanner (props: StoreBannerProps) {
    const {bgColor, message, subMessage} = props

    const messageDefault = "Welcome to the BLAillustrations Store, please look at the following collections!"
    const messageDefault2 = "Collections"

    return (
        <Heading 
            bg={"ghostwhite"}
            textAlign={"center"} 
            fontSize={"2xl"}
            padding={".15rem 0"} 
            margin={".25rem .1rem .75rem"}
            // background="var(--store-pink)"
            boxShadow={"1px 2px 2px 2px gray"}
        >
            {message || messageDefault}
            {subMessage ? <Heading size="lg">{subMessage}</Heading> : ""}

        </Heading>
    )
}