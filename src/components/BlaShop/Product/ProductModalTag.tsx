import { Tag } from "@chakra-ui/react"

interface ProductModalProps {
    children?: any;
}
export function ProductModalTag (props: ProductModalProps) {
    const {children} = props
    return (
        <Tag 
            paddingRight=".2rem" 
            marginTop="4px" 
            marginBottom="4px"
            paddingLeft=".2rem" 
            textAlign="center" 
            variant="outline" 
            colorScheme={"green"} 
            size="sm" >
                {...children}
        </Tag>
    )
}