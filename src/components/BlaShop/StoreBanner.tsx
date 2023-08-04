import { Heading } from "@chakra-ui/react";

interface StoreBannerProps {
    bgColor?: string
    message?: string
    subMessage?: string
}

export function StoreBanner (props: StoreBannerProps) {
    const {bgColor, message, subMessage} = props

    const messageDefault = "Welcome to the BLAIllustrations shop, please look at the following selections!"

    return (
        <Heading 
            textAlign={"center"} 
            border={'2px solid'} 
            borderColor="var(--dark-green)" 
            padding={".25rem 0"} 
            margin={".25rem .1rem .75rem"}
            background="var(--store-pink)"
        >
            {message || messageDefault}
            {subMessage ? <Heading size="lg">{subMessage}</Heading> : ""}

        </Heading>
    )
}