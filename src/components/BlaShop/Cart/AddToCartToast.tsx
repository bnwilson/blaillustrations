import { useToast } from "@chakra-ui/react";

interface AddToCartToastProps {
    messageTitle?: string
    messageDescription?: string
    messagePosition?: "bottom" | "bottom-left" | "bottom-right" | "top" | "top-left" | "top-right"
    messageStatus?: "error" | "info" | "warning" | "success" | "loading"
    messageDuration?: number
}

export function AddToCartToast (props: AddToCartToastProps) {
    const {
        messageTitle="Success!",
        messageDescription="Item added to cart!",
        messagePosition="bottom",
        messageStatus="success",
        messageDuration=5000
    } = props
    const toast = useToast()

    return toast({
        description: messageDescription,
        duration: messageDuration,
        position: messagePosition,
        status: messageStatus,
        title: messageTitle
    })
}